// ─── TL Nexus UI + Weather Engine ───
window.TL = window.TL || {};
TL.UI = TL.UI || {};

// Toast
TL.UI.toast = function(msg){
  const t=document.getElementById('toast');
  if(!t)return;
  t.textContent=msg;
  t.classList.add('show');
  clearTimeout(t._hide);
  t._hide=setTimeout(()=>t.classList.remove('show'),2500);
};

// Weather engine
TL.getCurrentWeather = function(serverName){
  const svr=TL.SERVERS.find(s=>s.name===serverName);
  const now=new Date();
  const utc=now.getTime()+now.getTimezoneOffset()*60000;
  const local=new Date(utc+(svr?svr.offset:0)*3600000);
  const totalMin=local.getHours()*60+local.getMinutes();
  const cycle=svr?svr.cycleMin:120;
  const start=svr?svr.cycleStart*60:8*60;
  const elapsed=(totalMin-start+1440)%1440;
  const phase=Math.floor(elapsed/cycle);
  const weathers=['sun','rain','fog','thunder','snow','sun','rain'];
  return weathers[phase%weathers.length]||'sun';
};

// Render sidebar weather
window.renderSidebarWeather = function(){
  const el=document.getElementById('sidebarWeather');
  const sel=document.getElementById('sidebarServer');
  if(!el||!sel)return;
  const svr=sel.value;
  const w=TL.getCurrentWeather(svr);
  const emoji=TL.WEATHERS[w];
  const cn=TL.WEATHER_CN[w];
  const eff=TL.WEATHER_EFFECT[w];
  const svrObj=TL.SERVERS.find(s=>s.name===svr);
  const now=new Date();
  const utc=now.getTime()+now.getTimezoneOffset()*60000;
  const local=new Date(utc+(svrObj?svrObj.offset:0)*3600000);
  const cycle=svrObj?svrObj.cycleMin:120;
  const start=svrObj?svrObj.cycleStart*60:8*60;
  const totalMin=local.getHours()*60+local.getMinutes();
  const elapsed=(totalMin-start+1440)%1440;
  const phase=Math.floor(elapsed/cycle);
  const nextIn=((phase+1)*cycle-elapsed%cycle+1440)%1440;
  const nextH=Math.floor(nextIn/60);
  const nextM=nextIn%60;
  document.getElementById('sidebarEmoji').textContent=emoji;
  document.getElementById('sidebarWeatherName').textContent='当前：'+cn;
  document.getElementById('sidebarTimer').textContent='下次变化：'+nextH+'h'+nextM+'m后';
  document.getElementById('sidebarTip').textContent='☝ '+eff;
};

// Render sidebar top builds
function renderSidebarBuilds(){
  const el=document.getElementById('sidebarTopBuilds');
  if(!el)return;
  TL.TIER_S.forEach(b=>{
    const d=document.createElement('div');
    d.className='sb-build';
    d.innerHTML=`${TL.WEATHERS[b.w]} ${b.wp.split('+')[0].trim()}`;
    d.onclick=()=>TL.Router.navigate('/build?id='+b.id);
    el.appendChild(d);
  });
}

// Init sidebar when DOM ready
document.addEventListener('DOMContentLoaded',function initSidebar(){
  renderSidebarWeather();
  renderSidebarBuilds();
  setInterval(renderSidebarWeather,60000);
});

// Nav toggle
document.addEventListener('DOMContentLoaded',function(){
  const toggle=document.getElementById('navToggle');
  const links=document.getElementById('navLinks');
  if(toggle&&links)toggle.onclick=()=>links.classList.toggle('open');
});
