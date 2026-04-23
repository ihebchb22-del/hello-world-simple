<?php
require_once __DIR__ . '/config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$reference = $_GET['reference'] ?? null;

function generateOrderRef() {
    return 'MF-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
}

try {
    switch ($method) {
        case 'GET':
            // Public lookup by reference (for "Track Order" page)
            if ($reference) {
                $stmt = $db->prepare("SELECT * FROM orders WHERE reference = ?");
                $stmt->execute([$reference]);
                $order = $stmt->fetch();
                if (!$order) jsonResponse(['success' => false, 'error' => 'Order not found'], 404);

                $items = $db->prepare("
                    SELECT oi.*, p.name AS product_name, p.image_url
                    FROM order_items oi
                    LEFT JOIN products p ON p.id = oi.product_id
                    WHERE oi.order_id = ?
                ");
                $items->execute([$order['id']]);
                $order['items'] = $items->fetchAll();
                jsonResponse(['success' => true, 'data' => $order]);
            }

            // Single by id (admin)
            if ($id) {
                requireAdmin();
                $stmt = $db->prepare("SELECT * FROM orders WHERE id = ?");
                $stmt->execute([$id]);
                $order = $stmt->fetch();
                if (!$order) jsonResponse(['success' => false, 'error' => 'Order not found'], 404);
                $items = $db->prepare("
                    SELECT oi.*, p.name AS product_name, p.image_url
                    FROM order_items oi
                    LEFT JOIN products p ON p.id = oi.product_id
                    WHERE oi.order_id = ?
                ");
                $items->execute([$id]);
                $order['items'] = $items->fetchAll();
                jsonResponse(['success' => true, 'data' => $order]);
            }

            // List (admin)
            requireAdmin();
            $where = [];
            $params = [];
            if (!empty($_GET['status'])) {
                $where[] = "status = ?";
                $params[] = $_GET['status'];
            }
            if (!empty($_GET['search'])) {
                $where[] = "(reference LIKE ? OR customer_name LIKE ? OR customer_phone LIKE ? OR customer_email LIKE ?)";
                $like = '%' . $_GET['search'] . '%';
                array_push($params, $like, $like, $like, $like);
            }
            $whereSql = $where ? 'WHERE ' . implode(' AND ', $where) : '';

            $page = max(1, (int)($_GET['page'] ?? 1));
            $perPage = min(100, max(1, (int)($_GET['per_page'] ?? 20)));
            $offset = ($page - 1) * $perPage;

            $countStmt = $db->prepare("SELECT COUNT(*) FROM orders $whereSql");
            $countStmt->execute($params);
            $total = (int) $countStmt->fetchColumn();

            $stmt = $db->prepare("SELECT * FROM orders $whereSql ORDER BY created_at DESC LIMIT $perPage OFFSET $offset");
            $stmt->execute($params);
            jsonResponse([
                'success' => true,
                'data'    => $stmt->fetchAll(),
                'meta'    => [
                    'total'    => $total,
                    'page'     => $page,
                    'per_page' => $perPage,
                    'pages'    => (int) ceil($total / $perPage),
                ],
            ]);
            break;

        case 'POST':
            // Public — checkout
            $body = getRequestBody();
            $name  = trim($body['customer_name']  ?? '');
            $phone = trim($body['customer_phone'] ?? '');
            $items = $body['items'] ?? [];
            if ($name === '' || $phone === '' || !is_array($items) || count($items) === 0) {
                jsonResponse(['success' => false, 'error' => 'Customer name, phone, and at least one item are required'], 400);
            }

            $db->beginTransaction();
            try {
                // Recompute totals server-side from products table (safer than trusting client prices)
                $subtotal = 0;
                $resolved = [];
                foreach ($items as $it) {
                    $pid = (int)($it['product_id'] ?? 0);
                    $qty = max(1, (int)($it['quantity'] ?? 1));
                    if (!$pid) continue;
                    $stmt = $db->prepare("SELECT id, name, price, stock FROM products WHERE id = ?");
                    $stmt->execute([$pid]);
                    $p = $stmt->fetch();
                    if (!$p) throw new Exception("Product $pid not found");
                    if ($p['stock'] !== null && $p['stock'] < $qty) {
                        throw new Exception("Not enough stock for {$p['name']}");
                    }
                    $line = (float)$p['price'] * $qty;
                    $subtotal += $line;
                    $resolved[] = [
                        'product_id'   => $p['id'],
                        'product_name' => $p['name'],
                        'unit_price'   => (float)$p['price'],
                        'quantity'     => $qty,
                        'subtotal'     => $line,
                    ];
                }

                $shipping = (float)($body['shipping_cost'] ?? ($subtotal >= 50 ? 0 : 7));
                $discount = (float)($body['discount']      ?? 0);
                $total    = max(0, $subtotal + $shipping - $discount);
                $reference = generateOrderRef();

                $stmt = $db->prepare("
                    INSERT INTO orders
                    (reference, customer_name, customer_phone, customer_email, address, city, postal_code, notes,
                     subtotal, shipping_cost, discount, total, status, payment_method)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
                ");
                $stmt->execute([
                    $reference,
                    $name,
                    $phone,
                    $body['customer_email'] ?? null,
                    $body['address']        ?? null,
                    $body['city']           ?? null,
                    $body['postal_code']    ?? null,
                    $body['notes']          ?? null,
                    $subtotal,
                    $shipping,
                    $discount,
                    $total,
                    $body['payment_method'] ?? 'cod',
                ]);
                $orderId = (int) $db->lastInsertId();

                $insItem = $db->prepare("
                    INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, subtotal)
                    VALUES (?, ?, ?, ?, ?, ?)
                ");
                $updStock = $db->prepare("UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ? AND stock IS NOT NULL");
                foreach ($resolved as $r) {
                    $insItem->execute([$orderId, $r['product_id'], $r['product_name'], $r['unit_price'], $r['quantity'], $r['subtotal']]);
                    $updStock->execute([$r['quantity'], $r['product_id']]);
                }

                $db->commit();
                jsonResponse([
                    'success'   => true,
                    'id'        => $orderId,
                    'reference' => $reference,
                    'total'     => $total,
                ], 201);
            } catch (Exception $e) {
                $db->rollBack();
                jsonResponse(['success' => false, 'error' => $e->getMessage()], 400);
            }
            break;

        case 'PUT':
        case 'PATCH':
            requireAdmin();
            if (!$id) jsonResponse(['success' => false, 'error' => 'Order id required'], 400);
            $body = getRequestBody();
            $allowed = ['status', 'tracking_number', 'notes', 'payment_status'];
            $fields = [];
            $params = [];
            foreach ($allowed as $f) {
                if (array_key_exists($f, $body)) {
                    $fields[] = "$f = ?";
                    $params[] = $body[$f];
                }
            }
            if (!$fields) jsonResponse(['success' => false, 'error' => 'No fields to update'], 400);
            $params[] = $id;
            $stmt = $db->prepare("UPDATE orders SET " . implode(',', $fields) . " WHERE id = ?");
            $stmt->execute($params);
            jsonResponse(['success' => true]);
            break;

        case 'DELETE':
            requireAdmin();
            if (!$id) jsonResponse(['success' => false, 'error' => 'Order id required'], 400);
            $stmt = $db->prepare("DELETE FROM orders WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(['success' => true]);
            break;

        default:
            jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
    }
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'Database error', 'detail' => $e->getMessage()], 500);
}
?>
