<?php
require_once __DIR__ . '/config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$slug = $_GET['slug'] ?? null;

try {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare("SELECT * FROM brands WHERE id = ?");
                $stmt->execute([$id]);
                $row = $stmt->fetch();
                if (!$row) jsonResponse(['success' => false, 'error' => 'Brand not found'], 404);
                jsonResponse(['success' => true, 'data' => $row]);
            }
            if ($slug) {
                $stmt = $db->prepare("SELECT * FROM brands WHERE slug = ?");
                $stmt->execute([$slug]);
                $row = $stmt->fetch();
                if (!$row) jsonResponse(['success' => false, 'error' => 'Brand not found'], 404);
                jsonResponse(['success' => true, 'data' => $row]);
            }
            $stmt = $db->query("SELECT * FROM brands ORDER BY name ASC");
            jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
            break;

        case 'POST':
            requireAdmin();
            $body = getRequestBody();
            $name = trim($body['name'] ?? '');
            if ($name === '') jsonResponse(['success' => false, 'error' => 'Name is required'], 400);
            $slug = makeSlug($body['slug'] ?? $name);
            $logo_url = $body['logo_url'] ?? null;
            $description = $body['description'] ?? null;
            $stmt = $db->prepare("INSERT INTO brands (name, slug, logo_url, description) VALUES (?, ?, ?, ?)");
            $stmt->execute([$name, $slug, $logo_url, $description]);
            jsonResponse(['success' => true, 'id' => $db->lastInsertId()], 201);
            break;

        case 'PUT':
        case 'PATCH':
            requireAdmin();
            if (!$id) jsonResponse(['success' => false, 'error' => 'Brand id required'], 400);
            $body = getRequestBody();
            $fields = [];
            $params = [];
            foreach (['name', 'slug', 'logo_url', 'description'] as $f) {
                if (array_key_exists($f, $body)) {
                    $fields[] = "$f = ?";
                    $params[] = $f === 'slug' ? makeSlug($body[$f]) : $body[$f];
                }
            }
            if (!$fields) jsonResponse(['success' => false, 'error' => 'No fields to update'], 400);
            $params[] = $id;
            $stmt = $db->prepare("UPDATE brands SET " . implode(',', $fields) . " WHERE id = ?");
            $stmt->execute($params);
            jsonResponse(['success' => true]);
            break;

        case 'DELETE':
            requireAdmin();
            if (!$id) jsonResponse(['success' => false, 'error' => 'Brand id required'], 400);
            $stmt = $db->prepare("DELETE FROM brands WHERE id = ?");
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
