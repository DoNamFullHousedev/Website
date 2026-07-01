/* =========================================================
   DASHBOARD — Traffic chart (SVG step/bar area)
   ========================================================= */
(function () {
  const svg = document.getElementById('trafficChart');
  if (!svg) return;

  const W = 800;
  const H = 260;
  const PAD = { top: 20, right: 20, bottom: 30, left: 20 };

  // Dữ liệu mẫu (30 ngày) — kiểu bậc thang tăng dần như mockup
  const weekData  = [40, 45, 50, 60, 65, 70, 75, 80, 85, 95, 100, 110, 115, 120, 130, 135, 140, 150, 160, 165, 170, 180, 185, 190, 195, 200, 205, 210, 215, 220];
  const monthData = [30, 35, 40, 55, 60, 65, 72, 78, 90, 95, 100, 108, 115, 118, 125, 130, 140, 148, 155, 160, 168, 175, 180, 188, 195, 200, 205, 210, 215, 225];

  function render(data) {
    const max = Math.max(...data) * 1.1;
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const stepW = innerW / data.length;

    // Bars dạng bậc thang
    let bars = '';
    data.forEach((v, i) => {
      const x = PAD.left + i * stepW;
      const h = (v / max) * innerH;
      const y = PAD.top + innerH - h;
      bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(stepW - 1).toFixed(1)}" height="${h.toFixed(1)}" fill="url(#barGrad)" rx="1"/>`;
    });

    // Đường line phía trên
    const points = data.map((v, i) => {
      const x = PAD.left + i * stepW + stepW / 2;
      const y = PAD.top + innerH - (v / max) * innerH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    svg.innerHTML = `
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="hsl(142, 35%, 65%)" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="hsl(142, 35%, 65%)" stop-opacity="0.15"/>
        </linearGradient>
      </defs>
      ${bars}
      <polyline points="${points}"
        fill="none" stroke="hsl(145, 50%, 35%)" stroke-width="1.5" opacity="0.5"/>
    `;
  }

  render(weekData);

  // Toggle Hàng tuần / Hàng tháng
  document.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.range === 'month' ? monthData : weekData);
    });
  });
})();
