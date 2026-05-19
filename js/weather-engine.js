// ─── TL Nexus Weather Engine ───
window.TL = window.TL || {};

TL.WeatherEngine = {
  CYCLE: ['thunder','rain','fog','sun'],

  getServer(name){
    return TL.SERVERS.find(s=>s.name===name);
  },

  getWeather(name){
    const s=this.getServer(name);
    if(!s)return{weather:'sun',remaining:0,idx:0};
    const start=Date.UTC(2026,4,19,s.cycleStart,0,0,0);
    const elapsed=(Date.now()-start)/60000;
    const total=this.CYCLE.length*s.cycleMin;
    const pos=((elapsed%total)+total)%total;
    const idx=Math.floor(pos/s.cycleMin);
    const rem=Math.floor(s.cycleMin-pos%s.cycleMin);
    return{weather:this.CYCLE[idx],remaining:rem,idx};
  },

  getCycle(name){
    const s=this.getServer(name);
    if(!s)return[];
    const start=Date.UTC(2026,4,19,s.cycleStart,0,0,0);
    const elapsed=(Date.now()-start)/60000;
    const total=4*s.cycleMin;
    const pos=((elapsed%total)+total)%total;
    const ci=Math.floor(pos/s.cycleMin);
    const segs=[];
    for(let i=0;i<4;i++){
      segs.push({weather:this.CYCLE[(ci+i)%4],active:i===0});
    }
    return segs;
  },

  getTime(name){
    const s=this.getServer(name);
    if(!s)return'--:--';
    const d=new Date(Date.now()+s.offset*3600000);
    return`${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`;
  },

  getLocalTime(){
    const d=new Date();
    return`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }
};
