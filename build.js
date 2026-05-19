// ─── TL Nexus Static Site Builder ───
const fs = require('fs');
const path = require('path');
const { WEAPONS, BUILDS, GUIDES, WEATHER_CN, WEATHER_EMOJI, WEATHER_DESC, WEATHER_TYPES, getWeather } = require('./src/data.js');

const DIST = path.join(__dirname, 'dist');
const SRC = path.join(__dirname, 'src');

const CSS = fs.readFileSync(path.join(SRC, 'main.css'), 'utf-8');

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
if (!fs.existsSync(path.join(DIST, 'css'))) fs.mkdirSync(path.join(DIST, 'css'), { recursive: true });
if (!fs.existsSync(path.join(DIST, 'build'))) fs.mkdirSync(path.join(DIST, 'build'), { recursive: true });
if (!fs.existsSync(path.join(DIST, 'js'))) fs.mkdirSync(path.join(DIST, 'js'), { recursive: true });
if (!fs.existsSync(path.join(DIST, 'guide'))) fs.mkdirSync(path.join(DIST, 'guide'), { recursive: true });

fs.writeFileSync(path.join(DIST, 'css', 'main.css'), CSS);

// ─── Weather JS (standalone) ───
const weatherJS = `
(function(){
const W = ${JSON.stringify(WEATHER_TYPES)};
const CN = ${JSON.stringify(WEATHER_CN)};
const EMOJI = ${JSON.stringify(WEATHER_EMOJI)};
const DESC = ${JSON.stringify(WEATHER_DESC)};
const SVRS = [
  {name:'美服 Throne Peak',tz:-7},{name:'美服 Eclipse Ridge',tz:-5},
  {name:'欧服 Castle Dawn',tz:1},{name:'欧服 Stormwind Valley',tz:0},
  {name:'韩服 Dragon Valley',tz:9},{name:'日服 Sakura Realm',tz:9},
  {name:'东南亚 Jade Tiger',tz:7},
];
function calc(i){const d=new Date(),u=d.getTime()+d.getTimezoneOffset()*6e4,l=new Date(u+i*36e5),t=l.getHours()*60+l.getMinutes();return W[Math.floor(t/120)%W.length]}
window.renderWeather=function(){const s=document.getElementById('wSvr'),r=document.getElementById('wResult'),w=calc(SVRS[s.selectedIndex].tz);r.innerHTML='<div style=\"display:flex;align-items:center;gap:12px;padding:16px 0\"><span style=\"font-size:36px\">'+EMOJI[w]+'</span><div><div style=\"font-size:18px;font-weight:700\">'+CN[w]+'</div><div style=\"font-size:13px;color:#9888b0\">'+DESC[w]+'</div></div></div>'};
document.addEventListener('DOMContentLoaded',function(){renderWeather();setInterval(renderWeather,6e4)});
})();`;

fs.writeFileSync(path.join(DIST, 'js', 'weather.js'), weatherJS);

// ─── HTML helper ───
function html(content){
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${content.meta}
<link rel="stylesheet" href="/css/main.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚔️</text></svg>">
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <a href="/" class="nav-logo"><span class="nav-logo-icon">⚔️</span><div><div class="nav-logo-title">TL Nexus</div><div class="nav-logo-sub">王权攻略站</div></div></a>
    <div class="nav-links">
      <a href="/" class="nav-link ${content.page==='home'?'active':''}">首页</a>
      <a href="/builds.html" class="nav-link ${content.page==='builds'?'active':''}">Build</a>
      <a href="/guide/class-guide.html" class="nav-link ${content.page==='guide'?'active':''}">攻略</a>
      <a href="/tierlist.html" class="nav-link ${content.page==='tier'?'active':''}">Tier排名</a>
      <a href="/weather.html" class="nav-link ${content.page==='weather'?'active':''}">天气</a>
    </div>
  </div>
</nav>
<main class="main">${content.body}</main>
<footer class="footer"><div class="footer-inner"><div>TL Nexus &middot; 王权与自由玩家攻略站</div> </div></footer>
</body>
</html>`;
}

const BASE = 'https://berty.gamewayz.com';

function meta(title, desc, url){
  return `<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${BASE}${url}">
<meta property="og:type" content="website">
<link rel="canonical" href="${BASE}${url}">`;
}

// ─── Homepage ───
const wEmojis = Object.entries(WEATHER_EMOJI).map(([k,v]) => `${v} ${WEATHER_CN[k]}`).join(' · ');
const homeBody = `
<div class="hero">
  <h1>王权与自由<br>中文攻略站</h1>
  <p>国际服/亚服中文玩家首选 — Build指南 · Tier排名 · 天气策略</p>
  <div style="margin-top:12px;font-size:13px;color:#9888b0">${wEmojis}</div>
</div>
<div class="section-header">🔥 推荐 Build <span class="dim">— 当前版本强势流派</span></div>
<div class="build-grid">
  ${BUILDS.sort((a,b)=>a.tier.localeCompare(b.tier)).map(b => `
    <a href="/build/${b.slug}.html" class="build-card">
      <div class="build-header">
        <div class="build-weapons">${b.comboName}</div>
        <span class="tag tag-${b.tier.toLowerCase()}">Tier ${b.tier}</span>
      </div>
      <div class="build-meta">${b.role} · 操作难度${b.difficulty}</div>
      <div class="build-tip">${b.summary.slice(0,90)}…</div>
    </a>
  `).join('')}
</div>
<div class="section-header">⚔️ 武器一览</div>
<div class="wep-grid">
  ${WEAPONS.map(w => `
    <div class="wep-card">
      <span class="wep-icon">${w.icon}</span>
      <div class="wep-name">${w.name}</div>
      <div class="wep-desc">${w.desc}</div>
    </div>
  `).join('')}
</div>
<div class="section-header">📖 新手攻略 <span class="dim">— 入坑必读</span></div>
<div class="guide-grid">
  ${GUIDES.map(g => `
    <a href="/guide/${g.slug}.html" class="guide-card">
      <div class="guide-title">${g.title}</div>
      <div class="guide-summary">${g.summary.slice(0,80)}…</div>
    </a>
  `).join('')}
</div>`;

fs.writeFileSync(path.join(DIST, 'index.html'), html({
  page:'home',
  meta: meta('TL Nexus — 王权与自由中文攻略站', '王权与自由中文攻略站 · Build指南、Tier排名、天气策略', '/'),
  body: homeBody
}));

// ─── Build Detail Pages ───
BUILDS.forEach(b => {
  const wIcons = b.weapons.map(id => WEAPONS.find(w => w.id === id)).filter(Boolean).map(w => w.icon);
  const pros = b.pros.map(p => `<li>${p}</li>`).join('');
  const cons = b.cons.map(c => `<li>${c}</li>`).join('');
  const skills = b.skills.map(s => `
    <div class="skill-item">
      <span class="skill-icon">${s.icon}</span>
      <div>
        <div class="skill-name">${s.name}</div>
        <div class="skill-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');

  const wName = b.weapons.map(id => {
    const w = WEAPONS.find(x => x.id === id);
    return w ? `${w.icon} ${w.name}` : id;
  }).join(' + ');

  const body = `
<div class="bd-page">
  <a href="/builds.html" class="back-link">← 返回Build列表</a>
  <div class="bd-header">
    <div>
      <div class="bd-title">${b.comboName}</div>
      <div class="bd-subtitle">${wIcons.join('')} ${wName} · ${b.role} · 操作${b.difficulty}</div>
    </div>
    <div>
      <span class="tag tag-${b.tier.toLowerCase()}" style="font-size:14px;padding:6px 14px">Tier ${b.tier}</span>
    </div>
  </div>
  
  <div class="bd-section">
    <h3 class="bd-section-title">📖 概述</h3>
    <p class="bd-text">${b.summary}</p>
  </div>

  <div class="bd-section">
    <h3 class="bd-section-title">✅ 优点 & ❌ 缺点</h3>
    <div class="pros-cons">
      <div class="pros"><strong>优点</strong><ul>${pros}</ul></div>
      <div class="cons"><strong>缺点</strong><ul>${cons}</ul></div>
    </div>
  </div>

  <div class="bd-section">
    <h3 class="bd-section-title">⚡ 核心技能</h3>
    ${skills}
  </div>

  <div class="bd-section">
    <h3 class="bd-section-title">🔄 连招顺序</h3>
    <div class="rotation-box">${b.rotation}</div>
  </div>

  <div class="bd-section">
    <h3 class="bd-section-title">🛡️ 装备推荐</h3>
    <p class="bd-text">${b.gear}</p>
  </div>

  <div class="bd-section">
    <h3 class="bd-section-title">🌤️ 天气策略</h3>
    <p class="bd-text">${b.weatherAdvice}</p>
  </div>
</div>`;

  fs.writeFileSync(path.join(DIST, 'build', `${b.slug}.html`), html({
    page:'build',
    meta: meta(`${b.comboName} — TL Nexus Build攻略`, `${b.role} · Tier ${b.tier} · ${b.summary.slice(0,100)}`, `/build/${b.slug}.html`),
    body
  }));
});

// ─── Builds Listing ───
const buildsBody = `
<div class="section-header">⚔️ 全部Build <span class="dim">— ${BUILDS.length}个流派</span></div>
<div class="build-grid">
  ${BUILDS.map(b => `
    <a href="/build/${b.slug}.html" class="build-card">
      <div class="build-header">
        <div class="build-weapons">${b.comboName}</div>
        <span class="tag tag-${b.tier.toLowerCase()}">Tier ${b.tier}</span>
      </div>
      <div class="build-meta">${b.role} · 操作${b.difficulty}</div>
      <div class="build-tip">${b.summary.slice(0,90)}…</div>
    </a>
  `).join('')}
</div>`;

fs.writeFileSync(path.join(DIST, 'builds.html'), html({
  page:'builds',
  meta: meta('全部Build — TL Nexus', '王权与自由全流派Build攻略，覆盖所有武器组合', '/builds.html'),
  body: buildsBody
}));

// ─── Tier List ───
const tiers = { S:'版本答案', A:'强势推荐', B:'可用' };
const tierBody = `
<div class="section-header">🏆 Tier排名 <span class="dim">— 当前版本综合表现</span></div>
${Object.entries(tiers).map(([t, label]) => {
  const builds = BUILDS.filter(b => b.tier === t);
  if (!builds.length) return '';
  return `
  <div class="tier-row">
    <div class="tier-label tier-${t.toLowerCase()}">${t} — ${label}</div>
    ${builds.map(b => `
      <a href="/build/${b.slug}.html" class="tier-item">
        <div class="tier-info">
          <div class="tier-weapons">${b.comboName}</div>
          <div class="tier-role">${b.role} · 操作${b.difficulty}</div>
        </div>
      </a>
    `).join('')}
  </div>`;
}).join('')}`;

fs.writeFileSync(path.join(DIST, 'tierlist.html'), html({
  page:'tier',
  meta: meta('Tier排名 — TL Nexus', '王权与自由Build Tier排名，S/A/B分级', '/tierlist.html'),
  body: tierBody
}));

// ─── Weather Page ───
const servers = [
  {name:'美服 Throne Peak',flag:'🇺🇸',tz:-7},
  {name:'美服 Eclipse Ridge',flag:'🇺🇸',tz:-5},
  {name:'欧服 Castle Dawn',flag:'🇪🇺',tz:1},
  {name:'欧服 Stormwind Valley',flag:'🇪🇺',tz:0},
  {name:'韩服 Dragon Valley',flag:'🇰🇷',tz:9},
  {name:'日服 Sakura Realm',flag:'🇯🇵',tz:9},
  {name:'东南亚 Jade Tiger',flag:'🇸🇬',tz:7},
];

const weatherBody = `
<div class="section-header">☁️ 实时天气 <span class="dim">— 每2小时轮换 · 自动推算</span></div>
<div class="weather-card">
  <select id="wSvr" onchange="renderWeather()" class="w-select">
    ${servers.map((s,i) => `<option value="${s.tz}" ${i===0?'selected':''}>${s.flag} ${s.name}</option>`).join('')}
  </select>
  <div id="wResult">
    <div style="display:flex;align-items:center;gap:12px;padding:16px 0">
      <span style="font-size:36px">☀️</span>
      <div>
        <div style="font-size:18px;font-weight:700">晴天</div>
        <div style="font-size:13px;color:#9888b0">视野最佳，远程射程+10%</div>
      </div>
    </div>
  </div>
</div>
<div class="weather-info">
  <h3>🌤️ 天气机制说明</h3>
  <p>游戏内天气每2小时轮换一次，顺序为：晴天→暴雨→浓雾→雷暴→暴雪→循环。</p>
  <p>不同天气影响技能效果和视野，选择正确的天气出战可以事半功倍。</p>
  <p>本站根据服务器时区自动推算当前天气。</p>
</div>
<div class="weather-table">
  <h3>天气效果一览</h3>
  ${Object.entries(WEATHER_CN).map(([k, cn]) => `
    <div class="w-row">
      <span class="w-emoji">${WEATHER_EMOJI[k]}</span>
      <span class="w-name">${cn}</span>
      <span class="w-desc">${WEATHER_DESC[k]}</span>
    </div>
  `).join('')}
</div>`;

fs.writeFileSync(path.join(DIST, 'weather.html'), html({
  page:'weather',
  meta: meta('实时天气 — TL Nexus', '王权与自由实时天气查询，美服/欧服/韩服/日服', '/weather.html'),
  body: weatherBody
}));

// ─── Guide Pages ───
GUIDES.forEach(g => {
  const body = `
<div class="guide-page">
  <a href="/" class="back-link">← 返回首页</a>
  <div class="guide-header">
    <h1 class="guide-h1">${g.title}</h1>
    <p class="guide-desc">${g.summary}</p>
  </div>
  ${g.sections.map(s => `
  <div class="guide-section">
    <h2 class="guide-h2">${s.heading}</h2>
    <p class="guide-p">${s.content}</p>
  </div>
  `).join('')}
</div>`;

  fs.writeFileSync(path.join(DIST, 'guide', `${g.slug}.html`), html({
    page:'guide',
    meta: meta(g.title, g.summary.slice(0,150), `/guide/${g.slug}.html`),
    body
  }));
});

// ─── Sitemap ───
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://berty.gamewayz.com/</loc><priority>1.0</priority></url>
  <url><loc>https://berty.gamewayz.com/builds.html</loc><priority>0.9</priority></url>
  <url><loc>https://berty.gamewayz.com/tierlist.html</loc><priority>0.9</priority></url>
  <url><loc>https://berty.gamewayz.com/weather.html</loc><priority>0.8</priority></url>
  ${GUIDES.map(g => `<url><loc>https://berty.gamewayz.com/guide/${g.slug}.html</loc><priority>0.8</priority></url>`).join('\n  ')}
  ${BUILDS.map(b => `<url><loc>https://berty.gamewayz.com/build/${b.slug}.html</loc><priority>0.7</priority></url>`).join('\n  ')}
</urlset>`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);

// ─── robots.txt ───
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://berty.gamewayz.com/sitemap.xml`);

console.log(`✅ Generated ${BUILDS.length} build pages + ${GUIDES.length} guide pages + index, builds, tierlist, weather, sitemap`);
console.log(`📁 Output: ${DIST}`);
