const fs = require('fs');
const path = require('path');
const { WEAPONS, SECTIONS, BUILDS, TIERS } = require('./src/data.js');

const DIST = path.join(__dirname, 'dist');
const SRC = path.join(__dirname, 'src');

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
if (!fs.existsSync(path.join(DIST, 'guide'))) fs.mkdirSync(path.join(DIST, 'guide'), { recursive: true });

const CSS = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8');

const BASE = 'https://berty.gamewayz.com';
const CTX = { lang:'zh-CN', font:'Noto Sans SC, sans-serif', display:'Cinzel, serif', accent:'#c9a227', bg:'#0a0a12' };

function meta(title, desc, url){
  return `<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${BASE}${url}">
<meta property="og:type" content="website">
<meta name="baidu-site-verification" content="codeva-H9OUhW8VMy" />
<link rel="canonical" href="${BASE}${url}">`;
}

function page(content){
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
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚔️</text></svg>">
</head>
<body class="bg-[#0a0a12] text-white font-sans min-h-screen" style="font-family:'Noto Sans SC',sans-serif">
${NAV}
<main>${content.body}</main>
${FOOTER}
<style>.font-cinzel{font-family:'Cinzel',serif}*{scroll-behavior:smooth}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#04040a}::-webkit-scrollbar-thumb{background:#3a2a10;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#c9a227}::selection{background:rgba(201,162,39,.3)}</style>
</body>
</html>`;
}

function sec(html){ return `<section class="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">${html}</section>`; }
function secH2(title, sub){ return `<h2 class="font-cinzel text-2xl md:text-3xl font-bold text-white mb-2">${title}</h2>${sub?`<p class="text-[#7a6a4a] mb-10">${sub}</p>`:''}`; }
function sectionHeader(title, dim){
  return `<div class="flex items-center gap-3 mb-8">
    <h2 class="font-cinzel text-xl md:text-2xl font-bold text-white">${title}</h2>
    ${dim?`<span class="text-[#5a4a2a] text-sm">${dim}</span>`:''}
    <div class="flex-1 h-px bg-gradient-to-r from-[#c9a227]/20 to-transparent"></div>
  </div>`;
}
function cardCss(){return 'bg-[#0a0a12]/60 backdrop-blur-sm border border-[#c9a227]/10 rounded-xl hover:border-[#c9a227]/30 transition-all duration-300';}

const NAV = `<nav class="sticky top-0 z-50 bg-[#0a0a12]/90 backdrop-blur-md border-b border-[#c9a227]/10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
    <a href="/" class="flex items-center gap-2">
      <span class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#8b6914] flex items-center justify-center text-sm">⚔️</span>
      <span class="font-cinzel text-white font-bold text-lg hidden sm:block">TL 攻略站</span>
    </a>
    <div class="flex items-center gap-1 text-sm">
      <a href="/" class="px-3 py-2 rounded-lg text-[#a09070] hover:text-[#c9a227] hover:bg-[#c9a227]/10 transition">首页</a>
      <a href="/weapons.html" class="px-3 py-2 rounded-lg text-[#a09070] hover:text-[#c9a227] hover:bg-[#c9a227]/10 transition">武器</a>
      <a href="/builds.html" class="px-3 py-2 rounded-lg text-[#a09070] hover:text-[#c9a227] hover:bg-[#c9a227]/10 transition">Build</a>
      <a href="/dungeons.html" class="px-3 py-2 rounded-lg text-[#a09070] hover:text-[#c9a227] hover:bg-[#c9a227]/10 transition">副本</a>
      <a href="/pvp.html" class="px-3 py-2 rounded-lg text-[#a09070] hover:text-[#c9a227] hover:bg-[#c9a227]/10 transition">PVP</a>
    </div>
  </div>
</nav>`;

const FOOTER = `<footer class="border-t border-[#c9a227]/10 py-8 mt-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 text-center text-[#5a4a2a] text-xs">
    <p>TL 攻略站 &middot; 王权与自由中文玩家指南 &middot; 非官方玩家社区</p>
    <p class="mt-1">Published by Amazon Games under license. &copy;2024-2026 NC Corporation.</p>
  </div>
</footer>`;

// ─── Homepage ───
const homeBody = `
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat" style="background-image:url('/images/hero-bg.jpg')">
  <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/70 via-[#0a0a12]/40 to-[#0a0a12]"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a12]/60 via-transparent to-[#0a0a12]/60"></div>
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
      <a href="/guide/beginner.html" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#8b6914] text-[#0a0a12] font-bold text-base hover:opacity-90 transition shadow-[0_0_30px_rgba(201,162,39,0.4)] hover:shadow-[0_0_50px_rgba(201,162,39,0.6)] hover:scale-105">🗡️ 新手入门</a>
      <a href="/weapons.html" class="px-8 py-3.5 rounded-xl border border-[#c9a227]/50 text-[#c9a227] font-bold text-base hover:bg-[#c9a227]/10 transition hover:scale-105 backdrop-blur-sm">⚔️ 武器指南</a>
    </div>
  </div>
</section>

${sec(`
  ${sectionHeader('武器系统','10种武器自由搭配')}
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
    ${WEAPONS.map(w => `
    <a href="/weapons.html#${w.id}" class="${cardCss()} p-4 text-center hover:-translate-y-1">
      <div class="text-3xl mb-2">${w.icon}</div>
      <div class="font-semibold text-sm text-white">${w.name}</div>
      <div class="text-[#7a6a4a] text-xs mt-0.5">${w.nameEn}</div>
      <div class="text-[#c9a227] text-xs mt-1">${w.role}</div>
    </a>`).join('')}
  </div>
`)}

${sec(`
  ${sectionHeader('流派 Build','当前版本推荐组合')}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    ${BUILDS.map(b => {
      const t = TIERS.find(x => x.tier === b.tier);
      return `<a href="/builds.html#${b.slug}" class="${cardCss()} p-5 hover:-translate-y-1">
        <div class="flex items-center justify-between mb-2">
          <div class="font-semibold text-white">${b.name}</div>
          <span class="text-xs font-bold px-2 py-0.5 rounded" style="background:${t.bg};color:${t.color}">${b.tier}</span>
        </div>
        <div class="text-[#7a6a4a] text-xs">${b.role}</div>
        <div class="text-[#a09070] text-sm mt-2">${b.desc}</div>
      </a>`;
    }).join('')}
  </div>
`)}

${sec(`
  ${sectionHeader('新手入门','6步快速上手')}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    ${SECTIONS.beginner.items.map(item => `
    <div class="${cardCss()} p-5">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-2xl">${item.icon}</span>
        <span class="w-6 h-6 rounded-full bg-[#c9a227]/20 text-[#c9a227] text-xs flex items-center justify-center font-bold">${item.step}</span>
        <div class="font-semibold text-white text-sm">${item.title}</div>
      </div>
      <p class="text-[#a09070] text-sm leading-relaxed">${item.desc}</p>
    </div>`).join('')}
  </div>
  <div class="text-center mt-8">
    <a href="/guide/beginner.html" class="inline-flex items-center gap-2 text-[#c9a227] hover:text-white transition">查看完整新手攻略 →</a>
  </div>
`)}

${sec(`
  ${sectionHeader('游戏特色','王权与自由的核心系统')}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    ${SECTIONS.features.items.map(f => `
    <div class="${cardCss()} p-5">
      <div class="text-2xl mb-2">${f.icon}</div>
      <div class="font-semibold text-white text-sm mb-2">${f.title}</div>
      <p class="text-[#a09070] text-sm leading-relaxed">${f.desc}</p>
    </div>`).join('')}
  </div>
  <div class="text-center mt-8">
    <a href="/guide/features.html" class="inline-flex items-center gap-2 text-[#c9a227] hover:text-white transition">详细了解所有特色系统 →</a>
  </div>
`)}`;

fs.writeFileSync(path.join(DIST, 'index.html'), page({
  meta: meta('王权与自由攻略站 — Throne and Liberty 中文指南', '最全面的王权与自由中文攻略站，涵盖10种武器指南、Build搭配推荐、副本攻略、PVP技巧与新手入门教程。', '/'),
  body: homeBody
}));

// ─── Weapons Page ───
const wepBody = sec(`
  <div class="mb-8">
    <h1 class="font-cinzel text-3xl md:text-4xl font-bold text-white mb-2">全武器指南</h1>
    <p class="text-[#7a6a4a]">游戏没有固定职业，选择两种武器搭配定义你的角色定位。</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    ${WEAPONS.map(w => `
    <div id="${w.id}" class="${cardCss()} p-6 flex items-start gap-5">
      <div class="text-4xl flex-shrink-0" style="color:${w.color}">${w.icon}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-1">
          <div class="font-semibold text-white text-lg">${w.name}</div>
          <div class="text-[#5a4a2a] text-xs">${w.nameEn}</div>
          <span class="text-xs px-2 py-0.5 rounded-full border" style="border-color:${w.color};color:${w.color}">${w.role}</span>
        </div>
        <p class="text-[#a09070] text-sm leading-relaxed">${w.desc}</p>
        <div class="flex items-center gap-4 mt-3 text-xs">
          <span>PVE <span style="color:${w.color}">${w.tierPvE}</span></span>
          <span>PVP <span style="color:${w.color}">${w.tierPvP}</span></span>
          <span>推荐搭配: ${w.bestWith.map(id => WEAPONS.find(x=>x.id===id)).filter(Boolean).map(x => x.icon+x.name).join(' / ')}</span>
        </div>
      </div>
    </div>`).join('')}
  </div>
`);

fs.writeFileSync(path.join(DIST, 'weapons.html'), page({
  meta: meta('王权与自由全武器指南 — 10种武器详解', '王权与自由10种武器完整指南：大剑、剑盾、匕首、长弓、十字弓、法杖、魔杖、铁爪、宝珠、长枪。查看属性、定位和推荐搭配。', '/weapons.html'),
  body: wepBody
}));

// ─── Builds Page ───
const buildsBody = sec(`
  <div class="mb-8">
    <h1 class="font-cinzel text-3xl md:text-4xl font-bold text-white mb-2">流派 Build 推荐</h1>
    <p class="text-[#7a6a4a]">当前版本武器组合强度排名，基于PVE和PVP综合表现。</p>
  </div>
  ${TIERS.map(t => {
    const bList = t.builds.map(slug => BUILDS.find(b => b.slug === slug)).filter(Boolean);
    if (!bList.length) return '';
    return `<div class="mb-6">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm" style="background:${t.bg};color:${t.color}">${t.tier}</div>
        <div class="font-cinzel font-bold text-lg" style="color:${t.color}">Tier ${t.tier}</div>
        <div class="text-[#5a4a2a] text-sm">${bList.length}个流派</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${bList.map(b => `
        <div id="${b.slug}" class="${cardCss()} p-5">
          <div class="flex items-center justify-between mb-1">
            <div class="font-semibold text-white">${b.name}</div>
            <span class="text-xs font-bold px-2 py-0.5 rounded" style="background:${t.bg};color:${t.color}">${b.tier}</span>
          </div>
          <div class="text-[#7a6a4a] text-xs mb-2">${b.role}</div>
          <p class="text-[#a09070] text-sm">${b.desc}</p>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('')}
`);

fs.writeFileSync(path.join(DIST, 'builds.html'), page({
  meta: meta('王权与自由Build推荐 — 武器搭配强度排名', '王权与自由当前版本武器组合Build强度排名，S/A/B三级分级，涵盖PVE和PVP的综合表现评估。', '/builds.html'),
  body: buildsBody
}));

// ─── Dungeons Page ───
const dunBody = sec(`
  <div class="mb-8">
    <h1 class="font-cinzel text-3xl md:text-4xl font-bold text-white mb-2">副本攻略</h1>
    <p class="text-[#7a6a4a]">从精英副本到12人公会团本，掌握每个挑战的机制和打法。</p>
  </div>
  <div class="grid grid-cols-1 gap-4">
    ${SECTIONS.dungeons.items.map(d => `
    <div class="${cardCss()} p-6">
      <div class="flex items-start gap-4">
        <div class="text-3xl flex-shrink-0">${d.icon}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 flex-wrap mb-1">
            <div class="font-semibold text-white text-lg">${d.name}</div>
            <span class="text-xs px-2 py-0.5 rounded-full border" style="border-color:${d.color};color:${d.color}">${d.type}</span>
            <span class="text-[#5a4a2a] text-xs">${d.players} · ${d.level}</span>
          </div>
          <div class="text-[#a09070] text-sm mb-2">Boss: ${d.boss} · 难度: ${d.difficulty}</div>
          <p class="text-[#7a6a4a] text-sm">💡 ${d.tip}</p>
          <div class="flex flex-wrap gap-2 mt-3">
            ${d.rewards.map(r => `<span class="text-xs px-2 py-1 rounded bg-[#c9a227]/10 text-[#c9a227]">${r}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>`).join('')}
  </div>
`);

fs.writeFileSync(path.join(DIST, 'dungeons.html'), page({
  meta: meta('王权与自由副本攻略 — 精英/英雄/世界Boss/团本', '王权与自由全副本攻略大全，包含精英副本、英雄副本、世界Boss、单人副本和12人公会团本。', '/dungeons.html'),
  body: dunBody
}));

// ─── PVP Page ───
const pvpBody = sec(`
  <div class="mb-8">
    <h1 class="font-cinzel text-3xl md:text-4xl font-bold text-white mb-2">PVP 攻略</h1>
    <p class="text-[#7a6a4a]">从3v3竞技场到大规模攻城战，掌握各类PVP玩法。</p>
  </div>
  <div class="grid grid-cols-1 gap-6">
    ${SECTIONS.pvp.items.map(p => `
    <div class="${cardCss()} p-6">
      <div class="flex items-start gap-4">
        <div class="text-3xl flex-shrink-0">${p.icon}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 flex-wrap mb-2">
            <div class="font-semibold text-white text-lg">${p.title}</div>
            <span class="text-xs px-2 py-0.5 rounded-full border border-[#c9a227]/30 text-[#c9a227]">${p.type}</span>
          </div>
          <p class="text-[#a09070] text-sm leading-relaxed mb-3">${p.desc}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${p.tips.map(tip => `<div class="flex items-start gap-2 text-sm text-[#7a6a4a]"><span class="text-[#c9a227] mt-0.5">•</span>${tip}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>`).join('')}
  </div>
`);

fs.writeFileSync(path.join(DIST, 'pvp.html'), page({
  meta: meta('王权与自由PVP攻略 — 竞技场/战场/攻城战', '王权与自由PVP玩法完整攻略，包含星云岛战场、3v3竞技场和攻城战的制胜策略。', '/pvp.html'),
  body: pvpBody
}));

// ─── Guide Pages ───
function guidePage(section){
  const s = SECTIONS[section];
  const isList = ['dungeons','pvp','features'].includes(section);
  const body = sec(`
    <div class="mb-8">
      <h1 class="font-cinzel text-3xl md:text-4xl font-bold text-white mb-2">${s.title}</h1>
      <p class="text-[#7a6a4a]">${s.summary}</p>
    </div>
    ${isList ? '' : `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${s.items.map((item, i) => `
      <div class="${cardCss()} p-5">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">${item.icon}</span>
          ${item.step ? `<span class="w-6 h-6 rounded-full bg-[#c9a227]/20 text-[#c9a227] text-xs flex items-center justify-center font-bold">${item.step}</span>` : ''}
          <div class="font-semibold text-white text-sm">${item.title}</div>
        </div>
        <p class="text-[#a09070] text-sm leading-relaxed">${item.desc}</p>
      </div>`).join('')}
    </div>`}
    ${section === 'beginner' ? `
    <div class="mt-8 ${cardCss()} p-6">
      <div class="font-semibold text-white mb-2">💡 新手建议</div>
      <p class="text-[#a09070] text-sm leading-relaxed">王权与自由最友好的一点是：没有固定职业。你可以随时切换武器组合尝试不同玩法。前期不用纠结选什么，先跟着主线走，熟悉各种武器后再决定主修方向。</p>
    </div>` : ''}
    ${section === 'morph' ? `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      ${s.items.map(m => `
      <div class="${cardCss()} p-5 flex items-center gap-4">
        <span class="text-3xl">${m.icon}</span>
        <div>
          <div class="font-semibold text-white text-sm">${m.name}</div>
          <div class="text-[#7a6a4a] text-xs">${m.type}</div>
          <div class="text-[#a09070] text-sm">${m.effect}</div>
        </div>
      </div>`).join('')}
    </div>
    <div class="mt-6 ${cardCss()} p-6">
      <div class="font-semibold text-white mb-2">🌙 变形系统说明</div>
      <p class="text-[#a09070] text-sm leading-relaxed">变形是王权与自由的核心特色之一。玩家可以变形为各种生物快速移动：飞鸟形态在空中滑翔、狼形态在地面疾驰、鱼形态探索水域。攻城战中还可变成攻城高仑投掷队友翻越城墙。击败Boss后还可以通过守护者誓约获得其力量。</p>
    </div>` : ''}
    ${section === 'economy' ? `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      ${s.items.map(e => `
      <div class="${cardCss()} p-5">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-2xl">${e.icon}</span>
          <div class="font-semibold text-white text-sm">${e.name}</div>
        </div>
        <p class="text-[#a09070] text-sm leading-relaxed mb-2">${e.desc}</p>
        <div class="text-xs text-[#7a6a4a]">获取途径: ${e.obtain}</div>
      </div>`).join('')}
    </div>` : ''}
    ${section === 'features' ? `
    <div class="grid grid-cols-1 gap-4 mt-8">
      ${s.items.map(f => `
      <div class="${cardCss()} p-5 flex items-start gap-4">
        <span class="text-2xl flex-shrink-0">${f.icon}</span>
        <div>
          <div class="font-semibold text-white text-sm mb-1">${f.title}</div>
          <p class="text-[#a09070] text-sm leading-relaxed">${f.desc}</p>
        </div>
      </div>`).join('')}
    </div>` : ''}
  `);
  return body;
}

['beginner','morph','economy','features'].forEach(section => {
  const s = SECTIONS[section];
  const descMap = {
    beginner:'从零开始的新手教程，包含武器选择、主线任务、委托系统、公会、日常循环和天气系统完整指南。',
    morph:'变形系统完整指南，包含飞鸟、狼、鱼、攻城高仑四种形态的解锁和使用方法。',
    economy:'游戏经济系统全解，包含Lucent、委托币、公会荣誉等货币的获取和使用策略。',
    features:'王权与自由核心特色系统详解，包括天气昼夜、武器精通、变形变身、住房、公会领地争夺等。'
  };
  fs.writeFileSync(path.join(DIST, 'guide', `${s.slug}.html`), page({
    meta: meta(`${s.title} — 王权与自由攻略`, descMap[section], `/guide/${s.slug}.html`),
    body: guidePage(section)
  }));
});

// ─── Sitemap ───
const pages = [
  '/', '/weapons.html', '/builds.html', '/dungeons.html', '/pvp.html',
  ...['beginner','morph','economy','features'].map(s => `/guide/${s}.html`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p => `
  <url><loc>${BASE}${p}</loc></url>`).join('')}
</urlset>`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml`);

console.log(`✅ Generated ${pages.length} pages + sitemap`);