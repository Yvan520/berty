// ─── Home View — Flagship Editorial Layout ───
(function(){'use strict';
const S = TL.BUILDS, W = TL.WEATHERS;

function render(view){
  const w = TL.getCurrentWeather('美洲 - Throne Peak');
  const hero = `
    <div class="hero">
      <div class="hero-badge">${W[w]||'☀️'} ${TL.WEATHER_CN[w]||'晴天'} · 实时天气已更新</div>
      <h1>王权与自由<br>中文攻略站</h1>
      <p>Build 指南 · Tier 排名 · 天气策略 · 装备推荐<br>国际服中文玩家首选</p>
    </div>`;

  let featured = '';
  const picks = S.filter(b=>b.tier==='S'||b.tier==='A');
  picks.forEach(b => {
    const emoji = W[b.w]||'☀️';
    const borderClass = b.w;
    featured += `<div class="featured-card ${borderClass}" onclick="TL.Router.navigate('/build?id=${b.id}')">
      <div class="fc-icon">${emoji}</div>
      <div class="fc-weapons">${b.wp}</div>
      <div class="fc-role">${b.role} · 难度${b.difficulty}</div>
      <div class="fc-tip" style="font-size:12px;color:var(--text-dim);line-height:1.5;margin-top:4px">${b.tip.slice(0,60)}…</div>
      <div class="fc-bottom">
        <span class="tag tag-${b.tier.toLowerCase()}">Tier ${b.tier}</span>
        <span class="fc-diff">${b.combo.slice(0,20)}…</span>
      </div>
    </div>`;
  });

  let weaponBrowse = '';
  const WEPS = TL.WEAPONS;
  WEPS.forEach(w => {
    weaponBrowse += `<button class="weapon-btn" onclick="TL.Router.navigate('/builds?w=${w.id}')">
      <span class="icon">${w.icon}</span>
      <span class="name">${w.name}</span>
    </button>`;
  });

  const sideClass = w;
  view.innerHTML = `
    ${hero}
    <div class="section-header">🔥 推荐 Build <span class="dim">— 当前版本强势流派</span></div>
    <div class="featured-grid">${featured}</div>
    <div class="section-header">⚔️ 按武器浏览</div>
    <div class="weapon-grid" style="grid-template-columns:repeat(auto-fill,minmax(100px,1fr))">${weaponBrowse}</div>
    <div class="section-header">📖 最新攻略</div>
    <div class="build-grid">
      ${S.map(b => `
        <div class="build-card card-hover" onclick="TL.Router.navigate('/build?id=${b.id}')">
          <div class="bar ${b.w}"></div>
          <div class="build-header">
            <div class="build-weapons">${b.wp}</div>
            <span class="tag tag-${b.tier.toLowerCase()}">Tier ${b.tier}</span>
          </div>
          <div class="build-combo">${b.combo}</div>
          <div class="build-tip">${b.tip}</div>
          <div class="build-meta">${W[b.w]} ${TL.WEATHER_CN[b.w]} · ${b.role} · 操作${b.difficulty}</div>
        </div>
      `).join('')}
    </div>`;
}

TL.registerView && TL.registerView('home',render);
TL.Router && TL.Router.register('home',render);
})();
