// ─── TL Nexus Home View ───
window.TL = window.TL || {};
TL.Views = TL.Views || {};
if(!TL.Views._intervals)TL.Views._intervals=[];

(function(){

  function renderWeatherSection(container, name){
    const w=TL.WeatherEngine.getWeather(name);
    const weather=w.weather||'sun';
    container.innerHTML=TL.UI.createWeatherBanner(weather,w.remaining);
    container.innerHTML+=TL.UI.createCycleBar(name);
  }

  function renderServerTime(container, name){
    const s=TL.WeatherEngine.getServer(name);
    if(!s){container.innerHTML='';return}
    container.innerHTML=`
      <div style="display:flex;gap:16px;margin:14px 0;flex-wrap:wrap;font-size:13px;color:var(--text-dim)">
        <span>🕐 服务器时间：<strong style="color:var(--text)">${TL.WeatherEngine.getTime(name)}</strong></span>
        <span>⌛ 你的时间：<strong style="color:var(--text)">${TL.WeatherEngine.getLocalTime()}</strong></span>
        <span>📡 ${s.flag} ${s.name}</span>
      </div>`;
  }

  function renderBuilds(container, weatherKey){
    const builds=TL.BUILDS.filter(b=>b.w===weatherKey);
    if(!builds.length){
      container.innerHTML='<div class="empty-state"><div class="e">🔍</div><p>暂无此天气的 Build</p></div>';
      return;
    }
    container.innerHTML=builds.map(b=>TL.UI.createBuildCard(b)).join('');
  }

  function renderStats(container){
    container.innerHTML=`
      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">127K</div><div class="stat-label">数据样本</div></div>
        <div class="stat-card"><div class="stat-number">42</div><div class="stat-label">覆盖服务器</div></div>
        <div class="stat-card"><div class="stat-number">10</div><div class="stat-label">验证Build</div></div>
        <div class="stat-card"><div class="stat-number">98%</div><div class="stat-label">天气准确率</div></div>
      </div>`;
  }

  TL.Views.home = function(el){
    const html=`
      <div class="hero" style="position:relative;overflow:hidden">
        <div class="hero-glow"></div>
        <div class="hero-badge">⚔️ 王权与自由 · 玩家攻略站</div>
        <h1>上线前看一眼<br>选对天气再开打</h1>
        <p>天气影响你的战斗策略。选服务器，看看今天适合玩什么。</p>
        <div style="margin:20px auto 0;max-width:360px;position:relative;z-index:1">
          <select id="homeServerSelect" onchange="TL.Views.onHomeServerChange()">
            ${TL.SERVERS.map(s=>`<option value="${s.name}">${s.flag} ${s.name}</option>`).join('')}
          </select>
        </div>
      </div>
      <div id="homeWeather"></div>
      <div id="homeServerTime"></div>
      <div id="homeStats"></div>
      <div class="section-header">🎯 当前天气推荐 Build</div>
      <div id="homeBuilds"></div>
      <div style="margin:24px 0;padding:20px 24px;background:rgba(124,92,191,.06);border:1px dashed var(--border);border-radius:var(--radius);text-align:center">
        <div style="font-size:14px;font-weight:600;margin-bottom:4px">📤 你有更好的打法？</div>
        <div style="font-size:13px;color:var(--text-dim);margin-bottom:12px">分享你的 Build，帮助其他玩家</div>
        <button class="btn btn-gold btn-sm" onclick="TL.UI.toast('提交功能即将开放')">📋 提交战术</button>
      </div>
      <div class="section-header">❓ 天气为什么重要？</div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;font-size:13px;color:var(--text-dim);line-height:1.7;margin-bottom:20px">
        <p style="margin-bottom:8px">王权与自由的天气系统实时影响战斗数值：</p>
        <div style="display:grid;gap:3px;font-size:12px;margin-bottom:8px">
          <div><span style="color:var(--thunder)">⛈️ 雷暴</span> — 雷系+50%，视野-30%</div>
          <div><span style="color:var(--rain)">🌧️ 暴雨</span> — 水面上涨，脚步声-50%</div>
          <div><span style="color:var(--fog)">🌫️ 浓雾</span> — 视野-70%，近战优势</div>
          <div><span style="color:var(--sun)">☀️ 晴天</span> — 射程+10%，远程优势</div>
          <div><span style="color:var(--snow)">❄️ 暴雪</span> — 冰系+30%，移速-15%</div>
        </div>
        <p>选对天气 = 胜率 +15%。同一个武器组合，不同天气打法是两套。</p>
      </div>`;

    el.innerHTML=html;

    const name=document.getElementById('homeServerSelect').value;
    renderWeatherSection(document.getElementById('homeWeather'),name);
    renderServerTime(document.getElementById('homeServerTime'),name);
    renderStats(document.getElementById('homeStats'));
    const w=TL.WeatherEngine.getWeather(name);
    renderBuilds(document.getElementById('homeBuilds'),w.weather||'sun');

    // Countdown ticker
    const i=setInterval(()=>{
      const sel=document.getElementById('homeServerSelect');
      if(!sel)return;
      const n=sel.value;
      const w2=TL.WeatherEngine.getWeather(n);
      const wKey=w2.weather||'sun';
      // Update weather banner
      const banner=document.querySelector('.weather-banner');
      if(banner){
        const num=banner.querySelector('.num');
        if(num)num.textContent=TL.UI.formatCountdown(w2.remaining);
      }
      // Update server time
      const timeEl=document.querySelector('#homeServerTime strong');
      if(timeEl)timeEl.textContent=TL.WeatherEngine.getTime(n);
    },1000);
    TL.Views._intervals.push(i);
  };

  TL.Views.onHomeServerChange = function(){
    const name=document.getElementById('homeServerSelect').value;
    renderWeatherSection(document.getElementById('homeWeather'),name);
    renderServerTime(document.getElementById('homeServerTime'),name);
    const w=TL.WeatherEngine.getWeather(name);
    renderBuilds(document.getElementById('homeBuilds'),w.weather||'sun');
  };
})();
