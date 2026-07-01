<?php
// 1. Cấu hình kết nối Cơ sở dữ liệu (Thay đổi thông tin phù hợp với DB của bạn)
$host     = 'localhost';
$dbname   = 'suckhoe';
$username = 'root';
$password = '';
$charset  = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
    die("Lỗi kết nối Database: " . $e->getMessage());
}

// 2. Mảng chứa dữ liệu bài viết (Đã thêm trường category_id)
$posts = [
    [
        'user_id'     => 1, 
        'category_id' => 1, // <--- THÊM DÒNG NÀY
        'title'       => 'Hướng Dẫn Sơ Cứu Dị Vật Đường Thở Bằng Thủ Thuật Heimlich',
        'thumbnail'   => '../Image/socuuheimlich.png',
        'views'       => 1500,
        'likes'       => 5,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 1, // <--- THÊM DÒNG NÀY
        'title'       => 'Hướng Dẫn Sơ Cứu Dị Vật Đường Thở Bằng Thủ Thuật Heimlich',
        'thumbnail'   => '../Image/socuuheimlich.png',
        'views'       => 1500,
        'likes'       => 5,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 2, // Gán danh mục Lối sống khỏe
        'title'       => '7 Thói Quen Buổi Sáng Giuyên Cơ Thể Tràn Đầy Năng Lượng',
        'thumbnail'   => '../Image/7thoiquenvaobuoisang.png',
        'views'       => 0, 
        'likes'       => 0,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 3, // Gán danh mục Bệnh lý
        'title'       => 'Bệnh Alzheimer: Nguyên nhân, triệu chứng và chiến lược phòng ngừa sa sút trí tuệ',
        'thumbnail'   => '../Image/Alzheimer.png',
        'views'       => 19300, 
        'likes'       => 0,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 8, // Gán danh mục Hệ cơ xương khớp
        'title'       => 'Ảnh hưởng của lối sống đến sức khỏe cơ xương khớp: Những thói quen giúp bảo vệ xương và khớp khỏe mạnh',
        'thumbnail'   => '../Image/baovexuongkhop.png',
        'views'       => 5700, 
        'likes'       => 0,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 13, // Hệ cơ quan giác quan
        'title'       => 'Ảnh hưởng của lối sống đến sức khỏe mắt và thị giác: Những thói quen quan trọng giúp bảo vệ đôi mắt',
        'thumbnail'   => '../Image/chamsocmat.png',
        'views'       => 5300, 
        'likes'       => 0,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 6, // Hệ hô hấp
        'title'       => 'Ảnh hưởng của lối sống đến sức khỏe hô hấp: Những thói quen giúp bảo vệ phổi và đường thở',
        'thumbnail'   => '../Image/suckhoecuaphoi.png',
        'views'       => 5900, 
        'likes'       => 0,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 4, // Sơ cứu
        'title'       => 'Hướng Dẫn Sơ Cứu Dị Vật Đường Thở Bằng Thủ Thuật Heimlich',
        'thumbnail'   => '../Image/socuuheimlich.png',
        'views'       => 1500,
        'likes'       => 5,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 14, // Bệnh ngoài da
        'title'       => 'Mụn trứng cá (Acne): Nguyên nhân, triệu chứng và cách điều trị hiệu quả',
        'thumbnail'   => 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&q=80',
        'views'       => 8700,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 5, // Hệ tuần hoàn
        'title'       => 'Bệnh tim mạch và hệ tuần hoàn: Nguyên nhân hàng đầu gây tử vong và cách phòng ngừa hiệu quả',
        'thumbnail'   => '../Image/timmachkhoemanh.png',
        'views'       => 12500,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 10, // Hệ nội tiết và chuyển hoá
        'title'       => 'Béo phì (Obesity): Nguyên nhân, biến chứng và chiến lược giảm cân bền vững',
        'thumbnail'   => '../Image/beophi.png',
        'views'       => 16800,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 12, // Hệ sinh dục và sinh sản
        'title'       => 'Hội chứng buồng trứng đa nang (PCOS): Nguyên nhân, triệu chứng và chiến lược điều trị toàn diện',
        'thumbnail'   => '../Image/hoichungbuongtrung.png',
        'views'       => 12900,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 7, // Hệ tiêu hoá
        'title'       => 'Cách bảo vệ và cải thiện sức khỏe hệ tiêu hóa: Những nguyên tắc quan trọng nhất',
        'thumbnail'   => '../Image/hetieuhoavoiraucu.png',
        'views'       => 5100,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 4, 
        'title'       => 'Hướng Dẫn Sơ Cứu Dị Vật Đường Thở Bằng Thủ Thuật Heimlich',
        'thumbnail'   => '../Image/socuuheimlich.png',
        'views'       => 1500,
        'likes'       => 5,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 2, 
        'title'       => 'Cách Xây Dựng Lối Sống Lành Mạnh Cho Người Bận Rộn',
        'thumbnail'   => '../Image/default-lifestyle.png', 
        'views'       => 850,
        'likes'       => 12,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 2, 
        'title'       => 'Chế độ ăn uống lành mạnh cho người trưởng thành: Những điều bạn cần biết để sống khoẻ hơn mỗi ngày',
        'thumbnail'   => '../Image/traicaymatlanh.png',
        'views'       => 4200,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 1, 
        'title'       => 'TP.HCM khởi động chiến dịch phòng chống sốt xuất huyết trước mùa mưa 2024',
        'thumbnail'   => '../Image/phongchongsotuathuyet.png',
        'views'       => 3200,
        'likes'       => 14,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 6, 
        'title'       => 'COPD - Bệnh phổi tắc nghẽn mạn tính: Nguyên nhân, triệu chứng và cách điều trị',
        'thumbnail'   => '../Image/COPD.png',
        'views'       => 6200,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 10, 
        'title'       => 'Cường giáp (Hyperthyroidism): Nguyên nhân, triệu chứng và phương pháp điều trị hiệu quả',
        'thumbnail'   => '../Image/cuonggiap.png',
        'views'       => 11700,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 4, 
        'title'       => 'Hướng Dẫn Sơ Cứu Dị Vật Đường Thở Bằng Thủ Thuật Heimlich',
        'thumbnail'   => '../Image/socuuheimlich.png',
        'views'       => 1500,
        'likes'       => 5,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 10, 
        'title'       => 'Đái tháo đường type 2: Nguyên nhân, triệu chứng và phác đồ điều trị toàn diện',
        'thumbnail'   => '../Image/kiemtraduong.png',
        'views'       => 8700,
        'likes'       => 14, 
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 9, // Hệ thần kinh
        'title'       => 'Đau nửa đầu (Migraine): Nguyên nhân, triệu chứng và chiến lược điều trị toàn diện',
        'thumbnail'   => '../Image/daunuadau.png',
        'views'       => 15200,
        'likes'       => 28, 
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 5, 
        'title'       => 'Đột phá trong điều trị tim mạch: Công nghệ Nano mới mang lại hi vọng',
        'thumbnail'   => '../image_8d2ce1.png',
        'views'       => 2450, 
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 9, 
        'title'       => 'Động kinh (Epilepsy): Nguyên nhân, triệu chứng và chiến lược điều trị toàn diện',
        'thumbnail'   => '../Image/dongkinh.png',
        'views'       => 14800,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 5, 
        'title'       => 'Đột phá trong điều trị tim mạch: Công nghệ Nano mới mang lại hi vọng',
        'thumbnail'   => '../image_8d2ce1.png',
        'views'       => 1200, 
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 5, 
        'title'       => 'Đột quỵ (Tai biến mạch máu não): Dấu hiệu nhận biết sớm, cấp cứu và phòng ngừa',
        'thumbnail'   => '../Image/dotquy.png',
        'views'       => 18400,
        'likes'       => 28,
        'status'      => 'published',
    ],
    [
        'user_id'     => 1, 
        'category_id' => 5, 
        'title'       => 'Đột quỵ não: Dấu hiệu nhận biết sớm, cấp cứu kịp thời và chiến lược phòng ngừa hiệu quả',
        'thumbnail'   => '../Image/dotquynao.png',
        'views'       => 18900,
        'likes'       => 28,
        'status'      => 'published',
    ],
];

// 3. ĐÃ CẬP NHẬT: Câu lệnh SQL thêm cột category_id
$sql = "INSERT INTO posts (user_id, category_id, title, thumbnail, views, likes, created_at, updatedAt, status) 
        VALUES (:user_id, :category_id, :title, :thumbnail, :views, :likes, NOW(), NOW(), :status)";

try {
    $stmt = $pdo->prepare($sql);
    
    $successCount = 0;
    foreach ($posts as $postItem) { // Đổi biến lặp tránh trùng tên mảng
        $stmt->execute([
            ':user_id'     => $postItem['user_id'],
            ':category_id' => $postItem['category_id'], // <--- BẮT BUỘC TRUYỀN VALUE VÀO ĐÂY
            ':title'       => $postItem['title'],
            ':thumbnail'   => $postItem['thumbnail'],
            ':views'       => $postItem['views'],
            ':likes'       => $postItem['likes'],
            ':status'      => $postItem['status']
        ]);
        $successCount++;
    }
    
    echo "🎉 Thành công! Đã chèn dữ liệu bài viết (có category_id) vào database.";
} catch (\PDOException $e) {
    echo "❌ Lỗi thực thi SQL: " . $e->getMessage();
}
?>