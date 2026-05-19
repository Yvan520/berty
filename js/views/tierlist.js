// ─── Tier List View ───
(function(){'use strict';
function render(view){
  const W=TL.WEATHERS, WC=TL.WEATHER_CN;
  const tiers=['S','A','B'];
  const tierNames={S:'S — 版本答案',A:'A — 强势推荐',B:'B — 可用'}
  const WEMS=TL.WEAPONS.reduce((a,w)=>{a[w.id]=w;return a},{});

  view.innerHTML=`<div class="tier-list view">
    <div style="text-align:center;padding:20px 0 10px">
      <h2 style="font-size:22px;font-weight:800">🏆 Tier 排名</h2>
      <p style="font-size:13px;color:var(--text-dim);margin-top:4px">基于当前版本 PvP 和 PvE 综合表现<br>每周更新 · 天气环境参考</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;justify-content:center">
      <button class="pill-btn selected" id="tierFilterAll" onclick="filterTier('all')">全部</button>
      <button class="pill-btn" id="tierFilterDps" onclick="filterTier('dps')">DPS</button>
      <button class="pill-btn" id="tierFilterTank" onclick="filterTier('tank')">坦克</button>
      <button class="pill-btn" id="tierFilterHealer" onclick="filterTier('healer')">辅助</button>
    </div>
    <div id="tierRows">
      ${tiers.map(t=>`
        <div class="tier-row">
          <div class="tier-label ${t.toLowerCase()}">${tierNames[t]}</div>
          <div class="tier-items">
            ${TL['TIER_'+t].map(b=>`
              <div class="tier-item tier-build" data-role="${b.role.toLowerCase()}" onclick="TL.Router.navigate('/build?id=${b.id}')">
                <span class="ti-icon">${W[b.w]||'☀️'}</span>
                <div class="ti-info">
                  <div class="ti-weapons">${b.wp}</div>
                  <div class="ti-role">${WC[b.w]} · 操作${b.difficulty} · ${b.combo.slice(0,18)}…</div>
                </div>
                <span class="ti-tag ${b.role==='DPS'?'dps':b.role==='坦克'||b.role.includes('坦克')?'tank':'healer'}">${b.role}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
  window.filterTier=function(r){
    document.querySelectorAll('.tierFilterBtn').forEach(b=>b.classList.remove('selected'));
    const btn=document.getElementById('tierFilter'+(r.charAt(0).toUpperCase()+r.slice(1)));
    if(btn)btn.classList.add('selected');
    const builds=document.querySelectorAll('.tier-build');
    builds.forEach(b=>{
      if(r==='all'){b.style.display='flex';return}
      const role=b.dataset.role||'';
      const roleMap={dps:['dps'],tank:['tank','坦克'],healer:['辅助','healer']};
      const matches=r==='dps'?role.includes('dps'):r==='tank'?role.includes('tank')||role.includes('坦克'):role.includes('辅助')||role.includes('healer')||role.includes('support');
      b.style.display=matches?'flex':'none';
    });
  };
  ['All','Dps','Tank','Healer'].forEach(r=>{
    const btn=document.getElementById('tierFilter'+r);
    if(btn)btn.classList.add('tierFilterBtn');
  });
}
TL.Router && TL.Router.register('tierlist',render);
})();
