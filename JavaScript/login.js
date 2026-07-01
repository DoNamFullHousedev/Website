// Script/login.js
// =============================================================================
// FILE SCRIPT XỬ LÝ ĐĂNG NHẬP THẬT - KẾT NỐI API BACKEND PHP
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePwBtn = document.getElementById("togglePw");
    const eyeIcon = document.getElementById("eyeIcon");

    const API_URL = "http://localhost/web/Backend/routes/api.php";

    // =========================================================================
    // 1. TÍNH NĂNG ẨN / HIỆN MẬT KHẨU
    // =========================================================================
    togglePwBtn?.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            if (eyeIcon) eyeIcon.textContent = "🙈";
            togglePwBtn.setAttribute("aria-label", "Ẩn mật khẩu");
        } else {
            passwordInput.type = "password";
            if (eyeIcon) eyeIcon.textContent = "👁️";
            togglePwBtn.setAttribute("aria-label", "Hiện mật khẩu");
        }
    });

    // =========================================================================
    // 2. XỬ LÝ ĐĂNG NHẬP GỌI API BACKEND
    // =========================================================================
    loginForm?.addEventListener("submit", async (e) => {
        e.preventDefault(); // Chặn tải lại trang

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Validate cơ bản
        if (!emailValue || !passwordValue) {
            alert("Vui lòng nhập đầy đủ email và mật khẩu.");
            return;
        }

        try {
            // Hiển thị trạng thái đang load (tùy chọn)
            const submitBtn = loginForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = "Đang xử lý...";
            submitBtn.disabled = true;

            // GỌI API XUỐNG BACKEND PHP
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })
            });

            const data = await response.json();

            // Khôi phục nút bấm
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            if (response.status === 200) {
                // Đăng nhập thành công -> Lưu Token và thông tin User vào LocalStorage
                localStorage.setItem("jwt_token", data.token);
                localStorage.setItem("user_info", JSON.stringify(data.user));

                alert(`🎉 ${data.message} Chào mừng ${data.user.fullname} trở lại!`);

                // Kiểm tra Role để điều hướng (Admin vào Dashboard, User vào Trang chủ)
                if (data.user.role === 'admin') {
                    window.location.href = "Admin_dashboard.html";
                } else {
                    const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
                    if (redirectUrl) {
                        sessionStorage.removeItem("redirectAfterLogin");
                        window.location.href = redirectUrl;
                    } else {
                        window.location.href = "Trangchu.html"; // Mặc định về trang chủ
                    }
                }
            } else {
                // Hiển thị lỗi từ Backend (Sai pass, không tồn tại email...)
                alert("Lỗi: " + data.message);
            }

        } catch (error) {
            console.error("Lỗi kết nối API:", error);
            alert("Không thể kết nối đến máy chủ. Vui lòng đảm bảo bạn đang chạy qua localhost (XAMPP).");
        }
    });

    // =========================================================================
    // 3. ĐĂNG NHẬP MẠNG XÃ HỘI (Giữ nguyên logic tạm thời)
    // =========================================================================
    const googleBtn = document.querySelector(".btn-google-login");
    const facebookBtn = document.querySelector(".btn-facebook-login");

    const handleSocialLogin = (platform) => {
        alert(`Tính năng đăng nhập ${platform} đang được phát triển!`);
    };

    googleBtn?.addEventListener("click", () => handleSocialLogin("Google"));
    facebookBtn?.addEventListener("click", () => handleSocialLogin("Facebook"));
});