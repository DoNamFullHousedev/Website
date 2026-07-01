// ==========================================================================
//  Logic trang hồ sơ
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ----- Toggle password visibility -----
  document.querySelectorAll(".toggle-pw").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      const icon = btn.querySelector("span");
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      icon.textContent = isHidden ? "🙈" : "👁️";
      btn.setAttribute("aria-label", isHidden ? "Ẩn mật khẩu" : "Hiện mật khẩu");
    });
  });

  // ----- Avatar upload -----
  const avatarEdit = document.getElementById("avatarEdit");
  const avatarInput = document.getElementById("avatarInput");
  const avatarPreview = document.getElementById("avatarPreview");

  avatarEdit.addEventListener("click", () => avatarInput.click());

  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh vượt quá 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      avatarPreview.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  // ----- Profile form -----
  const profileForm = document.getElementById("profileForm");
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!fullName || !email || !phone) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    console.log("Lưu profile:", { fullName, email, phone });
    alert("Thông tin đã được lưu (demo)!"); window.location.href = "./index.html";
  });

  // ----- Password form -----
  const passwordForm = document.getElementById("passwordForm");
  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const current = document.getElementById("currentPassword").value;
    const newPw = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!current || !newPw || !confirm) {
      alert("Vui lòng điền đầy đủ các trường mật khẩu.");
      return;
    }
    if (newPw !== confirm) {
      alert("Mật khẩu mới và xác nhận không khớp.");
      return;
    }

    console.log("Đổi mật khẩu");
    alert("Mật khẩu đã được cập nhật (demo)!");
  });

  // ----- Newsletter -----
  const newsletterForm = document.getElementById("newsletterForm");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector("input[type='email']").value.trim();
    if (!email) return;
    console.log("Đăng ký nhận tin:", email);
    alert("Đã đăng ký nhận tin (demo)!");
    newsletterForm.reset();
  });
});
