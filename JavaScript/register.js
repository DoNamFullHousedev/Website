// Script/register.js
// =============================================================================
// FILE SCRIPT XỬ LÝ ĐĂNG KÝ THẬT - KẾT NỐI API BACKEND PHP
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm");
    const agreeCheckbox = document.getElementById("agree");

    const togglePwBtn = document.getElementById("togglePw");
    const eyeIcon = document.getElementById("eyeIcon");
    const toggleConfirmBtn = document.getElementById("toggleConfirm");
    const eyeIcon2 = document.getElementById("eyeIcon2");

    // LƯU Ý QUAN TRỌNG: Đổi 'Tên_Thư_Mục_Của_Bạn' thành tên thư mục dự án trong htdocs
    // Ví dụ: "http://localhost/doi_song_suc_khoe/Backend/routes/api.php"
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

    toggleConfirmBtn?.addEventListener("click", () => {
        if (confirmInput.type === "password") {
            confirmInput.type = "text";
            if (eyeIcon2) eyeIcon2.textContent = "🙈";
            toggleConfirmBtn.setAttribute("aria-label", "Ẩn mật khẩu");
        } else {
            confirmInput.type = "password";
            if (eyeIcon2) eyeIcon2.textContent = "👁️";
            toggleConfirmBtn.setAttribute("aria-label", "Hiện mật khẩu");
        }
    });

    // =========================================================================
    // 2. XỬ LÝ SUBMIT FORM GỌI API BACKEND
    // =========================================================================
    registerForm?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullnameValue = fullnameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const confirmValue = confirmInput.value.trim();

        // Rà lỗi dữ liệu cơ bản (Validation)
        if (!fullnameValue || fullnameValue.length < 2) {
            alert("Vui lòng nhập họ và tên hợp lệ.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue || !emailRegex.test(emailValue)) {
            alert("Địa chỉ email không đúng định dạng.");
            return;
        }

        if (!passwordValue || passwordValue.length < 6) {
            alert("Mật khẩu bảo mật bắt buộc phải có độ dài từ 6 ký tự trở lên.");
            return;
        }

        if (passwordValue !== confirmValue) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }

        if (!agreeCheckbox || !agreeCheckbox.checked) {
            alert("Bạn phải đồng ý với điều khoản sử dụng của hệ thống.");
            return;
        }

        try {
            // Đổi trạng thái nút bấm khi đang gửi request
            const submitBtn = registerForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = "Đang xử lý...";
            submitBtn.disabled = true;

            // GỌI API ĐĂNG KÝ XUỐNG BACKEND PHP
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullname: fullnameValue,
                    email: emailValue,
                    password: passwordValue
                })
            });

            const data = await response.json();

            // Khôi phục nút bấm
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Kiểm tra kết quả từ Backend
            if (response.status === 201) {
                alert(`Chúc mừng ${fullnameValue}, bạn đã đăng ký tài khoản thành công! Hệ thống sẽ chuyển hướng sang trang đăng nhập.`);
                window.location.href = "DangNhap.html";
            } else {
                // Hiển thị lỗi (ví dụ: Email đã tồn tại)
                alert("Lỗi: " + data.message);
            }
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            alert("Không thể kết nối đến máy chủ. Vui lòng đảm bảo bạn đang chạy XAMPP.");
        }
    });

    // =========================================================================
    // 3. GIẢ LẬP ĐĂNG KÝ NHANH QUA MXH (Giữ nguyên tạm thời)
    // =========================================================================
    const googleBtn = document.querySelector(".btn-google-regis");
    const facebookBtn = document.querySelector(".btn-facebook-regis");

    const handleSocialSignUp = (platform) => {
        alert(`Tính năng đăng ký bằng ${platform} đang được phát triển!`);
    };

    googleBtn?.addEventListener("click", () => handleSocialSignUp("Google"));
    facebookBtn?.addEventListener("click", () => handleSocialSignUp("Facebook"));
});