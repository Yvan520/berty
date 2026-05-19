// ─── Build Detail View — Full Guide Page ───
(function(){'use strict';
function render(view,params){
  const id=parseInt(params.id);
  const b=TL.BUILDS.find(x=>x.id===id);
  if(!b){view.innerHTML='<div class="empty-state"><div class="e">❌</div><p>Build 未找到</p></div>';return}
  const emoji=TL.WEATHERS[b.w]||'☀️';
  const weatherCN=TL.WEATHER_CN[b.w]||'';
  const wDesc=TL.WEATHER_DESC[b.w]||'';
  const wEffect=TL.WEATHER_EFFECT[b.w]||'';
  view.innerHTML=`<div class="build-detail view">
    <a href="#/builds" class="back" onclick="event.preventDefault();TL.Router.navigate('/builds')">← 返回 Build 列表</a>
    <div class="bd-header">
      <div>
        <div class="bd-name">${emoji} ${b.wp}</div>
        <div style="font-size:13px;color:var(--text-dim);margin-top:4px">${b.role} · 操作难度${b.difficulty} · ${emoji} ${weatherCN}体系</div>
      </div>
      <div class="bd-rating">
        <div class="tag tag-${b.tier.toLowerCase()}" style="font-size:13px;padding:4px 12px">Tier ${b.tier}</div>
        <div class="bd-score">${b.tier==='S'?9.5:b.tier==='A'?8.2:7.0}</div>
      </div>
    </div>
    <div class="bd-overview">${b.overview}</div>
    <div class="bd-grid">
      <div class="bd-section">
        <div class="bd-section-title">优点 & 缺点</div>
        <div class="pros-cons">
          <div class="pros"><strong>✅ 优势</strong>${b.pros.map(p=>'<div>• '+p+'</div>').join('')}</div>
          <div class="cons"><strong>❌ 劣势</strong>${b.cons.map(c=>'<div>• '+c+'</div>').join('')}</div>
        </div>
      </div>
      <div class="bd-section">
        <div class="bd-section-title">⚡ 技能连招</div>
        <div class="rotation-box">${b.combo}</div>
      </div>
      <div class="bd-section">
        <div class="bd-section-title">🎮 打法详解</div>
        <div style="font-size:13px;color:var(--text-dim);line-height:1.7">${b.tip}</div>
      </div>
      <div class="bd-section">
        <div class="bd-section-title">🛡️ 推荐装备</div>
        ${b.gear.map(g=>`
          <div class="gear-item">
            <span class="gi-icon">${g.icon}</span>
            <span class="gi-name">${g.name}</span>
            <span class="gi-desc">${g.desc||''}</span>
          </div>
        `).join('')}
      </div>
      <div class="bd-section">
        <div class="bd-section-title">🌤️ 天气策略</div>
        <div style="font-size:13px;color:var(--text-dim);line-height:1.7;padding:12px 14px;background:rgba(8,3,18,.6);border-radius:8px;border:1px solid var(--border)">
          <div style="margin-bottom:6px"><strong style="color:var(--text)">${emoji} ${weatherCN} — ${wEffect}</strong></div>
          <div>${b.weatherAdvice||wDesc}</div>
        </div>
      </div>
    </div>
  </div>`;
}
TL.Router && TL.Router.register('build',render);
})();
