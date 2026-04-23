<?php
// Admin dashboard quick stats
require_once __DIR__ . '/config.php';
requireAdmin();

$db = getDB();

try {
    $stats = [];
    $stats['total_products'] = (int) $db->query("SELECT COUNT(*) FROM products")->fetchColumn();
    $stats['total_brands']   = (int) $db->query("SELECT COUNT(*) FROM brands")->fetchColumn();
    $stats['total_orders']   = (int) $db->query("SELECT COUNT(*) FROM orders")->fetchColumn();
    $stats['pending_orders'] = (int) $db->query("SELECT COUNT(*) FROM orders WHERE status = 'pending'")->fetchColumn();
    $stats['revenue_total']  = (float) $db->query("SELECT COALESCE(SUM(total),0) FROM orders WHERE status NOT IN ('cancelled')")->fetchColumn();
    $stats['revenue_today']  = (float) $db->query("SELECT COALESCE(SUM(total),0) FROM orders WHERE DATE(created_at) = CURDATE() AND status NOT IN ('cancelled')")->fetchColumn();
    $stats['revenue_month']  = (float) $db->query("SELECT COALESCE(SUM(total),0) FROM orders WHERE YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE()) AND status NOT IN ('cancelled')")->fetchColumn();
    $stats['low_stock']      = $db->query("SELECT id, name, stock FROM products WHERE stock IS NOT NULL AND stock <= 5 ORDER BY stock ASC LIMIT 10")->fetchAll();
    $stats['recent_orders']  = $db->query("SELECT id, reference, customer_name, total, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5")->fetchAll();

    jsonResponse(['success' => true, 'data' => $stats]);
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'Database error', 'detail' => $e->getMessage()], 500);
}
?>
