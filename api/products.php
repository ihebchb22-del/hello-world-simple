<?php
require_once __DIR__ . '/config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$slug = $_GET['slug'] ?? null;

try {
    switch ($method) {
        case 'GET':
            // Single by id
            if ($id) {
                $stmt = $db->prepare("
                    SELECT p.*, b.name AS brand_name, b.slug AS brand_slug
                    FROM products p
                    LEFT JOIN brands b ON b.id = p.brand_id
                    WHERE p.id = ?
                ");
                $stmt->execute([$id]);
                $row = $stmt->fetch();
                if (!$row) jsonResponse(['success' => false, 'error' => 'Product not found'], 404);
                $row['features'] = json_decode($row['features'] ?? '[]', true);
                $row['gallery']  = json_decode($row['gallery']  ?? '[]', true);
                jsonResponse(['success' => true, 'data' => $row]);
            }
            // Single by slug
            if ($slug) {
                $stmt = $db->prepare("
                    SELECT p.*, b.name AS brand_name, b.slug AS brand_slug
                    FROM products p
                    LEFT JOIN brands b ON b.id = p.brand_id
                    WHERE p.slug = ?
                ");
                $stmt->execute([$slug]);
                $row = $stmt->fetch();
                if (!$row) jsonResponse(['success' => false, 'error' => 'Product not found'], 404);
                $row['features'] = json_decode($row['features'] ?? '[]', true);
                $row['gallery']  = json_decode($row['gallery']  ?? '[]', true);
                jsonResponse(['success' => true, 'data' => $row]);
            }

            // List with filters
            $where = [];
            $params = [];

            if (!empty($_GET['category'])) {
                $where[] = "p.category = ?";
                $params[] = $_GET['category'];
            }
            if (!empty($_GET['brand_id'])) {
                $where[] = "p.brand_id = ?";
                $params[] = (int) $_GET['brand_id'];
            }
            if (!empty($_GET['brand_slug'])) {
                $where[] = "b.slug = ?";
                $params[] = $_GET['brand_slug'];
            }
            if (!empty($_GET['featured'])) {
                $where[] = "p.featured = 1";
            }
            if (!empty($_GET['search'])) {
                $where[] = "(p.name LIKE ? OR p.description LIKE ?)";
                $params[] = '%' . $_GET['search'] . '%';
                $params[] = '%' . $_GET['search'] . '%';
            }
            if (isset($_GET['min_price'])) {
                $where[] = "p.price >= ?";
                $params[] = (float) $_GET['min_price'];
            }
            if (isset($_GET['max_price'])) {
                $where[] = "p.price <= ?";
                $params[] = (float) $_GET['max_price'];
            }

            $whereSql = $where ? 'WHERE ' . implode(' AND ', $where) : '';

            // Sorting
            $sortMap = [
                'newest'     => 'p.created_at DESC',
                'price_asc'  => 'p.price ASC',
                'price_desc' => 'p.price DESC',
                'rating'     => 'p.rating DESC',
                'featured'   => 'p.featured DESC, p.created_at DESC',
            ];
            $sort = $sortMap[$_GET['sort'] ?? 'newest'] ?? 'p.created_at DESC';

            // Pagination
            $page    = max(1, (int)($_GET['page'] ?? 1));
            $perPage = min(100, max(1, (int)($_GET['per_page'] ?? 20)));
            $offset  = ($page - 1) * $perPage;

            // Count
            $countStmt = $db->prepare("
                SELECT COUNT(*) FROM products p
                LEFT JOIN brands b ON b.id = p.brand_id
                $whereSql
            ");
            $countStmt->execute($params);
            $total = (int) $countStmt->fetchColumn();

            // Data
            $sql = "
                SELECT p.*, b.name AS brand_name, b.slug AS brand_slug
                FROM products p
                LEFT JOIN brands b ON b.id = p.brand_id
                $whereSql
                ORDER BY $sort
                LIMIT $perPage OFFSET $offset
            ";
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $rows = $stmt->fetchAll();
            foreach ($rows as &$r) {
                $r['features'] = json_decode($r['features'] ?? '[]', true);
                $r['gallery']  = json_decode($r['gallery']  ?? '[]', true);
            }
            jsonResponse([
                'success' => true,
                'data'    => $rows,
                'meta'    => [
                    'total'    => $total,
                    'page'     => $page,
                    'per_page' => $perPage,
                    'pages'    => (int) ceil($total / $perPage),
                ],
            ]);
            break;

        case 'POST':
            requireAdmin();
            $body = getRequestBody();
            $name = trim($body['name'] ?? '');
            $price = isset($body['price']) ? (float) $body['price'] : null;
            if ($name === '' || $price === null) {
                jsonResponse(['success' => false, 'error' => 'Name and price are required'], 400);
            }
            $slug = makeSlug($body['slug'] ?? $name);
            $stmt = $db->prepare("
                INSERT INTO products
                (brand_id, name, slug, description, category, price, original_price, image_url, gallery, stock, rating, reviews_count, featured, badge, features)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $body['brand_id'] ?? null,
                $name,
                $slug,
                $body['description'] ?? null,
                $body['category'] ?? null,
                $price,
                $body['original_price'] ?? null,
                $body['image_url'] ?? null,
                json_encode($body['gallery'] ?? []),
                (int)($body['stock'] ?? 0),
                (float)($body['rating'] ?? 0),
                (int)($body['reviews_count'] ?? 0),
                !empty($body['featured']) ? 1 : 0,
                $body['badge'] ?? null,
                json_encode($body['features'] ?? []),
            ]);
            jsonResponse(['success' => true, 'id' => $db->lastInsertId()], 201);
            break;

        case 'PUT':
        case 'PATCH':
            requireAdmin();
            if (!$id) jsonResponse(['success' => false, 'error' => 'Product id required'], 400);
            $body = getRequestBody();
            $allowed = ['brand_id','name','slug','description','category','price','original_price','image_url','gallery','stock','rating','reviews_count','featured','badge','features'];
            $fields = [];
            $params = [];
            foreach ($allowed as $f) {
                if (array_key_exists($f, $body)) {
                    $fields[] = "$f = ?";
                    if ($f === 'slug')                 $params[] = makeSlug($body[$f]);
                    elseif ($f === 'features' || $f === 'gallery') $params[] = json_encode($body[$f] ?: []);
                    elseif ($f === 'featured')         $params[] = $body[$f] ? 1 : 0;
                    else                               $params[] = $body[$f];
                }
            }
            if (!$fields) jsonResponse(['success' => false, 'error' => 'No fields to update'], 400);
            $params[] = $id;
            $stmt = $db->prepare("UPDATE products SET " . implode(',', $fields) . " WHERE id = ?");
            $stmt->execute($params);
            jsonResponse(['success' => true]);
            break;

        case 'DELETE':
            requireAdmin();
            if (!$id) jsonResponse(['success' => false, 'error' => 'Product id required'], 400);
            $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
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
