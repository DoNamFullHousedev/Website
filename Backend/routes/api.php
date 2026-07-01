<?php
// Cấu hình Headers cho phép các ứng dụng Front-end gọi tới (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Xử lý request dạng OPTIONS (Preflight request phản hồi nhanh cho trình duyệt)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Lấy thông tin URL và Phương thức Request (POST, GET,...)
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Đọc luồng dữ liệu JSON gửi lên từ Fetch API ở JavaScript
$data = json_decode(file_get_contents("php://input"));

require_once __DIR__ . '/../Controllers/AuthController.php';
$authController = new AuthController();

// ĐỊNH TUYẾN (ROUTING)
// 1. Route Đăng ký (Lưu ý sửa lại chuỗi khớp với URL bạn cấu hình ở Front-end)
if (preg_match('/api\/auth\/register$/', $uri) && $method === 'POST') {
    $authController->register($data);
} 
// 2. Route Đăng nhập
elseif (preg_match('/api\/auth\/login$/', $uri) && $method === 'POST') {
    $authController->login($data);
} 
// Các route khác chưa được định nghĩa
else {
    http_response_code(404);
    echo json_encode(["message" => "Đường dẫn API này không tồn tại trên hệ thống!"]);
}
?>