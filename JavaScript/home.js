// Script/trangchu.js
// =============================================================================
// FILE GỘP: home.js + trangchu.js + ĐĂNG NHẬP MXH + ĐỒNG BỘ PROFILE THỰC TẾ
// -----------------------------------------------------------------------------
// Ghi chú hệ thống:
// - Giữ nguyên vẹn toàn bộ logic quét bài viết ngầm và toggle tìm kiếm gốc.
// - Tự động đồng bộ Tên thật mới từ Profile lên Navbar của tất cả các trang.
// - Tự động ẩn phần mật khẩu và dọn dữ liệu thừa khi đổi tài khoản (Google/FB).
// =============================================================================

const searchBox       = document.getElementById('searchBox');
const searchToggleBtn  = document.getElementById('searchToggleBtn');
const searchInputEl    = document.getElementById('searchInput'); // ô input thật
const navbarInner      = document.querySelector('.navbar__inner');

const loginBtn       = document.querySelector('.navbar__login-btn');
const userMenu       = document.querySelector('.navbar__user');
const userMenuToggle = document.getElementById('userMenuToggle');
const logoutBtn      = document.getElementById('logoutBtn');

// =============================================================================
// 0. TOGGLE ẨN / HIỆN THANH TÌM KIẾM 
// =============================================================================
searchToggleBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const isActive = searchBox.classList.toggle('active');
    navbarInner?.classList.toggle('search-active', isActive);

    if (isActive) {
        searchInputEl?.focus();
    } else {
        // Khi đóng thanh tìm kiếm, ẩn luôn box gợi ý và xoá nội dung đã gõ
        hideSuggestBox();
    }
});

document.addEventListener('click', (e) => {
    if (searchBox && !searchBox.contains(e.target)) {
        searchBox.classList.remove('active');
        navbarInner?.classList.remove('search-active');
        hideSuggestBox();
    }
});

// =============================================================================
// 1. ĐĂNG NHẬP / ĐĂNG XUẤT - MENU NGƯỜI DÙNG (Cập nhật Đồng bộ & Khử lỗi tài khoản)
// =============================================================================
function renderAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName') || "Thành viên"; // Lấy tên từ bộ nhớ
    const userAvatar = localStorage.getItem('userAvatar'); // Link ảnh MXH hoặc chuỗi Base64
    const loginType = localStorage.getItem('loginType'); // 'google', 'facebook' hoặc 'normal'

    if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : '';
    
    if (userMenu) {
        userMenu.style.display = isLoggedIn ? '' : 'none';
        
        // TỰ ĐỘNG ĐIỀN TÊN VÀO CẠNH AVATAR TRÊN TẤT CẢ CÁC TRANG
        const nameTextEl = document.getElementById("userName");
        if (nameTextEl && isLoggedIn) {
            nameTextEl.textContent = userName;
        }

        // TỰ ĐỘNG ĐỒNG BỘ ẢNH ĐẠI DIỆN THẬT LÊN CỤC TRÒN NAVBAR
        const avatarEl = document.getElementById("userAvatar");
        if (avatarEl && isLoggedIn && userAvatar) {
            avatarEl.style.backgroundImage = `url('${userAvatar}')`;
            avatarEl.style.backgroundSize = "cover";
            avatarEl.style.backgroundPosition = "center";
            avatarEl.innerHTML = ""; 
        }
    }

    // --- ĐỒNG BỘ DỮ LIỆU ĐỘC LẬP CHO TRANG PROFILE.HTML ---
    if (window.location.pathname.toLowerCase().includes("profile.html") && isLoggedIn) {
        const profileForm = document.getElementById("profileForm");
        const fullNameInput = document.getElementById("fullName");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const avatarPreview = document.getElementById("avatarPreview");
        const passwordForm = document.getElementById("passwordForm");

        // A. Đổ dữ liệu hiện tại từ bộ nhớ vào các ô nhập khi vừa vào trang
        if (fullNameInput) fullNameInput.value = userName;
        if (emailInput) emailInput.value = localStorage.getItem("registeredEmail") || "";
        if (phoneInput) phoneInput.value = localStorage.getItem("userPhone") || "";
        if (avatarPreview && userAvatar) avatarPreview.src = userAvatar;

        // B. Bắt sự kiện khi người dùng sửa Tên mới/SĐT mới và bấm nút "Lưu thay đổi"
        profileForm?.addEventListener("submit", (e) => {
            e.preventDefault(); // Chặn hành vi tải lại trang mặc định làm mất tiến trình

            const newName = fullNameInput.value.trim();
            const newEmail = emailInput.value.trim();
            const newPhone = phoneInput.value.trim();

            if (!newName) {
                alert("❌ Họ và tên không được để trống!");
                return;
            }

            // Ghi đè họ tên mới và thông tin mới vào bộ nhớ chung
            localStorage.setItem("userName", newName); 
            localStorage.setItem("registeredEmail", newEmail);
            localStorage.setItem("userPhone", newPhone);

            alert("🎉 Đã đồng bộ họ tên và thông tin mới thành công!");
            
            // Ép trang tải lại tại chỗ để thanh Navbar lập tức nhận diện tên mới!
            window.location.reload(); 
        });

        // C. Nếu là tài khoản Google/Facebook, ẩn ngay khu vực đổi mật khẩu
        if (loginType === 'google' || loginType === 'facebook') {
            const passwordSection = passwordForm?.closest(".card");
            if (passwordSection) {
                passwordSection.style.display = "none"; // Ẩn vùng mật khẩu
            }
        }
    }
}

// Bắt sự kiện Click nút Đăng Nhập: Lưu lại URL trang hiện tại vào bộ nhớ tạm trước khi chuyển hướng
loginBtn?.addEventListener('click', () => {
    sessionStorage.setItem('redirectAfterLogin', window.location.href);
});

// Mở / đóng dropdown khi bấm avatar
userMenuToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu.classList.toggle('is-open');
});

// Bấm ra ngoài thì tự đóng dropdown
document.addEventListener('click', (e) => {
    if (userMenu && !userMenu.contains(e.target)) {
        userMenu.classList.remove('is-open');
    }
});

// Đăng xuất: Xoá SẠCH TOÀN BỘ bộ nhớ máy để không bị lây dính dữ liệu sang tài khoản sau
logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    userMenu?.classList.remove('is-open');

    // Nếu đang ở trang admin thì về trang đăng nhập, còn lại reload trang chủ
    const isAdminPage = window.location.pathname.toLowerCase().includes("admin_");
    if (isAdminPage) {
        window.location.href = "./dangnhap.php";
    } else {
        window.location.reload();
    }
});

renderAuthState();

// =============================================================================
// PHÂN QUYỀN ADMIN — Bảo vệ trang Admin_*.html
// =============================================================================
(function checkAdminAccess() {
    const currentPage = window.location.pathname.toLowerCase();
    const isAdminPage = currentPage.includes("admin_");
    if (!isAdminPage) return; // Không phải trang admin thì bỏ qua

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole   = localStorage.getItem("userRole");

    if (!isLoggedIn || userRole !== "admin") {
        alert("⛔ Bạn không có quyền truy cập trang này!");
        window.location.href = "./Trangchu.php";
    }
})();

// =============================================================================
// 1B. XỬ LÝ ĐĂNG NHẬP GOOGLE & FACEBOOK THẬT (TỰ ĐỘNG DỌN RÁC BỘ NHỚ)
// =============================================================================
const isLoginPage = window.location.pathname.toLowerCase().includes("dangnhap.php") || 
                    document.querySelector(".login__social-btn--google") !== null;

if (isLoginPage) {
    // CHÚ Ý: Bạn bắt buộc phải đăng ký một Client ID thật từ Google Cloud Console dán vào đây
    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"; 

    function initGoogleAuth() {
        if (typeof google !== "undefined") {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleResponse
            });
        }
    }
    initGoogleAuth();
    window.addEventListener("load", initGoogleAuth);

    function handleGoogleResponse(response) {
        const data = parseJwt(response.credential);
        if (data) {
            // Dọn dẹp dữ liệu của tài khoản kẹt lại trước đó
            localStorage.clear(); 

            // Nạp thông tin tài khoản Google thật mới toanh vào máy
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loginType", "google"); // Đánh dấu loại tài khoản
            localStorage.setItem("userName", data.name);       
            localStorage.setItem("userAvatar", data.picture);  
            localStorage.setItem("registeredEmail", data.email || "");

            alert(`🎉 Chúc mừng ${data.name} đã đăng nhập Google thành công!`);
            const redirectUrl = sessionStorage.getItem("redirectAfterLogin") || "Trangchu.html";
            window.location.href = redirectUrl;
        }
    }

    function parseJwt(token) {
        try {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')));
        } catch (e) { return null; }
    }

    document.querySelector(".login__social-btn--google")?.addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof google !== "undefined") google.accounts.id.prompt();
    });

    // --- XỬ LÝ ĐĂNG NHẬP FACEBOOK THẬT ---
    document.querySelector(".login__social-btn--facebook")?.addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof FB !== "undefined") {
            FB.login(function(response) {
                if (response.authResponse) {
                    FB.api('/me', { fields: 'name,email,picture.type(large)' }, function(userInfo) {
                        // Dọn dẹp dữ liệu kẹt lại của tài khoản trước đó
                        localStorage.clear(); 

                        // Nạp thông tin tài khoản Facebook thật mới toanh vào máy
                        localStorage.setItem("isLoggedIn", "true");
                        localStorage.setItem("loginType", "facebook"); 
                        localStorage.setItem("userName", userInfo.name);                  
                        localStorage.setItem("userAvatar", userInfo.picture.data.url);    
                        localStorage.setItem("registeredEmail", userInfo.email || "");

                        alert(`🎉 Chúc mừng ${userInfo.name} đã đăng nhập Facebook thành công!`);
                        const redirectUrl = sessionStorage.getItem("redirectAfterLogin") || "Trangchu.html";
                        window.location.href = redirectUrl;
                    });
                }
            }, { scope: 'public_profile,email' });
        }
    });
}

// =============================================================================
// 2. BIẾN DÙNG CHUNG CHO BOX GỢI Ý TÌM KIẾM
// =============================================================================
let suggestBox = null;

function hideSuggestBox() {
    if (suggestBox) suggestBox.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    // Biến lưu trữ danh sách các bài viết sau khi quét thành công
    let cachedArticles = [];
    let isScanningStarted = false;

    // =========================================================================
    // 3. CƠ CHẾ QUÉT TỰ ĐỘNG TỪ bai1.html ĐẾN bai5.html
    // =========================================================================
    async function scanRealArticlesAsync() {
        if (isScanningStarted) return; // Nếu đang quét hoặc đã quét xong thì không chạy lại
        isScanningStarted = true; //

        // Cấu hình quét từ bài 1 đến bài 5
        const startCheck = 1; //
        const maxCheck = 5; //

        // Tự động tính toán đường dẫn tùy thuộc bạn đang ở Trang chủ hay bài viết con
        let prefix = "TinhTrangSucKhoe/BenhLy/"; //
        if (window.location.pathname.includes("/TinhTrangSucKhoe/")) { //
            prefix = ""; // Nếu đang ở trong thư mục con, không cần thêm tiền tố đường dẫn
        }

        // Chạy vòng lặp kiểm tra độc lập từng file ngầm
        for (let i = startCheck; i <= maxCheck; i++) { //
            const fileUrl = `${prefix}bai${i}.html`; //

            try { //
                // Sử dụng fetch để đọc nội dung file
                const response = await fetch(fileUrl).catch(() => null); //

                if (response && response.ok) { //
                    const htmlText = await response.text(); //
                    const parser = new DOMParser(); //
                    const doc = parser.parseFromString(htmlText, "text/html"); //

                    // Lấy tiêu đề thực tế nằm trong thẻ <title> của file đó
                    let originalTitle = doc.querySelector("title")?.textContent || `Bài viết số ${i}`; //
                    // Dọn dẹp bỏ bớt phần thương hiệu phía sau dấu gạch ngang (nếu có)
                    originalTitle = originalTitle.split("-")[0].trim(); //

                    cachedArticles.push({ //
                        title: originalTitle, //
                        url: fileUrl //
                    }); //
                }
            } catch (e) { //
                // Nếu gặp lỗi CORS (file:///) hoặc không tìm thấy file, JS vẫn bỏ qua an toàn để chạy tiếp
                console.warn(`Bỏ qua lỗi bảo mật hoặc không tìm thấy file: ${fileUrl}`); //
            }
        }
    }

    // =========================================================================
    // 4. XỬ LÝ BẢNG GỢI Ý TỰ ĐỘNG CHO THANH TÌM KIẾM
    // =========================================================================
    const searchWrapper = searchBox; // div#searchBox bọc cả input + nút bấm

    if (searchInputEl && searchWrapper) { //
        searchWrapper.style.position = "relative"; //

        // Tạo bảng gợi ý kết quả ẩn sẵn dưới thanh tìm kiếm
        suggestBox = document.createElement("div"); //
        suggestBox.className = "search-suggest-box"; //
        suggestBox.style.cssText = `
            position: absolute; 
            top: 100%; 
            left: 0; 
            width: 320px; 
            background: white; 
            border: 1px solid #ddd; 
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
            max-height: 250px;
            overflow-y: auto; 
            z-index: 9999; 
            display: none; 
            margin-top: 5px;
            text-align: left;
            box-sizing: border-box; 
            padding: 8px 0;
        `; //
        searchWrapper.appendChild(suggestBox); //

        // Hàm lọc danh sách bài viết dựa trên từ khóa người dùng gõ
        const renderSuggestions = (query) => { //
            const filtered = cachedArticles.filter(article => //
                article.title.toLowerCase().includes(query) //
            ); //

            if (filtered.length === 0) { //
                suggestBox.innerHTML = `<div style="padding: 12px; color: #888; font-size: 0.9rem;">Không tìm thấy kết quả phù hợp...</div>`; //
            } else { //
                suggestBox.innerHTML = ""; //

                filtered.forEach(article => { //
                    const row = document.createElement("div"); //
                    row.style.cssText = `
                        padding: 10px 15px; cursor: pointer; font-size: 0.9rem;
                        border-bottom: 1px solid #f5f5f5; color: #333; transition: background 0.2s;
                    `; //

                    // Highlight làm nổi bật từ khóa bằng màu vàng nhạt (<mark>)
                    const regex = new RegExp(`(${query})`, "gi"); //
                    row.innerHTML = article.title.replace(regex, "<mark style='background:#fef08a; color:#1e293b; padding:0 2px; border-radius:2px;'>$1</mark>"); //

                    row.addEventListener("mouseenter", () => row.style.background = "#f3f4f6"); //
                    row.addEventListener("mouseleave", () => row.style.background = "#ffffff"); //

                    // Nhấp chuột vào dòng kết quả nào thì chuyển hướng thẳng tới bài đó
                    row.addEventListener("click", () => { //
                        window.location.href = article.url; //
                    }); //

                    suggestBox.appendChild(row); //
                }); //
            } //
            suggestBox.style.display = "block"; //
        }; //

        // KÍCH HOẠT QUÉT NGẦM: Ngay khi người dùng nhấp chuột (focus) vào ô tìm kiếm
        searchInputEl.addEventListener("focus", () => { //
            scanRealArticlesAsync(); //
        }); //

        // Sự kiện gõ chữ: CHỈ hiện box gợi ý khi có nội dung
        searchInputEl.addEventListener("input", () => { //
            const query = searchInputEl.value.trim().toLowerCase(); //

            if (!query || !searchBox.classList.contains('active')) { //
                hideSuggestBox(); //
                return; //
            } //

            renderSuggestions(query); //
        }); //

        // Click chuột ra ngoài thanh tìm kiếm thì đóng bảng gợi ý lại
        document.addEventListener("click", (e) => { //
            if (!searchWrapper.contains(e.target)) hideSuggestBox(); //
        }); //
    } //

    // =========================================================================
    // 5. XỬ LÝ ĐĂNG KÝ NHẬN TIN TẠI FOOTER
    // =========================================================================
    const newsletterInput = document.querySelector(".footer__newsletter-input"); //
    const newsletterBtn = document.querySelector(".footer__newsletter-btn"); //

    if (newsletterBtn && newsletterInput) { //
        const handleSubscribe = () => { //
            const emailValue = newsletterInput.value.trim(); //
            if (!emailValue) { alert("Vui lòng nhập địa chỉ email."); return; } //
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) { alert("Email không hợp lệ."); return; } //

            alert(`Thành công! Email ${emailValue} đã đăng ký nhận bản tin.`); //
            newsletterInput.value = ""; //
        }; //

        newsletterBtn.addEventListener("click", (e) => { e.preventDefault(); handleSubscribe(); }); //
        newsletterInput.addEventListener("keypress", (e) => { if (e.key === "Enter") { e.preventDefault(); handleSubscribe(); } }); //
    }
});
    // Xử lý thay đăng nhập thành tên người đăng kí sau khi đăng nhập 
    document.addEventListener("DOMContentLoaded", () => {
    // 1. Kiểm tra xem trong bộ nhớ có thông tin user không (đã đăng nhập chưa)
    const userInfo = localStorage.getItem("user_info");
    const token = localStorage.getItem("jwt_token");

    if (userInfo && token) {
        // Chuyển chuỗi JSON thành Object để lấy tên
        const user = JSON.parse(userInfo);

        // 2. Tìm cái nút "Đăng nhập" trên thanh Header
        // Lưu ý: Lệnh này sẽ tìm thẻ <a> nào đang trỏ link tới DangNhap.html
        const loginBtn = document.querySelector('a[href="DangNhap.html"], a[href="Dangnhap.html"]');

        if (loginBtn) {
            // Thay đổi chữ "Đăng nhập" thành Tên của người dùng + icon
            loginBtn.innerHTML = `👤 ${user.fullname}`;

            // Đổi link của nút đó trỏ về trang Profile (Trang cá nhân) thay vì trang Login
            loginBtn.href = "Profile.php";

            // (Tùy chọn) 3. Tạo thêm một nút "Đăng xuất" nhỏ bên cạnh
            const logoutBtn = document.createElement("a");
            logoutBtn.href = "#";
            logoutBtn.innerHTML = "Đăng xuất";
            logoutBtn.style.marginLeft = "15px";
            logoutBtn.style.color = "#ff4d4d"; // Cho màu đỏ cho dễ nhìn

            // Chức năng Đăng xuất: Xóa bộ nhớ và load lại trang
            logoutBtn.onclick = (e) => {
                e.preventDefault();
                localStorage.removeItem("jwt_token");
                localStorage.removeItem("user_info");
                window.location.reload(); // F5 lại trang
            };

            // Chèn nút Đăng xuất vào ngay sau nút Tên user
            loginBtn.parentElement.appendChild(logoutBtn);
        }
    }
});