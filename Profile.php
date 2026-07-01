<?php
// Xử lý dữ liệu form cơ bản
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['update_profile'])) {
        $fullName = $_POST['fullName'] ?? '';
        $email    = $_POST['email'] ?? '';
        $phone    = $_POST['phone'] ?? '';
        // Code xử lý update thông tin ở Database
    } elseif (isset($_POST['update_password'])) {
        $newPassword     = $_POST['newPassword'] ?? '';
        $confirmPassword = $_POST['confirmPassword'] ?? '';
        // Code xử lý update mật khẩu ở Database
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hồ sơ | Đời sống sức khỏe</title>
    <link rel="stylesheet" href="CSS/main.css" />
    <script src="JavaScript/home.js" defer></script>
    <script src="JavaScript/profile.js" defer></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
  </head>
  </head>
  <body>
    <header class="site-header">
      <!-- Main navbar -->
      <nav class="navbar" aria-label="Main navigation">
        <div class="navbar__inner">
          <!-- Brand -->
          <a href="Trangchu.html" class="navbar__brand" aria-label="Trang chủ">
            <img src="assets/logo.png" alt="HealthyCare News" class="navbar__logo" />
            <div class="navbar__brand-text">
              <span class="navbar__brand-name">Đời sống sức khoẻ</span>
              <span class="navbar__brand-tagline">Tin tức sức khoẻ hàng ngày</span>
            </div>
          </a>

          <!-- Nav links -->
          <div class="navbar__nav">
            <a href="Trangchu.html">Trang chủ</a>
            <a href="TinTucYTe.html">Tin tức y tế</a>
            <a href="TinhTrangSucKhoe.html">Tình trạng sức khoẻ</a>
            <a href="LoiSongKhoe.html">Lối sống khoẻ</a>
            <a href="SoCuu.html">Sơ cứu</a>
          </div>

          <!-- Actions -->
          <div class="navbar__search" id="searchBox">
            <input class="search_input" id="searchInput" type="search" placeholder="Nhập từ khóa tìm kiếm...">
              <button class="navbar__search-btn" id="searchToggleBtn" aria-label="Tìm kiếm">
                <img class="search_img" src="assets/search.png" alt="tìm kiếm"/>
              </button>
          </div>

          <div class="navbar__actions">
              <a href="DangNhap.html" class="navbar__login-btn" id="loginBtn">
                <img class="user_img" src="assets/user.png" alt="người dùng"/>
                Đăng nhập
              </a>
              <div class="navbar__user" id="userMenu" style="display:none;">
                <button class="navbar__user-btn" id="userMenuToggle">
                  <span class="navbar__avatar" id="userAvatar"></span>
                  <span class="navbar__user-name" id="userName"></span>
                  <img class="user_symbol" src="assets/arrow.png" alt="mũi tên"/>
                </button>
                <div class="navbar__user-menu">
                  <button class="logout" id="logoutBtn">Đăng xuất</button>
                </div>
              </div>
              <button class="navbar__hamburger " aria-label="Menu ">
                <span></span><span></span><span></span>
              </button>
          </div>
        </div>
      </nav>
    </header>

    <div class="profile__layout">
      <!-- Sidebar -->
      <aside class="profile__sidebar">
        <a href="#" class="profile__nav-item active">
          <span>Profile</span>
        </a>
      </aside>

      <!-- Main Content -->
      <main class="main">
        <!-- Profile Information -->
        <section class="card">
          <h2 class="card-title">Thông tin cá nhân</h2>
          <p class="card-desc">Cập nhật ảnh và thông tin chi tiết</p>

          <form class="profile-form" id="profileForm">
            <div class="form-row">
              <div class="avatar-col">
                <div class="avatar-wrap">
                  <img id="avatarPreview" src="" alt="Avatar" class="avatar-img" />
                  <button type="button" class="avatar-edit" id="avatarEdit" aria-label="Đổi ảnh đại diện">📷</button>
                  <input type="file" id="avatarInput" accept="image/jpeg,image/png,image/gif" hidden />
                </div>
              </div>

              <div class="fields-col">
                <div class="field-row two-col">
                  <div class="field">
                    <label for="fullName">Họ và tên</label>
                    <input type="text" id="fullName"/>
                  </div>
                  <div class="field">
                    <label for="email">Địa chỉ email</label>
                    <input type="email" id="email" />
                  </div>
                </div>
                <div class="field-row">
                  <div class="field">
                    <label for="phone">Số điện thoại</label>
                    <input type="tel" id="phone"/>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary">Lưu thay đổi</button>
            </div>
          </form>
        </section>

        <!-- Password Update -->
        <section class="card">
          <h2 class="card-title">Thay đổi mật khẩu</h2>
          <p class="card-desc">Hãy đảm bảo tài khoản của bạn sử dụng mật khẩu dài và ngẫu nhiên để giữ an toàn.</p>

          <form class="password-form" id="passwordForm">
            <div class="field">
              <label for="newPassword">Mật khẩu mới</label>
              <div class="password-wrap">
                <input type="password" id="newPassword"/>
                <button type="button" class="toggle-pw" data-target="newPassword" aria-label="Hiện mật khẩu">
                  <span>👁️</span>
                </button>
              </div>
              <div class="strength-bar">
                <div class="strength-fill" style="width: 0%"></div>
              </div>
              <p class="strength-text">Độ mạnh</p>
            </div>

            <div class="field">
              <label for="confirmPassword">Xác nhận mật khẩu mới</label>
              <div class="password-wrap">
                <input type="password" id="confirmPassword"/>
                <button type="button" class="toggle-pw" data-target="confirmPassword" aria-label="Hiện mật khẩu">
                  <span>👁️</span>
                </button>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-secondary">Cập nhật mật khẩu</button>
            </div>
          </form>
        </section>
      </main>
    </div>

  <!-- Footer -->
  <footer class="footer">
              <div class="footer__inner">
                  <!-- Brand column -->
                  <div class="footer__brand">
                  <a href="#" class="footer__brand-logo" aria-label="Trang chủ">
                      <img src="assets/logo.png" alt="HealthyCare News" class="footer__logo" />
                      <span class="footer__brand-name">Đời sống sức khoẻ</span>
                  </a>
                  <p class="footer__brand-desc">
                      Đời sống sức khoẻ là trang thông tin sức khoẻ và đời sống, cung cấp tin tức chính xác, bài viết chuyên sâu về sức khoẻ, học thuật và cẩm nang sống khoẻ hàng ngày.
                  </p>
                  <div class="footer__socials">
                      <a href="#" class="footer__social-link" aria-label="Facebook">
                      <img class="footer__social-link-image" src="assets/facebook.png" alt="Facebook"/>
                      </a>
                      <a href="#" class="footer__social-link" aria-label="YouTube">
                      <img class="footer__social-link-image" src="assets/youtube.png" alt="Youtube"/>
                      </a>
                      <a href="#" class="footer__social-link" aria-label="Instagram">
                      <img class="footer__social-link-image" src="assets/instagram.png" alt="Instagram"/>
                      </a>
                      <a href="#" class="footer__social-link" aria-label="Gmail">
                      <img class="footer__social-link-image" src="assets/gmail.png" alt="Gmail"/>
                      </a>
                  </div>
                  </div>

                  <!-- Chuyên mục -->
                  <div class="footer__col">
                  <h3 class="footer__col-title">Chuyên mục chính</h3>
                  <nav class="footer__links" aria-label="Chuyên mục">
                      <a href="TinTucYTe/TinTucYTe.html">Tin tức y tế</a>
                      <a href="TinhTrangSucKhoe/TinhTrangSucKhoe.html">Tình trạng sức khoẻ</a>
                      <a href="LoiSongKhoe/LoiSongKhoe.html">Lối sống khoẻ</a>
                      <a href="SoCuu/SoCuu.html">Hướng dẫn sơ cứu</a>
                  </nav>
                  </div>

                  <!-- Hỗ trợ -->
                  <div class="footer__col">
                  <h3 class="footer__col-title">Thông tin hỗ trợ</h3>
                  <nav class="footer__links" aria-label="Hỗ trợ">
                      <a href="#">Về chúng tôi</a>
                      <a href="#">Liên hệ</a>
                      <a href="#">Điều khoản sử dụng</a>
                      <a href="#">Chính sách bảo mật và điều khoản</a>
                  </nav>
                  </div>

                  <!-- Newsletter -->
                  <div class="footer__col">
                  <h3 class="footer__col-title">Đăng ký nhận tin</h3>
                  <p class="footer__newsletter-text">
                      Nhận bản tin y tế hàng tuần, cập nhật xu hướng sức khoẻ mới nhất.
                  </p>
                  <div class="footer__newsletter-form">
                      <input
                      type="email"
                      class="footer__newsletter-input"
                      placeholder="Email của bạn"
                      aria-label="Email đăng ký nhận tin"
                      />
                      <button class="footer__newsletter-btn" aria-label="Đăng ký">
                      <img class="send" src="assets/white-arrow.png" alt="gửi"/>
                      </button>
                  </div>
                  </div>

              </div>

              <!-- Bottom bar -->
              <div class="footer__bottom">
                  <p>© 2024 Đời sống sức khoẻ. Tất cả bản quyền được bảo lưu.</p>
              </div>
          </footer>
  </body>
</html>
