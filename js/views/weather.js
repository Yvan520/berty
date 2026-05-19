// ─── Weather View ───
(function(){'use strict';
function render(view){
  const W=TL.WEATHERS, WC=TL.WEATHER_CN, WE=TL.WEATHER_EFFECT, WD=TL.WEATHER_DESC;
  const svr=TL.SERVERS;
  let rows='';
  svr.forEach(s=>{
    const w=TL.getCurrentWeather(s.name);
    const emoji=W[w];
    const cn=WC[w];
    const eff=WE[w];
    const desc=WD[w];
    rows+=`
      <div class="card" style="margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:32px">${emoji}</span>
          <div style="flex:1">
            <div style="font-weight:600">${s.flag} ${s.name}</div>
            <div style="font-size:13px;color:var(--gold-light)">${cn} — ${eff}</div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--text-dim);margin-top:8px;line-height:1.6">${desc.slice(0,100)}…</div>
      </div>`;
  });
  view.innerHTML=`<div class="weather-page view">
    <div class="section-header">☁️ 全球天气 <span class="dim">— 8小时轮播 · 实时更新</span></div>
    ${rows}
    <div class="card" style="margin-top:16px;font-size:12px;color:var(--text-dim);line-height:1.7">
      <strong style="color:var(--text)">🌤️ 天气机制说明</strong><br>
      游戏内天气每2小时轮换一次（共4种：晴天/暴雨/浓雾/雷暴/暴雪），不同天气影响技能和视野。<br>
      攻略站根据服务器所在地时区推算当前天气，方便你提前规划战斗策略。
    </div>
  </div>`;
}
TL.Router && TL.Router.register('weather',render);
})();
