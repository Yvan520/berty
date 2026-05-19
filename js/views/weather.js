// ─── TL Nexus Weather Center View ───
window.TL = window.TL || {};
TL.Views = TL.Views || {};
if(!TL.Views._intervals)TL.Views._intervals=[];

(function(){

  function renderServerList(container){
    const rows=TL.SERVERS.map(s=>{
      const w=TL.WeatherEngine.getWeather(s.name);
      const weather=w.weather||'sun';
      const time=TL.WeatherEngine.getTime(s.name);
      const emoji=TL.UI.weatherIcon(weather);
      const cn=TL.UI.weatherCN(weather);
      return `
        <div class="server-card-compact">
          <div class="flag">${s.flag}</div>
          <div class="info">
            <div class="srv-name">${s.name}</div>
            <div class="srv-time">🕐 ${time} · UTC${s.offset>=0?'+':''}${s.offset}</div>
          </div>
          <div class="weather-badge ${weather}">${emoji} ${cn}</div>
        </div>`;
    }).join('');
    container.innerHTML=rows;
  }

  function renderDetail(container, name){
    const w=TL.WeatherEngine.getWeather(name);
    const weather=w.weather||'sun';
    const desc=TL.UI.weatherDesc(weather);

    container.innerHTML=`
      <div style="margin-bottom:16px">${TL.UI.createWeatherBanner(weather,w.remaining)}</div>
      <div style="margin-bottom:12px">${TL.UI.createCycleBar(name)}</div>
      <div class="card">
        <div style="font-size:14px;font-weight:600;color:var(--text-dim);margin-bottom:8px">🌍 天气详解</div>
        <div style="font-size:13px;color:var(--text-dim);line-height:1.7">${desc}</div>
      </div>`;
  }

  TL.Views.weather = function(el){
    const defaultServer=TL.SERVERS[0].name;

    const html=`
      <div class="hero" style="padding:20px 0">
        <div class="hero-badge">☁️ 实时数据</div>
        <h1>气象中心</h1>
        <p>全球服务器实时天气与预测</p>
      </div>

      <div class="section-header">📡 所有服务器当前天气</div>
      <div id="weatherServerList"></div>

      <div class="section-header">🔍 查看详情</div>
      <div style="margin-bottom:14px">
        <select id="weatherServerSelect" onchange="TL.Views.onWeatherServerChange()">
          ${TL.SERVERS.map(s=>`<option value="${s.name}">${s.flag} ${s.name}</option>`).join('')}
        </select>
      </div>
      <div id="weatherDetail"></div>

      <div class="section-header">📖 天气系统说明</div>
      <div class="card" style="display:grid;gap:12px">
        <div style="font-size:13px;line-height:1.6;color:var(--text-dim)">
          <p>TL 的天气以 <strong>8 小时为一个完整轮播周期</strong>：</p>
          <div style="display:flex;gap:8px;margin:10px 0;flex-wrap:wrap">
            <span style="padding:4px 12px;border-radius:6px;background:rgba(217,75,75,.15);color:var(--thunder);font-size:12px">⛈️ 雷暴</span>
            <span style="padding:4px 12px;border-radius:6px;background:rgba(91,141,217,.15);color:var(--rain);font-size:12px">🌧️ 暴雨</span>
            <span style="padding:4px 12px;border-radius:6px;background:rgba(138,155,168,.15);color:var(--fog);font-size:12px">🌫️ 浓雾</span>
            <span style="padding:4px 12px;border-radius:6px;background:rgba(232,168,48,.15);color:var(--sun);font-size:12px">☀️ 晴天</span>
          </div>
          <p>每种天气持续 <strong>2 小时</strong>，然后切换到下一种。<br>
          同一服务器所有玩家体验到的天气是同步的。<br>
          不同服务器的轮播起始时间略有偏移。</p>
        </div>
      </div>`;

    el.innerHTML=html;

    renderServerList(document.getElementById('weatherServerList'));
    renderDetail(document.getElementById('weatherDetail'),defaultServer);

    if(tickInterval)clearInterval(tickInterval);
    tickInterval=setInterval(()=>{
      const name=document.getElementById('weatherServerSelect')?.value||defaultServer;
      renderDetail(document.getElementById('weatherDetail'),name);
      renderServerList(document.getElementById('weatherServerList'));
    },1000);
    TL.Views._intervals.push(tickInterval);
  };

  TL.Views.onWeatherServerChange=function(){
    const name=document.getElementById('weatherServerSelect').value;
    renderDetail(document.getElementById('weatherDetail'),name);
  };
})();
