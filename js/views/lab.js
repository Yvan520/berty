// ─── Build Lab View ───
(function(){'use strict';
function render(view){
  const WEPS=TL.WEAPONS;
  WEMS=WEPS;
  view.innerHTML=`<div class="view">
    <div class="section-header">🔬 Build 模拟器 <span class="dim">— 搭配你的专属流派</span></div>
    <div class="lab-layout">
      <div class="lab-config">
        <div class="lab-section">
          <div class="lab-label">主手武器</div>
          <div class="weapon-grid" id="labMain">${WEPS.map(w=>`
            <div class="weapon-btn" data-w="${w.id}" onclick="selectMain('${w.id}')">
              <span class="icon">${w.icon}</span>
              <span class="name">${w.name}</span>
            </div>
          `).join('')}</div>
        </div>
        <div class="lab-section">
          <div class="lab-label">副手武器</div>
          <div class="weapon-grid" id="labOff">${WEPS.map(w=>`
            <div class="weapon-btn" data-w="${w.id}" onclick="selectOff('${w.id}')">
              <span class="icon">${w.icon}</span>
              <span class="name">${w.name}</span>
            </div>
          `).join('')}</div>
        </div>
        <div class="lab-section">
          <div class="lab-label">当前天气</div>
          <select id="labWeather" onchange="updateLab()" style="width:100%;background:rgba(8,3,18,.6);border:1px solid var(--border);border-radius:6px;padding:8px 10px;color:var(--text);font-size:12px;font-family:var(--font)">
            ${Object.entries(TL.WEATHERS).map(([k,v])=>`<option value="${k}">${v} ${TL.WEATHER_CN[k]}</option>`).join('')}
          </select>
        </div>
        <button class="btn btn-gold" style="width:100%;justify-content:center;margin-top:6px" onclick="findSimilar()">🔍 匹配已有推荐</button>
      </div>
      <div>
        <div class="card" style="min-height:200px">
          <div id="labResult" style="text-align:center;color:var(--text-dim);padding:40px 0;font-size:14px">
            选择主副武器查看推荐
          </div>
        </div>
      </div>
    </div>
  </div>`;
  let mainW=null, offW=null;
  window.selectMain=function(id){
    document.querySelectorAll('#labMain .weapon-btn').forEach(b=>b.classList.toggle('selected',b.dataset.w===id));
    mainW=id;
    if(mainW&&offW)updateLab();
  };
  window.selectOff=function(id){
    document.querySelectorAll('#labOff .weapon-btn').forEach(b=>b.classList.toggle('selected',b.dataset.w===id));
    offW=id;
    if(mainW&&offW)updateLab();
  };
  window.updateLab=function(){
    if(!mainW||!offW)return;
    const el=document.getElementById('labResult');
    const w=document.getElementById('labWeather').value;
    const mIcon=WEPS.find(x=>x.id===mainW)?.icon||'';
    const oIcon=WEPS.find(x=>x.id===offW)?.icon||'';
    const mName=WEPS.find(x=>x.id===mainW)?.name||'';
    const oName=WEPS.find(x=>x.id===offW)?.name||'';
    el.innerHTML=`<div style="text-align:left">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border)">
        <span style="font-size:28px">${mIcon} ${oIcon}</span>
        <div><div style="font-weight:600;font-size:16px">${mName} + ${oName}</div>
        <div style="font-size:12px;color:var(--text-dim)">天气：${TL.WEATHERS[w]} ${TL.WEATHER_CN[w]}</div></div>
      </div>
      <div style="font-size:13px;color:var(--text-dim);line-height:1.7;margin-bottom:12px">
        <strong style="color:var(--text)">建议打法：</strong>
        ${mName}主打${mainW.includes('bow')||mainW.includes('crossbow')||mainW.includes('staff')?'远程':'近战'}输出，
        ${oName}提供${offW.includes('shield')||offW.includes('horn')?'防御和辅助':'副手爆发'}。
        ${w==='thunder'?'雷暴天优先雷系技能。':w==='rain'?'雨天注意利用河道和隐蔽路线。':w==='fog'?'浓雾天近战优势，拉近距离打。':w==='snow'?'暴雪天冰系控场是核心。':'晴天视野好，保持距离风筝。'}
      </div>
      <div style="background:rgba(240,176,96,.06);border-radius:8px;padding:12px;font-size:12px;color:var(--gold-light);line-height:1.6">
        ⚡ 这个组合尚未被录入攻略库。<br>
        如果想贡献这个 Build 的完整攻略，请在 Discord 中提交！
      </div>
    </div>`;
  };
  window.findSimilar=function(){
    const w=document.getElementById('labWeather').value;
    const matches=TL.BUILDS.filter(b=>b.w===w);
    if(!matches.length){TL.UI.toast('该天气暂无收录的 Build');return}
    TL.Router.navigate('/build?id='+matches[0].id);
  };
}
TL.Router && TL.Router.register('lab',render);
})();
