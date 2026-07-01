<?php
// Khử lỗi cơ bản và khởi tạo biến xử lý
$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Phân biệt form nào đang được submit dựa vào name của nút submit hoặc input ẩn
    if (isset($_POST['update_profile'])) {
        $fullname = $_POST['fullname'] ?? '';
        $email    = $_POST['email'] ?? '';
        $phone    = $_POST['phone'] ?? '';
        // Xử lý cập nhật thông tin cá nhân tại đây
        $message = "Đã cập nhật thông tin cá nhân thành công!";
    } elseif (isset($_POST['update_password'])) {
        $old_pwd  = $_POST['old_password'] ?? '';
        $new_pwd  = $_POST['new_password'] ?? '';
        // Xử lý kiểm tra và cập nhật mật khẩu tại đây
        $message = "Đã cập nhật mật khẩu thành công!";
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Profile · Quản trị viên</title>
  <meta name="description" content="Trang quản trị viên - cập nhật thông tin cá nhân và mật khẩu." />
  <link rel="stylesheet" href="CSS/admin.css" />
  <script src="JavaScript/script.js" defer></script>
  <script src="JavaScript/nav-link.js" defer></script>
  <link rel="stylesheet" href="https://unpkg.com/lucide-static@latest/font/lucide.css" />
</head>
<body>
  <div class="layout">
    <!-- ============ SIDEBAR ============ -->
    <aside class="sidebar">
      <div>
        <div class="brand">
          <span class="brand-name">Quản trị viên</span>
        </div>
        <nav class="nav">
          <a href="Admin_profile.html" class="nav-item active"><i class="icon-user"></i><span>Profile</span></a>
          <a href="Admin_dashboard.html" class="nav-item"><i class="icon-layout-dashboard"></i><span>Bảng điều khiển</span></a>
          <a href="Admin_user.html" class="nav-item"><i class="icon-users"></i><span>Quản lý người dùng</span></a>
          <a href="Admin_comment.html" class="nav-item"><i class="icon-message-square"></i><span>Quản lý bình luận</span></a>
          <a href="Admin_article.html" class="nav-item"><i class="icon-file-text"></i><span>Quản lý bài viết</span></a>
          <a href="Admin_category.html" class="nav-item"><i class="icon-folder-tree"></i><span>Quản lý danh mục</span></a>
        </nav>
      </div>
      <div class="nav nav-footer">
        <button class="nav-item"><i class="icon-log-out"></i><span>Đăng xuất</span></button>
      </div>
    </aside>

    <div class="main">
      <!-- ============ HEADER ============ -->
      <header class="header">
        <div class="site">
          <div class="site-logo">
            <img class="admin_icon_img" src="assets/logo.png" alt="logo"/>
          </div>
          <div>
            <h3 class="site-title">Đời sống sức khoẻ</h3>
            <p class="caption muted">Tin tức sức khoẻ hàng ngày</p>
          </div>
        </div>
        <div class="header-actions">
          <div class="search">
            <i class="icon-search"></i>
            <input type="text" placeholder="Tìm kiếm dữ liệu..." />
          </div>
          <button class="icon-btn">
            <i class="icon-bell"></i>
            <span class="dot"></span>
          </button>
          <div class="avatar-sm"></div>
        </div>
      </header>

      <!-- ============ CONTENT ============ -->
      <main class="content">
        <!-- Profile Information -->
        <section class="card">
          <header class="card-header">
            <h2>Thông tin cá nhân</h2>
            <p class="caption muted">Cập nhật ảnh và thông tin cá nhân chi tiết tại đây</p>
          </header>
          <div class="profile-row">
            <div class="avatar-block">
              <div class="change_avatar">
                <i class="icon-user"></i>
                <button class="avatar-edit" title="Đổi ảnh">✎</button>
              </div>
              <p class="caption muted">JPG, GIF or PNG. Max 3MB.</p>
            </div>
            <div class="grid-2">
              <label class="field">
                <span>Họ và tên</span>
                <input type="text" />
              </label>
              <label class="field">
                <span>Địa chỉ email</span>
                <input type="email"/>
              </label>
              <label class="field span-2">
                <span>Số điện thoại</span>
                <input type="tel"/>
              </label>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary" id="saveProfile">Lưu thay đổi</button>
          </div>
        </section>

        <!-- Password Update -->
        <section class="card">
          <header class="card-header">
            <h2>Cập nhật mật khẩu</h2>
            <p class="caption muted">Hãy đảm bảo tài khoản của bạn sử dụng mật khẩu dài và ngẫu nhiên để giữ an toàn</p>
          </header>
          <div class="form-stack">
            <label class="field">
              <span>Mật khẩu cũ</span>
              <div class="input-wrap">
                <input type="password" data-pwd />
                <button class="toggle-pwd" type="button"><i class="icon-eye"></i></button>
              </div>
            </label>

            <label class="field">
              <span>Mật khẩu mới</span>
              <div class="input-wrap">
                <input type="password" id="newPwd" data-pwd />
                <button class="toggle-pwd" type="button"><i class="icon-eye"></i></button>
              </div>
              <div class="strength">
                <div class="strength-bar"><div id="strengthFill"></div></div>
                <p class="caption" id="strengthLabel">Độ mạnh</p>
              </div>
            </label>

            <label class="field">
              <span>Nhập lại mật khẩu mới</span>
              <div class="input-wrap">
                <input type="password" data-pwd />
                <button class="toggle-pwd" type="button"><i class="icon-eye"></i></button>
              </div>
            </label>
          </div>
          <div class="card-actions">
            <button class="btn btn-dark" id="updatePwd">Update Password</button>
          </div>
        </section>
      </main>
    </div>
  </div>
</body>
</html>
