<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

requireAdmin();

if (empty($_FILES['file'])) {
    jsonResponse(['success' => false, 'error' => 'No file uploaded'], 400);
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    jsonResponse(['success' => false, 'error' => 'Upload failed'], 400);
}

$allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$mime = mime_content_type($file['tmp_name']);
if (!in_array($mime, $allowed, true)) {
    jsonResponse(['success' => false, 'error' => 'Unsupported file type'], 400);
}

if ($file['size'] > 5 * 1024 * 1024) {
    jsonResponse(['success' => false, 'error' => 'File too large (max 5MB)'], 400);
}

$dir = ensureUploadsDir();
$ext = pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg';
$filename = uniqid('img_', true) . '.' . preg_replace('/[^a-z0-9]/i', '', $ext);
$dest = $dir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    jsonResponse(['success' => false, 'error' => 'Failed to save file'], 500);
}

jsonResponse([
    'success'  => true,
    'filename' => $filename,
    'url'      => getUploadUrl($filename),
]);
?>
