
// =============================================================================
// SCRIPT XỬ LÝ CHO TRANG HỒ SƠ CÁ NHÂN (PROFILE.HTML)
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
    // SỬA LOGIC: Kiểm tra 1 trong 2 biến (dành cho đăng nhập thường hoặc MXH)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("jwt_token") !== null;

    if (!isLoggedIn) {
        alert("Khu vực hạn chế! Vui lòng đăng nhập để truy cập hồ sơ của bạn.");
        window.location.href = "DangNhap.php"; // Chuyển sang .php
        return;
    }

    const profileForm = document.getElementById("profileForm");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    const avatarPreview = document.getElementById("avatarPreview");
    const avatarEditBtn = document.getElementById("avatarEdit");
    const avatarInput = document.getElementById("avatarInput");

    const passwordForm = document.getElementById("passwordForm");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const strengthFill = document.querySelector(".strength-fill");
    const strengthText = document.querySelector(".strength-text");

    let savedName = "";
    let savedEmail = "";
    let savedPhone = "";
    let savedImg = localStorage.getItem("userAvatar") || "assets/user.png";

    // Lấy chuỗi thông tin user từ cục user_info do login.js lưu lại
    const userInfoString = localStorage.getItem("user_info");

    if (userInfoString) {
        // Dịch chuỗi JSON thành Object để lấy từng thành phần
        const userObj = JSON.parse(userInfoString);

        // Lấy dữ liệu (chú ý: tên biến như fullname, email, phone phải khớp với API backend PHP trả về)
        savedName = userObj.fullname || localStorage.getItem("userName") || "";
        savedEmail = userObj.email || "";

        // *Lưu ý: Nếu database của bạn cột số điện thoại tên khác (vd: sdt, so_dien_thoai) thì đổi userObj.phone thành userObj.sdt
        savedPhone = userObj.phone || userObj.sdt || "";

        if (userObj.avatar) {
            savedImg = userObj.avatar;
        }
    }

    if (fullNameInput) fullNameInput.value = savedName;
    if (emailInput) emailInput.value = savedEmail;
    if (phoneInput) phoneInput.value = savedPhone;
    if (avatarPreview) avatarPreview.src = savedImg;

    const headerName = document.getElementById("userName");
    const headerAvatar = document.getElementById("userAvatar");
    if (headerName) headerName.textContent = savedName || "Thành Viên";
    if (headerAvatar && savedImg !== "assets/user.png") {
        headerAvatar.style.backgroundImage = `url('${savedImg}')`;
        headerAvatar.style.backgroundSize = "cover";
    }

    avatarEditBtn?.addEventListener("click", () => avatarInput?.click());

    avatarInput?.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Kích thước ảnh quá lớn (Vui lòng chọn ảnh dưới 2MB).");
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event) {
                const base64Image = event.target.result;
                if (avatarPreview) avatarPreview.src = base64Image;
                localStorage.setItem("userAvatar", base64Image);
            };
            reader.readAsDataURL(file);
        }
    });

    profileForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const newName = fullNameInput.value.trim();
        const newEmail = emailInput.value.trim();
        const newPhone = phoneInput.value.trim();

        if (!newName || !newEmail) {
            alert("Họ và tên và Email không được để trống!");
            return;
        }

        localStorage.setItem("registeredName", newName);
        localStorage.setItem("userName", newName);
        localStorage.setItem("registeredEmail", newEmail);
        localStorage.setItem("userPhone", newPhone);

        alert("🎉 Cập nhật thông tin cá nhân thành công!");
        window.location.reload();
    });

    document.querySelectorAll(".toggle-pw").forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const input = document.getElementById(targetId);
            const icon = button.querySelector("span");

            if (input && input.type === "password") {
                input.type = "text";
                if (icon) icon.textContent = "🙈";
            } else if (input) {
                input.type = "password";
                if (icon) icon.textContent = "👁️";
            }
        });
    });

    newPassword?.addEventListener("input", (e) => {
        const value = e.target.value;
        let score = 0;
        if (value.length >= 6) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        if (value.length === 0) {
            if (strengthFill) { strengthFill.style.width = "0%"; strengthFill.style.backgroundColor = "#ddd"; }
            if (strengthText) strengthText.textContent = "Độ mạnh";
        } else if (score <= 1) {
            if (strengthFill) { strengthFill.style.width = "30%"; strengthFill.style.backgroundColor = "#ef4444"; }
            if (strengthText) strengthText.textContent = "Yếu 🔴";
        } else if (score <= 3) {
            if (strengthFill) { strengthFill.style.width = "60%"; strengthFill.style.backgroundColor = "#eab308"; }
            if (strengthText) strengthText.textContent = "Trung bình 🟡";
        } else {
            if (strengthFill) { strengthFill.style.width = "100%"; strengthFill.style.backgroundColor = "#22c55e"; }
            if (strengthText) strengthText.textContent = "Mạnh 🟢";
        }
    });

    passwordForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const passValue = newPassword.value;
        const confirmValue = confirmPassword.value;

        if (!passValue) { alert("Vui lòng nhập mật khẩu mới."); return; }
        if (passValue.length < 6) { alert("Mật khẩu mới phải có độ dài từ 6 ký tự trở lên."); return; }
        if (passValue !== confirmValue) { alert("Xác nhận mật khẩu không khớp. Vui lòng nhập lại!"); return; }

        localStorage.setItem("registeredPassword", passValue);
        alert("Đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới của bạn.");
        passwordForm.reset();
        if (strengthFill) { strengthFill.style.width = "0%"; strengthFill.style.backgroundColor = "#ddd"; }
        if (strengthText) strengthText.textContent = "Độ mạnh";
    });
});