// ─── Builds List View ───
(function(){'use strict';
function render(view,params){
  const W=TL.WEATHERS, WC=TL.WEATHER_CN;
  let builds=TL.BUILDS;
  const filterRole=params.role||'all';
  const filterTier=params.tier||'all';
  const filterW=params.w||'all';
  if(filterRole!=='all')builds=builds.filter(b=>b.role.toLowerCase()===filterRole);
  if(filterTier!=='all')builds=builds.filter(b=>b.tier===filterTier.toUpperCase());
  if(filterW!=='all'){
    const wep=TL.WEAPONS.find(x=>x.id===filterW);
    if(wep)builds=builds.filter(b=>b.wp.includes(wep.name.replace(/[^a-zA-Z\u4e00-\u9fff]/g,'').slice(0,2)));
  }
  const wg=TL.WEATHERS;
  view.innerHTML=`<div class="view">
    <div class="section-header">⚔️ 全部 Build <span class="dim">— ${builds.length} 个流派</span></div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
      <button class="pill-btn ${filterRole==='all'?'selected':''}" onclick="TL.Router.navigate('/builds?role=all&tier=${filterTier}&w=${filterW}')">全部</button>
      <button class="pill-btn ${filterRole==='dps'?'selected':''}" onclick="TL.Router.navigate('/builds?role=dps&tier=${filterTier}&w=${filterW}')">DPS</button>
      <button class="pill-btn ${filterRole==='tank'?'selected':''}" onclick="TL.Router.navigate('/builds?role=tank&tier=${filterTier}&w=${filterW}')">坦克</button>
      <button class="pill-btn ${filterRole==='dps/刺客'||filterRole==='dps/控制'?'selected':''}" onclick="TL.Router.navigate('/builds?role=dps/刺客&tier=${filterTier}&w=${filterW}')">刺客</button>
      <span style="flex:1"></span>
      <button class="pill-btn ${filterTier==='all'?'selected':''}" onclick="TL.Router.navigate('/builds?role=${filterRole}&tier=all&w=${filterW}')">全部排序</button>
      <button class="pill-btn ${filterTier==='s'?'selected':''}" onclick="TL.Router.navigate('/builds?role=${filterRole}&tier=s&w=${filterW}')">S级</button>
      <button class="pill-btn ${filterTier==='a'?'selected':''}" onclick="TL.Router.navigate('/builds?role=${filterRole}&tier=a&w=${filterW}')">A级</button>
      <button class="pill-btn ${filterTier==='b'?'selected':''}" onclick="TL.Router.navigate('/builds?role=${filterRole}&tier=b&w=${filterW}')">B级</button>
    </div>
    <div class="build-grid">
      ${builds.length?builds.map(b=>`
        <div class="build-card card-hover" onclick="TL.Router.navigate('/build?id=${b.id}')">
          <div class="bar ${b.w}"></div>
          <div class="build-header">
            <div class="build-weapons">${b.wp}</div>
            <span class="tag tag-${b.tier.toLowerCase()}">Tier ${b.tier}</span>
          </div>
          <div class="build-combo">${b.combo}</div>
          <div class="build-tip">${b.tip}</div>
          <div class="build-meta">${wg[b.w]} ${WC[b.w]} · ${b.role} · 操作${b.difficulty}</div>
        </div>
      `).join(''):'<div class="empty-state"><div class="e">🔍</div><p>没有匹配的 Build</p></div>'}
    </div>
  </div>`;
}
TL.Router && TL.Router.register('builds',render);
})();
