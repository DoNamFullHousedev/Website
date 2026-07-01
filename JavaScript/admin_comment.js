/* ============================================
   comment.js — Trang Quản lý bình luận
   Phụ thuộc: user.js (đã định nghĩa NAV_ITEMS, $, iconHTML, escapeHTML, renderNav)
   Lưu ý: trong trang này nav "Quản lý bình luận" mới là mục active.
   ============================================ */
// ---------- Override nav active ----------
(function setActiveNav() {
  if (typeof NAV_ITEMS === 'undefined') return;
  NAV_ITEMS.forEach((it) => { it.active = it.label === 'Quản lý bình luận'; });
})();
// ---------- Dữ liệu mẫu ----------
const COMMENTS = [
  {
    id: 'C-1001',
    user: { name: 'John Doe',       id: '49281', initials: 'JD', avatarBg: 'hsl(35, 60%, 78%)' },
    content: '"Lời khuyên y tế này hoàn toàn sai. Đừng nghe theo họ, hãy gặp bác sĩ ngay!"',
    post: 'Heart Health 101',
    sentiment: { score: -88, label: 'Tiêu cực', tone: 'neg' },
    status: 'violation',
  },
  {
    id: 'C-1002',
    user: { name: 'Sarah Jenkins',  id: '86271', initials: 'SJ', avatarBg: 'hsl(145, 45%, 75%)' },
    content: '"Tôi nghĩ bài viết này chưa thực sự đầy đủ, có thể bổ sung thêm nguồn?"',
    post: 'Diabetes Management',
    sentiment: { score: 8,   label: 'Trung lập', tone: 'neu' },
    status: 'pending',
  },
  {
    id: 'C-1003',
    user: { name: 'Mark Apple',     id: '11203', initials: 'MA', avatarBg: 'hsl(138, 35%, 78%)' },
    content: '"Các người rõ ràng được các công ty dược trả tiền để viết thứ này."',
    post: 'COVID Updates',
    sentiment: { score: -72, label: 'Tiêu cực', tone: 'neg' },
    status: 'violation',
  },
  {
    id: 'C-1004',
    user: { name: 'Robert Miller',  id: '55432', initials: 'RM', avatarBg: 'hsl(35, 60%, 75%)' },
    content: '"Hướng dẫn cực kỳ hữu ích, cảm ơn đội ngũ biên tập rất nhiều!"',
    post: 'Winter Wellness',
    sentiment: { score: 95,  label: 'Tích cực', tone: 'pos' },
    status: 'approved',
  },
];
const STATUS_CHIP = {
  violation: 'Vi phạm',
  pending:   'Đang chờ duyệt',
  approved:  'Tự động duyệt',
};
// ---------- Render bảng ----------
function renderCommentTable() {
  const tbody = document.querySelector('#comment-tbody');
  tbody.innerHTML = COMMENTS.map((c) => {
    const widthPct = Math.min(100, Math.abs(c.sentiment.score));
    return `
      <tr data-id="${escapeHTML(c.id)}">
        <td>
          <div class="commenter">
            <div class="commenter-avatar" style="background:${c.user.avatarBg}">${escapeHTML(c.user.initials)}</div>
            <div class="commenter-meta">
              <div class="commenter-name">${escapeHTML(c.user.name)}</div>
              <div class="commenter-id">ID: ${escapeHTML(c.user.id)}</div>
            </div>
          </div>
        </td>
        <td><div class="comment-content">${escapeHTML(c.content)}</div></td>
        <td><a href="#" class="post-link">${escapeHTML(c.post)}</a></td>
        <td>
          <div class="sentiment">
            <div class="sentiment-bar">
              <div class="sentiment-fill ${c.sentiment.tone}" style="width:${widthPct}%"></div>
            </div>
            <div class="sentiment-text ${c.sentiment.tone}">
              ${Math.abs(c.sentiment.score)}% ${escapeHTML(c.sentiment.label)}
            </div>
          </div>
        </td>
        <td><span class="chip ${c.status}">${STATUS_CHIP[c.status]}</span></td>
      </tr>
    `;
  }).join('');
}
// ---------- Pagination (đơn giản) ----------
function renderCommentPagination() {
  const pages = [
    { html: iconHTML('chevron-left'),  page: 'prev' },
    { html: '1', page: 1, active: true },
    { html: '2', page: 2 },
    { html: '3', page: 3 },
    { html: iconHTML('chevron-right'), page: 'next' },
  ];
  document.querySelector('#pagination-pages').innerHTML = pages.map((p) =>
    `<button class="page-btn ${p.active ? 'is-active' : ''}" data-page="${p.page}">${p.html}</button>`
  ).join('');
}
// ---------- AI toggle ----------
function bindAiSwitch() {
  const sw = document.querySelector('#ai-switch');
  const status = document.querySelector('#ai-status');
  sw.addEventListener('change', () => {
    const on = sw.checked;
    status.classList.toggle('is-off', !on);
    status.querySelector('.dot').nextSibling.nodeValue =
      on ? ' Đại lý AI đang chạy' : ' Đại lý AI đã tắt';
  });
}
// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  // renderNav đã được user.js gọi trên DOMContentLoaded; nếu chạy lại an toàn:
  if (typeof renderNav === 'function') renderNav();
  renderCommentTable();
  renderCommentPagination();
  bindAiSwitch();
});