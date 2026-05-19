// ─── TL Nexus UI Components ───
window.TL = window.TL || {};

TL.UI = {
  toast(msg, duration=2500){
    const el=document.getElementById('toast');
    el.textContent=msg;
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer=setTimeout(()=>el.classList.remove('show'),duration);
  },

  weatherIcon(w){
    return TL.WEATHERS[w]||'🌤️';
  },

  weatherCN(w){
    return TL.WEATHER_CN[w]||'未知';
  },

  weatherEffect(w){
    return TL.WEATHER_EFFECT[w]||'';
  },

  weatherDesc(w){
    return TL.WEATHER_DESC[w]||'';
  },

  formatTime(mins){
    return `${String(Math.floor(mins/60)).padStart(2,'0')}:${String(mins%60).padStart(2,'0')}`;
  },

  formatCountdown(seconds){
    const m=Math.floor(seconds/60);
    const s=seconds%60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  },

  createWeatherBanner(w, remaining){
    const weather=w||'sun';
    const emoji=this.weatherIcon(weather);
    const cn=this.weatherCN(weather);
    const effect=this.weatherEffect(weather);
    const timeStr=this.formatCountdown(remaining);

    return `
      <div class="weather-banner ${weather}">
        <div class="weather-row">
          <div class="weather-emoji">${emoji}</div>
          <div class="weather-info">
            <div class="weather-name">${cn}</div>
            <div class="weather-effect">${effect}</div>
          </div>
          <div class="weather-timer">
            <div class="num">${timeStr}</div>
            <div class="lbl">下次换天</div>
          </div>
        </div>
      </div>`;
  },

  createCycleBar(name){
    const segs=TL.WeatherEngine.getCycle(name);
    if(!segs.length)return'';
    return `<div class="cycle-grid">${segs.map(s=>
      `<div class="cycle-item${s.active?' active':''}">
        <span class="emoji">${this.weatherIcon(s.weather)}</span>
        ${this.weatherCN(s.weather)}
      </div>`
    ).join('')}</div>`;
  },

  createBuildCard(b){
    return `
      <div class="build-card" onclick="TL.Views.showBuildDetail(${b.id})">
        <div class="weather-strip ${b.w}"></div>
        <div class="build-weapons">${b.wp}</div>
        <div class="build-combo">${b.combo}</div>
        <div class="build-tip">${b.tip}</div>
        <div class="build-meta">
          ${b.v?'<span class="build-verified">✓ 已验证</span>':''}
          <span>${b.author}</span>
        </div>
      </div>`;
  },

  buildDetailHTML(b){
    const weatherCN=this.weatherCN(b.w);
    const effect=this.weatherEffect(b.w);
    const icon=this.weatherIcon(b.w);
    return `
      <button class="detail-close" onclick="TL.Views.closeBuildDetail()">✕</button>
      <div style="margin-bottom:16px;display:flex;align-items:center;gap:12px">
        <span style="font-size:32px">${icon}</span>
        <div>
          <div style="font-size:20px;font-weight:700">${b.wp}</div>
          <div style="font-size:13px;color:var(--gold-light)">最佳天气：${weatherCN} · ${effect}</div>
        </div>
      </div>
      <div style="font-size:15px;font-weight:600;color:var(--text-dim);margin-bottom:6px">技能连招</div>
      <div style="font-size:14px;font-family:var(--font-mono);color:var(--gold-light);background:rgba(240,176,96,.08);border-radius:8px;padding:12px 16px;margin-bottom:16px;line-height:1.6">${b.combo}</div>
      <div style="font-size:15px;font-weight:600;color:var(--text-dim);margin-bottom:6px">战术说明</div>
      <div style="font-size:14px;color:var(--text-dim);line-height:1.7;margin-bottom:16px">${b.tip}</div>
      <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-muted)">
        ${b.v?'<span style="display:inline-flex;align-items:center;gap:3px;background:rgba(76,217,139,.12);color:var(--success);padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600">✓ 已验证</span>':''}
        <span>贡献者：${b.author}</span>
      </div>`;
  }
};
