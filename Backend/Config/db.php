<?php
class Database {
    private $host = "localhost";
    private $db_name = "suckhoe"; // Tên database của bạn
    private $username = "root";             // Username mặc định của XAMPP/Laragon
    private $password = "";                 // Password mặc định thông thường để trống
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name, 
                $this->username, 
                $this->password
            );
            // Thiết lập font chữ UTF-8 để không bị lỗi tiếng Việt
            $this->conn->exec("set names utf8");
            // Bật chế độ báo lỗi ngoại lệ để dễ kiểm tra bug
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Lỗi kết nối CSDL: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>