
(function(){
const W = ["sun","rain","fog","thunder","snow"];
const CN = {"sun":"晴天","rain":"暴雨","fog":"浓雾","thunder":"雷暴","snow":"暴雪"};
const EMOJI = {"sun":"☀️","rain":"🌧️","fog":"🌫️","thunder":"⛈️","snow":"❄️"};
const DESC = {"sun":"视野最佳，远程射程+10%。适合风筝和狙击流派。","rain":"水面上升，脚步声降低50%。刺客和河道作战有加成。","fog":"视野-70%，远程失效。近战和刺客的黄金天气。","thunder":"雷系伤害+50%，视野-30%。法师爆发期。","snow":"冰系控制延长30%，移速-15%。控制流派优势。"};
const SVRS = [
  {name:'美服 Throne Peak',tz:-7},{name:'美服 Eclipse Ridge',tz:-5},
  {name:'欧服 Castle Dawn',tz:1},{name:'欧服 Stormwind Valley',tz:0},
  {name:'韩服 Dragon Valley',tz:9},{name:'日服 Sakura Realm',tz:9},
  {name:'东南亚 Jade Tiger',tz:7},
];
function calc(i){const d=new Date(),u=d.getTime()+d.getTimezoneOffset()*6e4,l=new Date(u+i*36e5),t=l.getHours()*60+l.getMinutes();return W[Math.floor(t/120)%W.length]}
window.renderWeather=function(){const s=document.getElementById('wSvr'),r=document.getElementById('wResult'),w=calc(SVRS[s.selectedIndex].tz);r.innerHTML='<div style="display:flex;align-items:center;gap:12px;padding:16px 0"><span style="font-size:36px">'+EMOJI[w]+'</span><div><div style="font-size:18px;font-weight:700">'+CN[w]+'</div><div style="font-size:13px;color:#9888b0">'+DESC[w]+'</div></div></div>'};
document.addEventListener('DOMContentLoaded',function(){renderWeather();setInterval(renderWeather,6e4)});
})();