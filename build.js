const fs = require('fs');
const path = require('path');
const { WEAPONS, SECTIONS, BUILDS, TIERS } = require('./src/data.js');

const DIST = path.join(__dirname, 'dist');

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
if (!fs.existsSync(path.join(DIST, 'guide'))) fs.mkdirSync(path.join(DIST, 'guide'), { recursive: true });

const CSS = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8');
const BASE = 'https://berty.gamewayz.com';

const CTX = {
  lang: 'zh-CN',
  font: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  display: "'Cinzel', serif",
};

function meta(title, desc, url) {
  return `<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${BASE}${url}">
<meta property="og:type" content="website">
<meta name="baidu-site-verification" content="codeva-H9OUhW8VMy" />
<link rel="canonical" href="${BASE}${url}">`;
}

const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '新手入门', href: '/guide/beginner.html' },
  { label: '武器系统', href: '/weapons.html' },
  { label: '职业搭配', href: '/builds.html' },
  { label: '副本攻略', href: '/dungeons.html' },
  { label: 'PVP指南', href: '/pvp.html' },
  { label: '搬砖攻略', href: '/guide/farming.html' },
  { label: '钓鱼攻略', href: '/guide/fishing.html' },
];

function navHTML(currentPath) {
  const isHome = currentPath === '/' || currentPath === '#hero';
  const items = isHome
    ? NAV_ITEMS.map(item => {
        const hrefMap = { '/': '#hero', '/guide/beginner.html': '#beginner', '/weapons.html': '#weapons', '/builds.html': '#tierlist', '/dungeons.html': '#dungeons', '/pvp.html': '#pvp', '/guide/farming.html': '#economy', '/guide/fishing.html': '#morph' };
        return { ...item, href: hrefMap[item.href] || item.href };
      })
    : NAV_ITEMS;

  return `<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between h-16 md:h-20">
      <div class="flex items-center gap-3 cursor-pointer" id="logo-btn">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#8b6914] flex items-center justify-center shadow-[0_0_15px_rgba(201,162,39,0.4)]">
          <span class="text-xl">👑</span>
        </div>
        <div>
          <div class="font-cinzel text-[#c9a227] font-bold text-base leading-tight tracking-wider">王权与自由</div>
          <div class="text-[#8a7a5a] text-[10px] tracking-[0.2em] uppercase leading-tight">Throne & Liberty Guide</div>
        </div>
      </div>
      <div class="hidden lg:flex items-center gap-1">
        ${items.map(item => {
          const active = currentPath === item.href || (isHome && item.href.startsWith('#'));
          return `<a href="${item.href}"
  class="nav-link px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${active ? 'text-[#c9a227] bg-[#c9a227]/10' : 'text-[#a09070] hover:text-[#c9a227] hover:bg-[#c9a227]/5'}">${item.label}</a>`;
        }).join('')}
      </div>
      <div class="hidden lg:flex items-center gap-3">
        <a href="https://store.steampowered.com/app/2429640/THRONE_AND_LIBERTY/" target="_blank" rel="noopener noreferrer"
          class="px-5 py-2 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#8b6914] text-[#0a0a12] text-sm font-bold hover:opacity-90 transition-all duration-200 shadow-[0_0_15px_rgba(201,162,39,0.3)] hover:shadow-[0_0_25px_rgba(201,162,39,0.5)]">Steam 开始游戏</a>
      </div>
      <button id="menu-btn" class="lg:hidden text-[#c9a227] p-2">
        <div class="w-6 h-0.5 bg-current mb-1.5 transition-all"></div>
        <div class="w-6 h-0.5 bg-current mb-1.5 transition-all"></div>
        <div class="w-6 h-0.5 bg-current transition-all"></div>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden lg:hidden bg-[#0a0a12]/98 border-t border-[#c9a227]/20 px-4 py-4">
    ${items.map(item => `<a href="${item.href}" class="block w-full text-left px-4 py-3 text-[#a09070] hover:text-[#c9a227] hover:bg-[#c9a227]/5 rounded-lg transition-all">${item.label}</a>`).join('')}
    <a href="https://store.steampowered.com/app/2429640/THRONE_AND_LIBERTY/" target="_blank" rel="noopener noreferrer"
      class="block mt-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#8b6914] text-[#0a0a12] font-bold text-center">Steam 开始游戏</a>
  </div>
</nav>`;
}

const FOOTER = `<footer class="bg-[#04040a] border-t border-[#1a1520] pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#8b6914] flex items-center justify-center shadow-[0_0_15px_rgba(201,162,39,0.3)]">
            <span class="text-xl">👑</span>
          </div>
          <div>
            <div class="font-cinzel text-[#c9a227] font-bold text-base leading-tight">王权与自由</div>
            <div class="text-[#5a4a2a] text-[10px] tracking-[0.2em] uppercase">攻略指南站</div>
          </div>
        </div>
        <p class="text-[#5a4a2a] text-sm leading-relaxed mb-4">最全面的 Throne and Liberty 攻略站，为每一位踏入索利西姆世界的勇者提供专业指南。</p>
        <div class="flex items-center gap-1 text-xs text-[#4a3a1a]">
          <span class="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse"></span>
          <span>国际服正式版 · 实时更新</span>
        </div>
      </div>
      <div>
        <h4 class="text-[#c9a227] font-semibold text-sm mb-4 tracking-wider uppercase">游戏指南</h4>
        <ul class="space-y-2">
          <li><a href="/" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">首页</a></li>
          <li><a href="/weapons.html" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">武器系统</a></li>
          <li><a href="/builds.html" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">职业搭配</a></li>
          <li><a href="/dungeons.html" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">副本攻略</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-[#c9a227] font-semibold text-sm mb-4 tracking-wider uppercase">深度内容</h4>
        <ul class="space-y-2">
          <li><a href="/pvp.html" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">PVP指南</a></li>
          <li><a href="/guide/features.html" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">核心系统</a></li>
          <li><a href="/guide/farming.html" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">搬砖攻略</a></li>
          <li><a href="/guide/fishing.html" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">钓鱼攻略</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-[#c9a227] font-semibold text-sm mb-4 tracking-wider uppercase">官方资源</h4>
        <ul class="space-y-2">
          <li><a href="https://store.steampowered.com/app/2429640/THRONE_AND_LIBERTY/" target="_blank" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">Steam 页面</a></li>
          <li><a href="https://playthroneandliberty.com/" target="_blank" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">官方网站</a></li>
          <li><a href="https://www.reddit.com/r/throneandliberty/" target="_blank" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">Reddit 社区</a></li>
          <li><a href="https://forum.gamer.com.tw/B.php?bsn=33317" target="_blank" class="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200">巴哈姆特论坛</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-[#1a1520] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-[#3a2a1a] text-xs text-center sm:text-left">© 2024-2026 王权与自由攻略站 · Throne and Liberty Fan Guide Site · 非官方第三方内容</p>
      <div class="flex items-center gap-4 text-xs text-[#3a2a1a]">
        <span>所有游戏内容版权归 NCsoft & Amazon Games 所有</span>
      </div>
    </div>
  </div>
</footer>`;

const INLINE_JS = `<script>
(function(){
  var nav = document.getElementById('navbar');
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var logoBtn = document.getElementById('logo-btn');

  function onScroll(){
    if(window.scrollY > 60){
      nav.className = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#0a0a12]/95 backdrop-blur-xl border-b border-[#c9a227]/20 shadow-[0_4px_30px_rgba(201,162,39,0.1)]';
    } else {
      nav.className = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent';
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', function(){
      var open = mobileMenu.classList.toggle('hidden');
      menuBtn.querySelectorAll('div').forEach(function(d,i){
        if(!open){
          if(i===0) d.style.transform='rotate(45deg) translate(2px, 8px)';
          if(i===1) d.style.opacity='0';
          if(i===2) d.style.transform='rotate(-45deg) translate(2px, -8px)';
        } else {
          d.style.transform='';
          d.style.opacity='';
        }
      });
    });
  }
  if(logoBtn){
    logoBtn.addEventListener('click', function(){
      var target = document.getElementById('hero');
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      else window.location.href='/';
    });
  }

  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var id = this.getAttribute('href').replace('#','');
      var el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
})();
<\/script>`;

function page(content, currentPath) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
${content.meta}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>${CSS}</style>
<style>
.font-cinzel{font-family:'Cinzel',serif}
*{scroll-behavior:smooth}
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:#04040a}
::-webkit-scrollbar-thumb{background:#3a2a10;border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:#c9a227}
::selection{background:rgba(201,162,39,.3);color:#fff}
@keyframes float{0%,100%{opacity:0;transform:translateY(0)}25%{opacity:.4}50%{opacity:.6;transform:translateY(-30px)}75%{opacity:.2}}
@keyframes golden-pulse{0%,100%{box-shadow:0 0 15px rgba(201,162,39,.3)}50%{box-shadow:0 0 30px rgba(201,162,39,.6)}}
.golden-glow{animation:golden-pulse 3s ease-in-out infinite}
</style>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚔️</text></svg>">
</head>
<body class="min-h-screen bg-[#0a0a12] text-white" style="font-family:${CTX.font}">
${navHTML(currentPath)}
<main>${content.body}</main>
${FOOTER}
${INLINE_JS}
</body>
</html>`;
}

function tierColor(tier) {
  const m = { S: 'text-[#ff4757] bg-[#ff4757]/15 border-[#ff4757]/40', A: 'text-[#ffa502] bg-[#ffa502]/15 border-[#ffa502]/40', B: 'text-[#2ed573] bg-[#2ed573]/15 border-[#2ed573]/40', C: 'text-[#70a1ff] bg-[#70a1ff]/15 border-[#70a1ff]/40' };
  return m[tier] || m.B;
}

function sectionTopDecorator() {
  return `<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent"></div>`;
}

function sectionBadge(text, accent) {
  const ac = accent || '#c9a227';
  return `<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[${ac}]/30 bg-[${ac}]/5 text-[${ac}] text-sm mb-4">${text}</div>`;
}

function bannerHTML(img, badge, title, fromBg) {
  const fb = fromBg || '#06060e';
  return `<div class="relative h-48 sm:h-64 mb-16 overflow-hidden">
    <img src="${img}" alt="${title}" class="w-full h-full object-cover object-center" />
    <div class="absolute inset-0 bg-gradient-to-b from-[${fb}]/50 via-transparent to-[${fb}]"></div>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/40 bg-[${fb}]/60 text-[#c9a227] text-sm mb-3 backdrop-blur-sm">${badge}</div>
        <h2 class="font-cinzel text-3xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">${title}</h2>
      </div>
    </div>
  </div>`;
}

// ─── Hero ───
const HERO_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 3 + 1, delay: Math.random() * 5,
  duration: Math.random() * 10 + 8,
}));

function heroSection() {
  return `<section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image:url('/images/hero-bg.jpg')"></div>
  <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/70 via-[#0a0a12]/40 to-[#0a0a12]"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a12]/60 via-transparent to-[#0a0a12]/60"></div>
  ${HERO_PARTICLES.map(p => `<div class="absolute rounded-full bg-[#c9a227] opacity-0" style="left:${p.x}%;top:${p.y}%;width:${p.size}px;height:${p.size}px;animation:float ${p.duration}s ${p.delay}s infinite ease-in-out"></div>`).join('')}
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10 text-[#c9a227] text-sm mb-8">
      <span class="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse"></span>
      最新更新 · 国际服版本攻略
    </div>
    <h1 class="font-cinzel font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4">
      <span class="text-white">王权</span>
      <span class="text-[#c9a227]"> & </span>
      <span class="text-white">自由</span>
    </h1>
    <p class="font-cinzel text-[#c9a227]/80 text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase mb-6">Throne and Liberty · 全攻略指南站</p>
    <p class="text-[#a09070] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">为每一位踏入索利西姆世界的勇者而生。从新手入门到终局攻略，从武器搭配到PVP战略，这里是你最全面的王权与自由知识库。</p>
    <div class="flex flex-wrap items-center justify-center gap-4 mb-16">
      <a href="/guide/beginner.html"
        class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#8b6914] text-[#0a0a12] font-bold text-base hover:opacity-90 transition-all duration-200 shadow-[0_0_30px_rgba(201,162,39,0.4)] hover:shadow-[0_0_50px_rgba(201,162,39,0.6)] hover:scale-105">🗡️ 新手开始入门</a>
      <a href="/weapons.html"
        class="px-8 py-3.5 rounded-xl border border-[#c9a227]/50 text-[#c9a227] font-bold text-base hover:bg-[#c9a227]/10 transition-all duration-200 hover:scale-105 backdrop-blur-sm">⚔️ 武器搭配指南</a>
    </div>
  </div>
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#5a4a2a] animate-bounce">
    <span class="text-xs tracking-widest uppercase">向下探索</span>
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
      <path d="M8 2L8 20M8 20L2 14M8 20L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  </div>
</section>`;
}

// ─── Beginner ───
function beginnerSection() {
  const items = SECTIONS.beginner.items;
  return `<section id="beginner" class="py-24 bg-[#0a0a12] relative overflow-hidden">
  ${sectionTopDecorator()}
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.05)_0%,transparent_70%)]"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16">
      ${sectionBadge('📜 新手指引')}
      <h2 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">踏入索利西姆的第一步</h2>
      <p class="text-[#7a6a4a] text-base max-w-xl mx-auto">无论你是从未玩过MMO的新手，还是经验丰富的老玩家，这份入门指南将帮助你快速融入王权与自由的世界。</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${items.map((guide, i) => `
      <div class="group relative bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-6 hover:border-[#c9a227]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.1)] hover:-translate-y-1">
        <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 flex items-center justify-center">
          <span class="text-[#c9a227] text-sm font-bold">${String(guide.step).padStart(2, '0')}</span>
        </div>
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c9a227]/20 to-[#8b6914]/10 border border-[#c9a227]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <span class="text-2xl">${guide.icon}</span>
        </div>
        <h3 class="text-white font-bold text-lg mb-2">${guide.title}</h3>
        <p class="text-[#7a6a4a] text-sm leading-relaxed">${guide.desc}</p>
        ${i < items.length - 1 ? `<div class="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#c9a227]/30 to-transparent z-10"></div>` : ''}
      </div>`).join('')}
    </div>
    <div class="mt-12 bg-gradient-to-r from-[#1a150a] via-[#1f1a0a] to-[#1a150a] border border-[#c9a227]/20 rounded-2xl p-6 sm:p-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#c9a227]/15 border border-[#c9a227]/30 flex items-center justify-center">
          <span class="text-2xl">💡</span>
        </div>
        <div class="flex-1">
          <h3 class="text-[#c9a227] font-bold text-lg mb-1">老玩家速成提示</h3>
          <p class="text-[#8a7555] text-sm leading-relaxed">已有MMO经验？直接选择大剑+匕首组合，跟着主线快速升级，10级后开启委托系统。50级后每天仅需1-2小时完成日常。变形系统和天气联动是本游戏最独特的机制，务必提前了解。</p>
        </div>
        <a href="/guide/beginner.html" class="flex-shrink-0 px-5 py-2.5 rounded-xl border border-[#c9a227]/40 text-[#c9a227] text-sm font-medium hover:bg-[#c9a227]/10 transition-all duration-200">查看变形系统 →</a>
      </div>
    </div>
  </div>
</section>`;
}

// ─── Weapons ───
function weaponsSection() {
  return `<section id="weapons" class="py-24 bg-[#06060e] relative overflow-hidden">
  ${sectionTopDecorator()}
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(201,162,39,0.04)_0%,transparent_60%)]"></div>
  ${bannerHTML('/images/weapons-banner.jpg', '⚔️ 武器系统', '九大武器 · 无限组合')}
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      ${WEAPONS.map(w => `<a href="/weapons.html#${w.id}"
        class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-5 text-center hover:border-[${w.color}]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.1)] hover:-translate-y-1">
        <div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">${w.icon}</div>
        <div class="text-white font-bold text-sm mb-1">${w.name}</div>
        <div class="text-[#7a6a4a] text-xs">${w.nameEn}</div>
        <div class="flex items-center justify-center gap-2 mt-3">
          <span class="text-xs px-2 py-0.5 rounded border font-bold ${tierColor(w.tierPvE)}">PVE ${w.tierPvE}</span>
          <span class="text-xs px-2 py-0.5 rounded border font-bold ${tierColor(w.tierPvP)}">PVP ${w.tierPvP}</span>
        </div>
      </a>`).join('')}
    </div>
    <div class="text-center mt-8">
      <a href="/weapons.html" class="inline-flex items-center gap-2 text-[#c9a227] hover:text-white transition font-medium">查看所有武器详情 →</a>
    </div>
  </div>
</section>`;
}

// ─── Tier List ───
function tierListSection() {
  const metaCards = [
    { title: '🏆 当前版本最强', content: '大剑+匕首 在小规模PVP中几乎无敌，爆发高且控制强。新赛季首选。', accent: '#ff4757' },
    { title: '🌟 最适合新手', content: '长弓作为主武器搭配十字弓，操作简单，伤害稳定，新手轻松上手。', accent: '#ffa502' },
    { title: '💎 最高天花板', content: '法杖+匕首需要较深的游戏理解，但上限极高，顶尖玩家的首选。', accent: '#9b59b6' },
  ];
  return `<section id="tierlist" class="py-24 bg-[#0a0a12] relative overflow-hidden">
  ${sectionTopDecorator()}
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(201,162,39,0.04)_0%,transparent_60%)]"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16">
      ${sectionBadge('🏆 职业强度评级')}
      <h2 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">武器组合 · Tier List</h2>
      <p class="text-[#7a6a4a] text-base max-w-xl mx-auto">基于国际服实际数据分析，综合PVE效能与PVP胜率，为你提供当前版本最权威的武器搭配强度排名。</p>
    </div>
    <div class="space-y-4 max-w-4xl mx-auto">
      ${TIERS.map(t => {
        const bList = t.builds.map(slug => BUILDS.find(b => b.slug === slug)).filter(Boolean);
        return `<div class="flex gap-4 rounded-2xl overflow-hidden border" style="border-color:${t.color}30;background-color:${t.bg}">
          <div class="flex-shrink-0 w-16 sm:w-20 flex items-center justify-center font-cinzel font-black text-3xl sm:text-5xl" style="color:${t.color}">${t.tier}</div>
          <div class="flex-1 p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${bList.map(b => `<div class="bg-[#0a0a12]/60 rounded-xl p-3 border hover:border-current transition-all duration-200" style="border-color:${t.color}20">
              <div class="flex items-start justify-between gap-2 mb-1">
                <span class="text-white font-semibold text-sm leading-tight">${b.name}</span>
                <span class="flex-shrink-0 text-xs px-1.5 py-0.5 rounded font-medium" style="color:${t.color};background-color:${t.color}15">${b.role}</span>
              </div>
              <p class="text-[#7a6a4a] text-xs leading-relaxed">${b.desc}</p>
            </div>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
    <div class="mt-8 text-center">
      <p class="text-[#5a4a2a] text-xs">* Tier List 基于国际服正式版数据，游戏版本更新后排名可能有所变动。</p>
    </div>
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
      ${metaCards.map(c => `<div class="bg-[#0a0a15] rounded-xl p-5 border hover:-translate-y-1 transition-all duration-300" style="border-color:${c.accent}30">
        <h4 class="font-semibold mb-2" style="color:${c.accent}">${c.title}</h4>
        <p class="text-[#7a6a4a] text-sm leading-relaxed">${c.content}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

// ─── Dungeons ───
function dungeonsSection() {
  return `<section id="dungeons" class="py-24 bg-[#06060e] relative overflow-hidden">
  ${sectionTopDecorator()}
  ${bannerHTML('/images/dungeon-banner.jpg', '🗺️ 副本攻略', '副本全攻略')}
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 gap-4">
      ${SECTIONS.dungeons.items.map(d => `
      <div class="bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-5 hover:border-[${d.color}]/40 transition-all duration-300">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style="background-color:${d.color}20;border:1px solid ${d.color}40">${d.icon}</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 class="text-white font-semibold text-base">${d.name}</h3>
                <div class="flex items-center gap-2 mt-1 text-xs text-[#5a4a2a]">
                  <span>${d.type}</span><span>·</span><span>${d.players}</span><span>·</span><span>${d.level}</span>
                </div>
              </div>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" style="color:${d.color};background-color:${d.color}15">${d.difficulty}</span>
            </div>
            <p class="text-[#7a6a4a] text-sm mt-2 leading-relaxed">💡 ${d.tip}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              ${d.rewards.map(r => `<span class="text-xs px-2.5 py-1 rounded-lg font-medium" style="color:${d.color};background-color:${d.color}15;border:1px solid ${d.color}30">${r}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>`).join('')}
    </div>
    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-[#0a0f0a] rounded-xl p-5 border border-[#2ed573]/20">
        <h4 class="text-[#2ed573] font-semibold mb-2">🗡️ 副本通用技巧</h4>
        <ul class="space-y-1.5 text-[#7a8a6a] text-sm">
          <li>▶ 进入副本前检查药水和补给是否充足</li>
          <li>▶ 坦克提前学习Boss技能，避免全团减员</li>
          <li>▶ 固定队伍比随机队效率高出50%+</li>
        </ul>
      </div>
      <div class="bg-[#0f0a0a] rounded-xl p-5 border border-[#c9a227]/20">
        <h4 class="text-[#c9a227] font-semibold mb-2">⏰ 刷新时间安排</h4>
        <ul class="space-y-1.5 text-[#8a7a4a] text-sm">
          <li>▶ 世界Boss刷新时间在服务器公告中查询</li>
          <li>▶ 日常副本每天重置，周本每周一重置</li>
          <li>▶ 大君主Archboss是全服竞争性内容，提前集合</li>
        </ul>
      </div>
    </div>
  </div>
</section>`;
}

// ─── PVP ───
function pvpSection() {
  const weatherEffects = [
    { weather: '☔ 雨天', effect: '闪电系技能伤害与范围大幅提升', cls: '法杖使用者', color: '#70a1ff' },
    { weather: '💨 大风', effect: '火焰技能传播范围与持续时间增加', cls: '法杖 / 十字弓', color: '#ff6b35' },
    { weather: '❄️ 雪天', effect: '冰霜效果增强，移动速度Debuff延长', cls: '长弓使用者', color: '#a0d8ef' },
    { weather: '☀️ 晴天', effect: '普通状态，无特殊天气加成', cls: '全职业均衡', color: '#c9a227' },
  ];
  return `<section id="pvp" class="py-24 bg-[#0a0a12] relative overflow-hidden">
  ${sectionTopDecorator()}
  ${bannerHTML('/images/pvp-banner.jpg', '⚔️ PVP指南', '战场制胜 · PVP全指南', '#0a0a12')}
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      ${SECTIONS.pvp.items.map(p => `
      <div class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#1a1530] p-6 hover:border-[#c9a227]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.08)] hover:-translate-y-1">
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">${p.icon}</div>
          <span class="text-xs px-2 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20 text-[#c9a227]">${p.type}</span>
        </div>
        <h3 class="text-white font-bold text-lg mb-1">${p.title}</h3>
        ${p.subtitle ? `<p class="text-[#c9a227]/60 text-xs mb-3">${p.subtitle}</p>` : ''}
        <p class="text-[#7a6a4a] text-sm leading-relaxed mb-4">${p.desc}</p>
        <div class="space-y-2">
          ${p.tips.map(tip => `<div class="flex items-start gap-2"><span class="text-[#c9a227] text-xs mt-1 flex-shrink-0">◆</span><span class="text-[#8a7a5a] text-sm">${tip}</span></div>`).join('')}
        </div>
      </div>`).join('')}
    </div>
    <div class="bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#2a2540] p-6 sm:p-8 mb-10">
      <div class="text-center mb-8">
        ${sectionBadge('🌤️ 天气系统', '#70a1ff')}
        <h3 class="font-cinzel text-2xl font-bold text-white mb-2">天气联动 · 战略核心</h3>
        <p class="text-[#7a6a4a] text-sm max-w-lg mx-auto">王权与自由的动态天气系统直接影响战斗策略。聪明的玩家会在不同天气下切换技能组合，以获得决定性优势。</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${weatherEffects.map(we => `<div class="rounded-xl p-4 border transition-all duration-300 hover:scale-105" style="border-color:${we.color}30;background-color:${we.color}08">
          <div class="text-2xl mb-2">${we.weather.split(' ')[0]}</div>
          <div class="font-semibold text-sm mb-2" style="color:${we.color}">${we.weather.split(' ').slice(1).join(' ')}</div>
          <p class="text-[#7a6a4a] text-xs mb-2 leading-relaxed">${we.effect}</p>
          <div class="text-xs px-2 py-1 rounded-full inline-block" style="color:${we.color};background-color:${we.color}15">推荐: ${we.cls}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-[#0a0a15] rounded-xl p-6 border border-[#ff4757]/20">
        <h4 class="text-[#ff6b75] font-bold text-lg mb-4">⚔️ 进攻方策略</h4>
        <ul class="space-y-2 text-[#8a7a7a] text-sm">
          ${['优先击杀对方治疗职业','利用地形进行包夹与穿插','暴风雨天气优先选择法系爆发','攻城战利用变形形态翻越城墙','小队配合：控制→爆发→收割'].map(t => `<li class="flex items-start gap-2"><span class="text-[#ff4757] text-xs mt-1">▶</span> ${t}</li>`).join('')}
        </ul>
      </div>
      <div class="bg-[#0a0a15] rounded-xl p-6 border border-[#2ed573]/20">
        <h4 class="text-[#2ed573] font-bold text-lg mb-4">🛡️ 防守方策略</h4>
        <ul class="space-y-2 text-[#7a8a7a] text-sm">
          ${['占据高地地形，限制敌方进攻路线','保护治疗的生存是首要任务','城池核心启动防御设施','坦克在关键节点集中防守','善用地图障碍物遮挡法系远程'].map(t => `<li class="flex items-start gap-2"><span class="text-[#2ed573] text-xs mt-1">▶</span> ${t}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>`;
}

// ─── Morph ───
function morphSection() {
  return `<section id="morph" class="py-24 bg-[#06060e] relative overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9b59b6]/30 to-transparent"></div>
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(155,89,182,0.06)_0%,transparent_70%)]"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16">
      ${sectionBadge('🦅 变形系统', '#9b59b6')}
      <h2 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">变形形态 · 突破维度</h2>
      <p class="text-[#7a6a4a] text-base max-w-2xl mx-auto">王权与自由最独特的玩法之一 —— 变形系统让玩家可以暂时变身为动物形态。与天气系统深度联动，飞行、冲刺、游泳、攻城，突破传统MMO的移动边界。</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
      ${SECTIONS.morph.items.filter(m => ['疾驰(狼)','滑翔(鸟)','游泳(鱼)','攻城高仑'].includes(m.name)).map(m => `
      <div class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#2a2540] p-6 text-center hover:border-[#9b59b6]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,89,182,0.1)] hover:-translate-y-1">
        <div class="w-20 h-20 rounded-full bg-[#9b59b6]/10 border-2 border-[#9b59b6]/20 flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 group-hover:border-[#9b59b6]/50 transition-all duration-300">${m.icon}</div>
        <h3 class="text-white font-bold text-base mb-1">${m.name}</h3>
        <span class="inline-block text-xs px-2.5 py-0.5 rounded-full bg-[#9b59b6]/15 border border-[#9b59b6]/30 text-[#b07fd4] mb-3">${m.type}</span>
        <p class="text-[#7a6a4a] text-sm leading-relaxed">${m.effect}</p>
      </div>`).join('')}
    </div>
    <div class="bg-gradient-to-br from-[#0f0b1f] to-[#080812] rounded-2xl border border-[#9b59b6]/25 p-6 sm:p-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 class="font-cinzel text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-[#9b59b6]/20 flex items-center justify-center text-lg">🔓</span>
            如何解锁变形形态
          </h3>
          <div class="space-y-3">
            ${['完成特定主线任务后，技能树中解锁变形技能','雨天环境触发飞鸟变形，可在空中自由滑翔','水边或水中区域触发鱼类变形，快速探索水下地图','攻城战特殊状态下解锁攻城高仑变形'].map((t, i) => `
            <div class="flex items-start gap-3">
              <span class="font-cinzel text-[#9b59b6] font-bold text-sm flex-shrink-0 w-6">${String(i+1).padStart(2,'0')}</span>
              <span class="text-[#8a7a9a] text-sm leading-relaxed">${t}</span>
            </div>`).join('')}
          </div>
        </div>
        <div>
          <h3 class="font-cinzel text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-[#9b59b6]/20 flex items-center justify-center text-lg">⚡</span>
            变形系统战术应用
          </h3>
          <div class="space-y-3">
            ${[{icon:'🦅',text:'利用飞鸟形态从高处俯冲，出其不意发动攻击'},{icon:'🐺',text:'狼形态的高速冲刺可以快速穿越战场，支援友军'},{icon:'🐟',text:'探索水下地图发现隐藏资源点和捷径路线'},{icon:'🗿',text:'攻城高仑可将队友投入城墙内，实现奇袭突破'}].map(item => `
            <div class="flex items-start gap-3">
              <span class="text-lg flex-shrink-0">${item.icon}</span>
              <span class="text-[#8a7a9a] text-sm leading-relaxed">${item.text}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

// ─── Economy ───
function economySection() {
  const gearSources = [
    { source: '野外掉落', tradeable: '可交易', icon: '🌿', color: '#2ed573', desc: '野外BOSS与普通怪物掉落，品质较低但可拍卖行交易' },
    { source: '副本奖励', tradeable: '可交易', icon: '🏛️', color: '#70a1ff', desc: '副本通关奖励，品质稳定，可通过拍卖行出售' },
    { source: '制作大成功', tradeable: '可交易', icon: '⚒️', color: '#ffa502', desc: '制作时触发大成功概率获得，品质最高且可交易' },
    { source: '世界Boss掉落', tradeable: '可交易', icon: '👑', color: '#c9a227', desc: '世界Boss掉落高品质装备，是获取顶级装备的重要途径' },
    { source: '普通制作', tradeable: '绑定', icon: '🔨', color: '#ff6b35', desc: '普通制作获得的装备绑定角色，无法交易但品质优良' },
  ];
  return `<section id="economy" class="py-24 bg-[#0a0a12] relative overflow-hidden">
  ${sectionTopDecorator()}
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,162,39,0.04)_0%,transparent_60%)]"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16">
      ${sectionBadge('💰 经济系统')}
      <h2 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">货币 · 装备 · 经济生态</h2>
      <p class="text-[#7a6a4a] text-base max-w-xl mx-auto">了解王权与自由的经济体系，合理规划资源获取路线，让你的角色持续稳定成长。</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
      ${SECTIONS.economy.items.slice(0,3).map(e => `
      <div class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border p-6 hover:-translate-y-1 transition-all duration-300" style="border-color:${e.color}30">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300" style="background-color:${e.color}15;border:1px solid ${e.color}30">${e.icon}</div>
          <h3 class="text-white font-bold text-lg">${e.name}</h3>
        </div>
        <p class="text-[#7a6a4a] text-sm leading-relaxed mb-4">${e.desc}</p>
        <div class="rounded-lg p-3 text-xs" style="background-color:${e.color}08;border-left:3px solid ${e.color}">
          <span style="color:${e.color}" class="font-semibold">获取方式：</span>
          <span class="text-[#7a6a4a] ml-1">${e.obtain}</span>
        </div>
      </div>`).join('')}
    </div>
    <div class="bg-[#0a0a15] rounded-2xl border border-[#1a1525] overflow-hidden mb-10">
      <div class="px-6 py-4 border-b border-[#1a1525] flex items-center gap-3">
        <span class="text-xl">🎯</span>
        <h3 class="text-white font-bold text-lg">装备获取途径与交易限制</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-[#0f0f1c]">
              <th class="text-left px-6 py-3 text-[#7a6a4a] text-sm font-medium">获取来源</th>
              <th class="text-left px-6 py-3 text-[#7a6a4a] text-sm font-medium">交易状态</th>
              <th class="text-left px-6 py-3 text-[#7a6a4a] text-sm font-medium">详细说明</th>
            </tr>
          </thead>
          <tbody>
            ${gearSources.map(s => `<tr class="border-t border-[#1a1525] hover:bg-[#0f0f1c]/50 transition-colors">
              <td class="px-6 py-4"><div class="flex items-center gap-2"><span class="text-xl">${s.icon}</span><span class="text-white font-medium text-sm">${s.source}</span></div></td>
              <td class="px-6 py-4"><span class="text-xs px-2.5 py-1 rounded-full font-medium" style="color:${s.color};background-color:${s.color}15">${s.tradeable}</span></td>
              <td class="px-6 py-4 text-[#7a6a4a] text-sm">${s.desc}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="bg-[#0a0f0a] rounded-2xl border border-[#2ed573]/20 p-6">
        <h4 class="text-[#2ed573] font-bold text-lg mb-4 flex items-center gap-2"><span>📈</span> 高效搬砖策略</h4>
        <ul class="space-y-2 text-[#7a8a7a] text-sm">
          ${['多角色轮流完成委托任务，6-8个角色最优','50级后每天日常+副本仅需1-2小时/角色','固定队打副本效率最高，收益最稳定','关注拍卖行价格，在价格高峰期出售物品','先行服与公测服经济环境有所不同，注意区分'].map(t => `<li class="flex items-start gap-2"><span class="text-[#2ed573] text-xs mt-1 flex-shrink-0">◆</span>${t}</li>`).join('')}
        </ul>
      </div>
      <div class="bg-[#0a0a15] rounded-2xl border border-[#c9a227]/20 p-6">
        <h4 class="text-[#c9a227] font-bold text-lg mb-4 flex items-center gap-2"><span>💡</span> Lucent 交易须知</h4>
        <ul class="space-y-2 text-[#8a7a5a] text-sm">
          ${['充值后的Lucent有3天冷却期，不能立即交易','拍卖行交易抽取22%手续费，出售时需计算利润','高端装备是最稳定的Lucent来源之一','狗粮（强化材料）和图纸交易量大，利润稳定','避免在游戏开服初期低价抛售，等待市场稳定'].map(t => `<li class="flex items-start gap-2"><span class="text-[#c9a227] text-xs mt-1 flex-shrink-0">◆</span>${t}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>`;
}

// ─── Homepage ───
const homeBody = [
  heroSection(),
  beginnerSection(),
  weaponsSection(),
  tierListSection(),
  dungeonsSection(),
  pvpSection(),
  morphSection(),
  economySection(),
].join('');

// ─── Weapons Detail Page ───
function weaponsPageBody() {
  const roles = ['全部', 'DPS', '坦克', '治疗', '辅助', '远程DPS'];
  return `<section class="py-24 bg-[#06060e] relative overflow-hidden">
  ${sectionTopDecorator()}
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(201,162,39,0.04)_0%,transparent_60%)]"></div>
  ${bannerHTML('/images/weapons-banner.jpg', '⚔️ 武器系统', '九大武器 · 无限组合')}
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex flex-wrap gap-2 mb-8 justify-center">
      ${roles.map(r => `<span class="px-4 py-1.5 rounded-full text-sm font-medium border border-[#2a2230] text-[#7a6a4a]">${r}</span>`).join('')}
    </div>
    <div class="grid grid-cols-1 gap-6">
      ${WEAPONS.map(w => `
      <div id="${w.id}" class="rounded-2xl border p-6 sm:p-8 transition-all duration-300" style="border-color:${w.color}40;background:linear-gradient(135deg, ${w.color}08 0%, #0a0a15 60%);box-shadow:0 0 40px ${w.color}10">
        <div class="flex flex-wrap items-start gap-4 mb-6">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style="background-color:${w.color}20;border:2px solid ${w.color}50">${w.icon}</div>
          <div class="flex-1">
            <h3 class="text-white font-cinzel font-bold text-2xl sm:text-3xl">${w.name}</h3>
            <div class="flex flex-wrap items-center gap-2 mt-1">
              <span class="text-[#7a6a4a] text-sm">${w.nameEn}</span>
              <span class="text-[#3a3240]">·</span>
              <span style="color:${w.color}" class="text-sm font-medium">${w.role}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <span class="px-3 py-1.5 rounded-lg border font-bold ${tierColor(w.tierPvE)}">PVE: ${w.tierPvE}</span>
            <span class="px-3 py-1.5 rounded-lg border font-bold ${tierColor(w.tierPvP)}">PVP: ${w.tierPvP}</span>
          </div>
        </div>
        <p class="text-[#9a8a6a] text-base leading-relaxed mb-6 border-l-2 pl-4" style="border-color:${w.color}">${w.desc}</p>
        <div class="text-[#7a6a4a] text-sm mb-3">🔗 核心技能</div>
        <div class="flex flex-wrap gap-2 mb-6">
          ${w.skills.map(s => `<span class="px-3 py-1.5 rounded-lg text-sm font-medium" style="background-color:${w.color}15;border:1px solid ${w.color}30;color:${w.color}">${s}</span>`).join('')}
        </div>
        <div class="text-[#7a6a4a] text-sm mb-3">🔗 推荐搭配副武器</div>
        <div class="flex flex-wrap gap-2">
          ${w.bestWith.map(id => {
            const cw = WEAPONS.find(x => x.id === id);
            return cw ? `<span class="px-3 py-1.5 rounded-lg text-sm font-medium" style="background-color:${w.color}15;border:1px solid ${w.color}30;color:${w.color}">${cw.icon} ${cw.name}</span>` : '';
          }).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

// ─── Builds Page ───
function buildsPageBody() {
  return `<section class="py-24 bg-[#0a0a12] relative overflow-hidden">
  ${sectionTopDecorator()}
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(201,162,39,0.04)_0%,transparent_60%)]"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16">
      ${sectionBadge('🏆 职业强度评级')}
      <h1 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">流派 Build 推荐</h1>
      <p class="text-[#7a6a4a] text-base max-w-xl mx-auto">当前版本武器组合强度排名，基于PVE和PVP综合表现。</p>
    </div>
    <div class="space-y-6">
      ${TIERS.map(t => {
        const bList = t.builds.map(slug => BUILDS.find(b => b.slug === slug)).filter(Boolean);
        if (!bList.length) return '';
        return `<div class="rounded-2xl border overflow-hidden" style="border-color:${t.color}30;background-color:${t.bg}">
          <div class="flex items-center gap-4 px-6 py-4 border-b" style="border-color:${t.color}20">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center font-cinzel font-black text-2xl" style="color:${t.color}">${t.tier}</div>
            <div>
              <div class="font-cinzel font-bold text-lg" style="color:${t.color}">Tier ${t.tier}</div>
              <div class="text-[#5a4a2a] text-xs">${bList.length}个流派</div>
            </div>
          </div>
          <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${bList.map(b => `
            <div id="${b.slug}" class="bg-[#0a0a12]/60 rounded-xl p-4 border" style="border-color:${t.color}20">
              <div class="flex items-center justify-between mb-1">
                <div class="text-white font-semibold">${b.name}</div>
                <span class="text-xs font-bold px-2 py-0.5 rounded" style="background:${t.bg};color:${t.color}">${b.tier}</span>
              </div>
              <div class="text-[#7a6a4a] text-xs mb-2">${b.role} · 属性: ${b.stats}</div>
              <p class="text-[#a09070] text-sm">${b.desc}</p>
            </div>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
    <div class="mt-8 text-center">
      <p class="text-[#5a4a2a] text-xs">* Tier List 基于国际服正式版数据，游戏版本更新后排名可能有所变动。</p>
    </div>
  </div>
</section>`;
}

// ─── Dungeons Detail Page ───
function dungeonsPageBody() {
  return `<section class="py-24 bg-[#06060e] relative overflow-hidden">
  ${sectionTopDecorator()}
  ${bannerHTML('/images/dungeon-banner.jpg', '🗺️ 副本攻略', '副本全攻略')}
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 gap-6">
      ${SECTIONS.dungeons.items.map(d => `
      <div class="rounded-2xl border p-6 sm:p-8 transition-all duration-300" style="border-color:${d.color}40;background:linear-gradient(135deg, ${d.color}08 0%, #06060e 60%);box-shadow:0 0 40px ${d.color}10">
        <div class="flex flex-wrap items-start gap-4 mb-6">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style="background-color:${d.color}20;border:2px solid ${d.color}50">${d.icon}</div>
          <div class="flex-1">
            <h3 class="text-white font-cinzel font-bold text-xl sm:text-2xl mb-1">${d.name}</h3>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm font-medium px-2 py-0.5 rounded" style="color:${d.color};background-color:${d.color}20">${d.difficulty}</span>
              <span class="text-[#5a4a2a] text-sm">${d.type}</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          ${[{label:'参与人数',value:d.players,icon:'👥'},{label:'推荐等级',value:d.level,icon:'⚡'},{label:'最终Boss',value:d.boss,icon:'💀'}].map(info => `
          <div class="bg-[#0a0a12]/60 rounded-xl p-3 border border-[#1a1520]">
            <div class="text-[#5a4a2a] text-xs mb-1">${info.icon} ${info.label}</div>
            <div class="text-white font-semibold text-sm">${info.value}</div>
          </div>`).join('')}
        </div>
        <div class="mb-6">
          <div class="text-[#c9a227] text-sm font-semibold mb-3 flex items-center gap-2"><span>💡</span> 攻略要点</div>
          <div class="bg-[#0a0a12]/60 rounded-xl p-4 border text-[#9a8a6a] text-sm leading-relaxed" style="border-color:${d.color}20">${d.tip}</div>
        </div>
        <div>
          <div class="text-[#c9a227] text-sm font-semibold mb-3 flex items-center gap-2"><span>🎁</span> 主要奖励</div>
          <div class="flex flex-wrap gap-2">
            ${d.rewards.map(r => `<span class="px-3 py-1.5 rounded-lg text-sm" style="color:${d.color};background-color:${d.color}15;border:1px solid ${d.color}30">${r}</span>`).join('')}
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

// ─── PVP Detail Page ───
function pvpPageBody() {
  const weatherEffects = [
    { weather: '☔ 雨天', effect: '闪电系技能伤害与范围大幅提升', cls: '法杖使用者', color: '#70a1ff' },
    { weather: '💨 大风', effect: '火焰技能传播范围与持续时间增加', cls: '法杖 / 十字弓', color: '#ff6b35' },
    { weather: '❄️ 雪天', effect: '冰霜效果增强，移动速度Debuff延长', cls: '长弓使用者', color: '#a0d8ef' },
    { weather: '☀️ 晴天', effect: '普通状态，无特殊天气加成', cls: '全职业均衡', color: '#c9a227' },
  ];
  return `<section class="py-24 bg-[#0a0a12] relative overflow-hidden">
  ${sectionTopDecorator()}
  ${bannerHTML('/images/pvp-banner.jpg', '⚔️ PVP指南', '战场制胜 · PVP全指南', '#0a0a12')}
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      ${SECTIONS.pvp.items.map(p => `
      <div class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#1a1530] p-6 hover:border-[#c9a227]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.08)] hover:-translate-y-1">
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">${p.icon}</div>
          <span class="text-xs px-2 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20 text-[#c9a227]">${p.type}</span>
        </div>
        <h3 class="text-white font-bold text-lg mb-1">${p.title}</h3>
        ${p.subtitle ? `<p class="text-[#c9a227]/60 text-xs mb-3">${p.subtitle}</p>` : ''}
        <p class="text-[#7a6a4a] text-sm leading-relaxed mb-4">${p.desc}</p>
        <div class="space-y-2">
          ${p.tips.map(tip => `<div class="flex items-start gap-2"><span class="text-[#c9a227] text-xs mt-1 flex-shrink-0">◆</span><span class="text-[#8a7a5a] text-sm">${tip}</span></div>`).join('')}
        </div>
      </div>`).join('')}
    </div>
    <div class="bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#2a2540] p-6 sm:p-8 mb-10">
      <div class="text-center mb-8">
        ${sectionBadge('🌤️ 天气系统', '#70a1ff')}
        <h3 class="font-cinzel text-2xl font-bold text-white mb-2">天气联动 · 战略核心</h3>
        <p class="text-[#7a6a4a] text-sm max-w-lg mx-auto">王权与自由的动态天气系统直接影响战斗策略。聪明的玩家会在不同天气下切换技能组合，以获得决定性优势。</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${weatherEffects.map(we => `<div class="rounded-xl p-4 border transition-all duration-300 hover:scale-105" style="border-color:${we.color}30;background-color:${we.color}08">
          <div class="text-2xl mb-2">${we.weather.split(' ')[0]}</div>
          <div class="font-semibold text-sm mb-2" style="color:${we.color}">${we.weather.split(' ').slice(1).join(' ')}</div>
          <p class="text-[#7a6a4a] text-xs mb-2 leading-relaxed">${we.effect}</p>
          <div class="text-xs px-2 py-1 rounded-full inline-block" style="color:${we.color};background-color:${we.color}15">推荐: ${we.cls}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-[#0a0a15] rounded-xl p-6 border border-[#ff4757]/20">
        <h4 class="text-[#ff6b75] font-bold text-lg mb-4">⚔️ 进攻方策略</h4>
        <ul class="space-y-2 text-[#8a7a7a] text-sm">
          ${['优先击杀对方治疗职业','利用地形进行包夹与穿插','暴风雨天气优先选择法系爆发','攻城战利用变形形态翻越城墙','小队配合：控制→爆发→收割'].map(t => `<li class="flex items-start gap-2"><span class="text-[#ff4757] text-xs mt-1">▶</span> ${t}</li>`).join('')}
        </ul>
      </div>
      <div class="bg-[#0a0a15] rounded-xl p-6 border border-[#2ed573]/20">
        <h4 class="text-[#2ed573] font-bold text-lg mb-4">🛡️ 防守方策略</h4>
        <ul class="space-y-2 text-[#7a8a7a] text-sm">
          ${['占据高地地形，限制敌方进攻路线','保护治疗的生存是首要任务','城池核心启动防御设施','坦克在关键节点集中防守','善用地图障碍物遮挡法系远程'].map(t => `<li class="flex items-start gap-2"><span class="text-[#2ed573] text-xs mt-1">▶</span> ${t}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>`;
}

// ─── Guide Pages ───
function guidePage(section) {
  const s = SECTIONS[section];
  const bodyParts = [];

  // Section-specific content
  if (section === 'beginner') {
    bodyParts.push(`<section class="py-24 bg-[#0a0a12] relative overflow-hidden">
      ${sectionTopDecorator()}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.05)_0%,transparent_70%)]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          ${sectionBadge('📜 新手指引')}
          <h1 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">${s.title}</h1>
          <p class="text-[#7a6a4a] text-base max-w-xl mx-auto">${s.summary}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${s.items.map((item, i) => `
          <div class="group relative bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-6 hover:border-[#c9a227]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.1)] hover:-translate-y-1">
            <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 flex items-center justify-center">
              <span class="text-[#c9a227] text-sm font-bold">${String(item.step).padStart(2, '0')}</span>
            </div>
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c9a227]/20 to-[#8b6914]/10 border border-[#c9a227]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">${item.icon}</span>
            </div>
            <h3 class="text-white font-bold text-lg mb-2">${item.title}</h3>
            <p class="text-[#7a6a4a] text-sm leading-relaxed">${item.desc}</p>
            ${i < s.items.length - 1 ? `<div class="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#c9a227]/30 to-transparent z-10"></div>` : ''}
          </div>`).join('')}
        </div>
      </div>
    </section>`);
  }

  if (section === 'morph') {
    bodyParts.push(`<section class="py-24 bg-[#06060e] relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9b59b6]/30 to-transparent"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(155,89,182,0.06)_0%,transparent_70%)]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          ${sectionBadge('🦅 变形系统', '#9b59b6')}
          <h1 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">${s.title}</h1>
          <p class="text-[#7a6a4a] text-base max-w-2xl mx-auto">${s.summary}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          ${s.items.map(m => `
          <div class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#2a2540] p-6 text-center hover:border-[#9b59b6]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,89,182,0.1)] hover:-translate-y-1">
            <div class="w-20 h-20 rounded-full bg-[#9b59b6]/10 border-2 border-[#9b59b6]/20 flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 group-hover:border-[#9b59b6]/50 transition-all duration-300">${m.icon}</div>
            <h3 class="text-white font-bold text-base mb-1">${m.name}</h3>
            <span class="inline-block text-xs px-2.5 py-0.5 rounded-full bg-[#9b59b6]/15 border border-[#9b59b6]/30 text-[#b07fd4] mb-3">${m.type}</span>
            <p class="text-[#7a6a4a] text-sm leading-relaxed">${m.effect}</p>
          </div>`).join('')}
        </div>
        <div class="bg-gradient-to-br from-[#0f0b1f] to-[#080812] rounded-2xl border border-[#9b59b6]/25 p-6 sm:p-8">
          <h3 class="font-cinzel text-xl font-bold text-white mb-4 flex items-center gap-3"><span class="w-8 h-8 rounded-lg bg-[#9b59b6]/20 flex items-center justify-center text-lg">🔓</span>如何解锁变形形态</h3>
          <div class="space-y-3">
            ${['完成特定主线任务后，技能树中解锁变形技能','雨天环境触发飞鸟变形，可在空中自由滑翔','水边或水中区域触发鱼类变形，快速探索水下地图','攻城战特殊状态下解锁攻城高仑变形'].map((t, i) => `<div class="flex items-start gap-3"><span class="font-cinzel text-[#9b59b6] font-bold text-sm flex-shrink-0 w-6">${String(i+1).padStart(2,'0')}</span><span class="text-[#8a7a9a] text-sm leading-relaxed">${t}</span></div>`).join('')}
          </div>
        </div>
      </div>
    </section>`);
  }

  if (section === 'economy') {
    bodyParts.push(`<section class="py-24 bg-[#0a0a12] relative overflow-hidden">
      ${sectionTopDecorator()}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,162,39,0.04)_0%,transparent_60%)]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          ${sectionBadge('💰 经济系统')}
          <h1 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">${s.title}</h1>
          <p class="text-[#7a6a4a] text-base max-w-xl mx-auto">${s.summary}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          ${s.items.map(e => `
          <div class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border p-6 hover:-translate-y-1 transition-all duration-300" style="border-color:${e.color}30">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300" style="background-color:${e.color}15;border:1px solid ${e.color}30">${e.icon}</div>
              <h3 class="text-white font-bold text-lg">${e.name}</h3>
            </div>
            <p class="text-[#7a6a4a] text-sm leading-relaxed mb-4">${e.desc}</p>
            <div class="rounded-lg p-3 text-xs" style="background-color:${e.color}08;border-left:3px solid ${e.color}">
              <span style="color:${e.color}" class="font-semibold">获取方式：</span>
              <span class="text-[#7a6a4a] ml-1">${e.obtain}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>`);
  }

  if (section === 'features') {
    bodyParts.push(`<section class="py-24 bg-[#0a0a12] relative overflow-hidden">
      ${sectionTopDecorator()}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.04)_0%,transparent_70%)]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          ${sectionBadge('🎮 核心系统')}
          <h1 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">${s.title}</h1>
          <p class="text-[#7a6a4a] text-base max-w-xl mx-auto">${s.summary}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          ${s.items.map(f => `
          <div class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-6 hover:border-[#c9a227]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.1)] hover:-translate-y-1">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a227]/20 to-[#8b6914]/10 border border-[#c9a227]/20 flex items-center justify-center flex-shrink-0 text-2xl">${f.icon}</div>
              <div>
                <h3 class="text-white font-bold text-base mb-2">${f.title}</h3>
                <p class="text-[#7a6a4a] text-sm leading-relaxed">${f.desc}</p>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>`);
  }

  if (section === 'fishing') {
    bodyParts.push(`<section class="py-24 bg-[#06060e] relative overflow-hidden">
      ${sectionTopDecorator()}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(52,152,219,0.05)_0%,transparent_70%)]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          ${sectionBadge('🎣 钓鱼攻略', '#3498db')}
          <h1 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">${s.title}</h1>
          <p class="text-[#7a6a4a] text-base max-w-xl mx-auto">${s.summary}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          ${s.items.map(f => `
          <div class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-5 hover:border-[#3498db]/40 transition-all duration-300">
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3498db]/20 to-[#2980b9]/10 border border-[#3498db]/20 flex items-center justify-center flex-shrink-0 text-2xl">🎣</div>
              <div>
                <div class="text-white font-semibold text-sm">${f.name}</div>
                ${f.level ? `<div class="text-[#3498db] text-xs">${f.level}</div>` : ''}
                <div class="text-[#7a6a4a] text-xs">${f.source}</div>
                ${f.desc ? `<p class="text-[#a09070] text-sm mt-1">${f.desc}</p>` : ''}
              </div>
            </div>
          </div>`).join('')}
        </div>
        <div class="bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-6 mb-6">
          <h3 class="text-[#c9a227] font-bold text-lg mb-4">🎯 钓鱼技巧</h3>
          <ul class="space-y-2">
            ${s.tips.map(t => `<li class="flex items-start gap-2 text-[#7a6a4a] text-sm"><span class="text-[#c9a227] mt-1.5 flex-shrink-0">◆</span>${t}</li>`).join('')}
          </ul>
        </div>
        <div class="bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-6">
          <h3 class="text-[#c9a227] font-bold text-lg mb-4">📍 特殊钓点位置</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${s.spots.map(sp => `
            <div class="p-4 rounded-xl bg-[#c9a227]/5 border border-[#c9a227]/10">
              <div class="font-medium text-white text-sm">${sp.name}</div>
              <div class="text-[#a09070] text-xs mt-1">${sp.desc}</div>
              ${sp.condition ? `<div class="text-[#7a6a4a] text-xs mt-1">条件: ${sp.condition}</div>` : ''}
            </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`);
  }

  if (section === 'farming') {
    bodyParts.push(`<section class="py-24 bg-[#0a0a12] relative overflow-hidden">
      ${sectionTopDecorator()}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.04)_0%,transparent_70%)]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          ${sectionBadge('💰 搬砖与经济')}
          <h1 class="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">${s.title}</h1>
          <p class="text-[#7a6a4a] text-base max-w-xl mx-auto">${s.summary}</p>
        </div>
        <div class="bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-6 mb-6">
          <h3 class="text-[#c9a227] font-bold text-lg mb-4">✅ 每日日常清单</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead><tr class="text-[#7a6a4a] border-b border-[#c9a227]/10">
                <th class="text-left py-2 pr-3">任务</th><th class="text-left py-2 pr-3">Sollant</th><th class="text-left py-2 pr-3">额外奖励</th><th class="text-left py-2">优先级</th>
              </tr></thead>
              <tbody>${s.checklist.map(c => `<tr class="border-b border-[#c9a227]/5">
                <td class="py-2 pr-3 text-white">${c.task}</td>
                <td class="py-2 pr-3 text-[#a09070]">${c.sollant}</td>
                <td class="py-2 pr-3 text-[#a09070] text-xs">${c.reward}</td>
                <td class="py-2"><span class="text-xs px-2 py-0.5 rounded ${c.priority === '必做' ? 'bg-[#ff4757]/20 text-[#ff4757]' : c.priority === '必买' ? 'bg-[#c9a227]/20 text-[#c9a227]' : c.priority === '每日' ? 'bg-[#3498db]/20 text-[#3498db]' : 'bg-[#2ed573]/20 text-[#2ed573]'}">${c.priority}</span></td>
              </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div class="mb-6">
          <h3 class="text-[#c9a227] font-bold text-lg mb-4">🗺️ 刷怪路线推荐</h3>
          <div class="grid grid-cols-1 gap-4">
            ${s.routes.map(r => `
            <div class="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-5 hover:border-[#c9a227]/40 transition-all duration-300">
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <h4 class="text-white font-semibold">${r.name}</h4>
                <span class="text-xs px-2 py-0.5 rounded bg-[#c9a227]/20 text-[#c9a227]">${r.build}</span>
                <span class="text-xs text-[#5a4a2a]">${r.weather}</span>
              </div>
              <p class="text-[#a09070] text-sm mb-2">${r.desc}</p>
              <div class="flex gap-4 text-xs text-[#7a6a4a]">
                <span>收益: ${r.efficiency}</span>
                <span>药水: ${r.potion}</span>
              </div>
            </div>`).join('')}
          </div>
        </div>
        <div class="bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-6 mb-6">
          <h3 class="text-[#c9a227] font-bold text-lg mb-4">💡 刷怪技巧</h3>
          <ul class="space-y-2">
            ${s.tips.map(t => `<li class="flex items-start gap-2 text-[#7a6a4a] text-sm"><span class="text-[#c9a227] mt-1.5 flex-shrink-0">◆</span>${t}</li>`).join('')}
          </ul>
        </div>
        ${s.trade ? `
        <div class="bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-6">
          <h3 class="text-[#c9a227] font-bold text-lg mb-4">🏪 交易所赚钱攻略</h3>
          <div class="grid grid-cols-1 gap-4">
            ${s.trade.map(t => `
            <div class="p-4 rounded-xl bg-[#c9a227]/5 border border-[#c9a227]/10">
              <h4 class="text-white font-semibold text-sm mb-1">${t.title}</h4>
              <p class="text-[#a09070] text-sm">${t.desc}</p>
            </div>`).join('')}
          </div>
        </div>` : ''}
      </div>
    </section>`);
  }

  return bodyParts.join('');
}

// ═══════════════════════════════════════
// PAGE GENERATION
// ═══════════════════════════════════════

// Homepage
fs.writeFileSync(path.join(DIST, 'index.html'), page({
  meta: meta('王权与自由攻略站 — Throne and Liberty 中文指南',
    '最全面的王权与自由中文攻略站，涵盖武器指南、Build推荐、副本攻略、PVP技巧与新手入门教程。', '/'),
  body: homeBody
}, '/'));

// Weapons
fs.writeFileSync(path.join(DIST, 'weapons.html'), page({
  meta: meta('王权与自由全武器指南 — 武器详解与搭配推荐',
    '王权与自由全部武器详解：双手剑、长剑、短剑、长弓、弩弓、魔杖、魔法棒、铁爪、魔力球、长矛。包含技能、定位和推荐搭配。', '/weapons.html'),
  body: weaponsPageBody()
}, '/weapons.html'));

// Builds
fs.writeFileSync(path.join(DIST, 'builds.html'), page({
  meta: meta('王权与自由 Build 推荐 — 武器组合强度排名',
    '当前版本武器组合Build强度排名，S/A/B三级分级，涵盖PVE和PVP综合表现评估。', '/builds.html'),
  body: buildsPageBody()
}, '/builds.html'));

// Dungeons
fs.writeFileSync(path.join(DIST, 'dungeons.html'), page({
  meta: meta('王权与自由副本攻略大全 — 精英/英雄/团本',
    '王权与自由全副本攻略，包含精英副本、英雄副本、12人公会团本等完整机制解析。', '/dungeons.html'),
  body: dungeonsPageBody()
}, '/dungeons.html'));

// PVP
fs.writeFileSync(path.join(DIST, 'pvp.html'), page({
  meta: meta('王权与自由 PVP 攻略 — 竞技场/战场/攻城战',
    '王权与自由PVP玩法完整攻略，包括星云岛战场、3v3竞技场、攻城战和天气系统详解。', '/pvp.html'),
  body: pvpPageBody()
}, '/pvp.html'));

// Guide pages
['beginner','morph','economy','features','fishing','farming'].forEach(section => {
  const s = SECTIONS[section];
  const descMap = {
    beginner: '从零开始的新手教程，包含武器选择、主线任务、委托系统、公会和天气系统完整指南。',
    morph: '变形系统完整指南，飞鸟、狼、鱼、攻城高仑四种形态的解锁和使用方法。',
    economy: '游戏经济系统全解，包含辉币、索兰特、委托铸币等货币获取和交易策略。',
    features: '王权与自由核心特色系统详解，天气昼夜、武器精通、钓鱼、住房等。',
    fishing: '钓鱼全攻略，鱼竿升级路径、全图鉴鱼类收集、特殊钓点位置和钓鱼技巧。',
    farming: '搬砖与经济指南，每日日常清单、深渊刷怪路线、交易所赚钱和版本理财策略。'
  };
  fs.writeFileSync(path.join(DIST, 'guide', `${s.slug}.html`), page({
    meta: meta(`${s.title} — 王权与自由攻略`, descMap[section], `/guide/${s.slug}.html`),
    body: guidePage(section)
  }, `/guide/${s.slug}.html`));
});

// ─── Sitemap ───
const pages = [
  '/', '/weapons.html', '/builds.html', '/dungeons.html', '/pvp.html',
  ...['beginner','morph','economy','features','fishing','farming'].map(s => `/guide/${s}.html`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p => `
  <url><loc>${BASE}${p}</loc></url>`).join('')}
</urlset>`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml`);

console.log(`✅ Generated ${pages.length} pages + sitemap`);
