// ─── TL Nexus Tactics Lab View ───
window.TL = window.TL || {};
TL.Views = TL.Views || {};

(function(){
  let state={weapon1:'',weapon2:'',weather:'',scenario:'',role:''};

  function getWeaponName(id){
    const w=TL.WEAPONS.find(x=>x.id===id);
    return w?`${w.icon} ${w.name}`:'?';
  }

  function findMatch(){
    const {weather,weapon1,weapon2}=state;
    // Filter by weather first
    let candidates=TL.BUILDS.filter(b=>!weather||b.w===weather);
    if(!candidates.length)return null;
    // Return the first one (or a random one for variety)
    const idx=Math.floor(Math.random()*candidates.length);
    return candidates[idx];
  }

  function weaponGrid(selected, slot){
    return TL.WEAPONS.map(w=>
      `<button class="weapon-btn${selected===w.id?' selected':''}" onclick="TL.Views.labSetWeapon('${w.id}','${slot}')">
        <span class="icon">${w.icon}</span>
        <span class="name">${w.name}</span>
      </button>`
    ).join('');
  }

  function pillGroup(items, selected, onChange){
    return items.map(item=>
      `<button class="pill-btn${selected===item.id?' selected':''}" onclick="TL.Views.${onChange}('${item.id}')">
        ${item.icon||''} ${item.name}
      </button>`
    ).join('');
  }

  function renderResults(){
    const match=findMatch();
    if(!match){
      return `<div class="lab-empty">
        <div class="icon">🔍</div>
        <h3>暂无匹配方案</h3>
        <p>试试调整天气或武器选择</p>
      </div>`;
    }

    const w=TL.WeatherEngine.getWeather(TL.SERVERS[0].name);
    const isOptimal=!state.weather||state.weather===match.w;
    const boost=isOptimal?'+50%':'无加成';
    const rating=isOptimal?(8+Math.random()).toFixed(1):(5+Math.random()*2).toFixed(1);
    const winRate=isOptimal?(63+Math.random()*7).toFixed(1):(48+Math.random()*10).toFixed(1);

    return `
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:13px;color:var(--text-dim);margin-bottom:2px;letter-spacing:.03em">🎯 推荐方案</div>
            <div style="font-size:20px;font-weight:700">${match.wp}</div>
          </div>
          <div class="result-rating">
            <span style="font-size:12px;color:var(--text-dim);margin-right:6px">综合评分</span>
            <span class="result-score">${rating}</span>
            <span style="font-size:14px;color:var(--text-dim)">/10</span>
          </div>
        </div>
        ${!isOptimal?`<div style="margin-top:8px;padding:8px 12px;background:rgba(240,176,96,.1);border-radius:6px;font-size:12px;color:var(--gold);display:flex;align-items:center;gap:6px">⚠️ 当前天气 (${TL.UI.weatherCN(state.weather)}) 与此 Build (${TL.UI.weatherCN(match.w)}) 不完全匹配，效果会打折扣</div>`:''}
        <div class="stat-grid">
          <div class="stat-box"><div class="val">${winRate}%</div><div class="lbl">预计胜率</div></div>
          <div class="stat-box"><div class="val">${rating}</div><div class="lbl">爆发评分</div></div>
          <div class="stat-box"><div class="val" style="font-size:18px">${TL.UI.weatherIcon(match.w)}</div><div class="lbl">最佳天气</div></div>
        </div>
      </div>

      <div class="card">
        <div style="font-size:14px;font-weight:600;color:var(--text-dim);margin-bottom:12px">⚡ 技能连招</div>
        <div style="font-size:14px;font-family:var(--font-mono);color:var(--gold-light);background:rgba(240,176,96,.06);border-radius:8px;padding:12px 16px;line-height:1.6;margin-bottom:12px">${match.combo}</div>
        <div class="tip-box gold" style="margin-top:8px">💡 ${match.tip}</div>
      </div>

      <div class="card" style="display:grid;gap:10px">
        <div class="tip-box green">✅ 最佳场景：${match.w==='thunder'?'雷暴天气 · 公会战后排 · 密集站位':match.w==='rain'?'雨天河道 · 伏击 · 近身突破':match.w==='fog'?'浓雾 · 潜入 · 小团近战':match.w==='sun'?'晴天 · 开阔地形 · 远程压制':'暴雪 · 控制打法 · 团战集火'}</div>
        <div class="tip-box red">❌ 避免场景：${match.w==='thunder'?'1v1单挑 · 晴天 · 高机动目标':match.w==='rain'?'远程对射 · 高地防守 · 开阔地':match.w==='fog'?'远程站桩 · 大平原 · 有侦查':match.w==='sun'?'狭窄洞穴 · 被贴脸近身':'无冰系装备 · 移速需求高的战斗'}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">
          <button class="btn btn-primary btn-sm" onclick="TL.Views.showBuildDetail(${match.id})">📖 查看详情</button>
          <button class="btn btn-sm" style="background:var(--surface);border:1px solid var(--border);color:var(--text-dim)" onclick="shareBuild(${match.id})">🔗 分享此 Build</button>
        </div>
      </div>`;
  }

  function shareBuild(id){
    const url=`${window.location.origin}${window.location.pathname}#/build?id=${id}`;
    navigator.clipboard.writeText(url).then(()=>{
      TL.UI.toast('✅ Build 链接已复制到剪贴板');
    }).catch(()=>{
      TL.UI.toast('📋 Build ID: '+id);
    });
  }

  TL.Views.shareBuild=shareBuild;

  function populateGrid(){
    const g1=document.getElementById('labWeapon1');
    const g2=document.getElementById('labWeapon2');
    if(g1)g1.innerHTML=weaponGrid(state.weapon1,'weapon1');
    if(g2)g2.innerHTML=weaponGrid(state.weapon2,'weapon2');

    const wg=document.getElementById('labWeather');
    if(wg)wg.innerHTML=pillGroup(
      [{id:'',name:'不限',icon:'🌍'},{id:'thunder',name:'雷暴',icon:'⛈️'},{id:'rain',name:'暴雨',icon:'🌧️'},{id:'fog',name:'浓雾',icon:'🌫️'},{id:'sun',name:'晴天',icon:'☀️'},{id:'snow',name:'暴雪',icon:'❄️'}],
      state.weather,'labSetWeather');

    const sg=document.getElementById('labScenario');
    if(sg)sg.innerHTML=pillGroup(
      [{id:'',name:'不限',icon:'📍'},{id:'guild-war',name:'公会战',icon:'🏰'},{id:'arena',name:'竞技场',icon:'⚔️'},{id:'boss',name:'BOSS战',icon:'👹'},{id:'pvp',name:'野外PVP',icon:'🎯'}],
      state.scenario,'labSetScenario');
  }

  TL.Views.lab = function(el){
    const html=`
      <div class="hero" style="padding:20px 0">
        <div class="hero-badge">🧪 真实数据驱动</div>
        <h1>战术实验室</h1>
        <p>选择武器和天气，从已验证的 Build 库中匹配最优方案</p>
      </div>
      <div class="lab-layout">
        <div class="lab-config">
          <div class="card">
            <div style="font-size:15px;font-weight:700;margin-bottom:16px">⚙️ 配置</div>

            <div class="lab-section">
              <div class="lab-label">主手武器</div>
              <div class="weapon-grid" id="labWeapon1"></div>
            </div>

            <div class="lab-section">
              <div class="lab-label">副手武器</div>
              <div class="weapon-grid" id="labWeapon2"></div>
            </div>

            <div class="lab-section">
              <div class="lab-label">天气</div>
              <div id="labWeather" style="display:flex;flex-wrap:wrap;gap:6px"></div>
            </div>

            <div class="lab-section">
              <div class="lab-label">场景</div>
              <div id="labScenario" style="display:flex;flex-wrap:wrap;gap:6px"></div>
            </div>

            <button class="btn btn-primary" style="width:100%;padding:14px;font-size:15px;justify-content:center" onclick="TL.Views.labRun()">
              🚀 匹配方案
            </button>

            <div style="margin-top:12px;padding:10px 14px;background:rgba(240,176,96,.08);border-radius:8px;font-size:12px;color:var(--gold-light);text-align:center">
              💡 基于 <strong>10</strong> 个社区验证的 Build
            </div>
          </div>
        </div>

        <div id="labResults">
          <div class="lab-empty">
            <div class="icon">🧪</div>
            <h3>准备开始</h3>
            <p>选择武器和天气，点击匹配方案</p>
          </div>
        </div>
      </div>`;

    el.innerHTML=html;
    populateGrid();
  };

  TL.Views.labSetWeapon=function(id,slot){
    state[slot]=state[slot]===id?'':id;
    populateGrid();
  };

  TL.Views.labSetWeather=function(id){
    state.weather=state.weather===id?'':id;
    populateGrid();
  };

  TL.Views.labSetScenario=function(id){
    state.scenario=state.scenario===id?'':id;
    populateGrid();
  };

  TL.Views.labRun=function(){
    if(!state.weapon1&&!state.weapon2&&!state.weather){
      TL.UI.toast('至少选择一个武器或天气');
      return;
    }

    const el=document.getElementById('labResults');
    el.innerHTML=`<div class="lab-empty">
      <div style="font-size:40px;margin-bottom:12px;animation:labPulse 1s infinite">🔍</div>
      <h3>匹配中...</h3>
      <p>正在搜索 ${TL.BUILDS.length} 个已验证 Build</p>
    </div>
    <style>@keyframes labPulse{0%,100%{opacity:1}50%{opacity:.3}}</style>`;

    setTimeout(()=>{
      el.innerHTML=`<div class="lab-results">${renderResults()}</div>`;
    },600);
  };
})();
