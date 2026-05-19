// ─── TL Nexus Router ───
window.TL = window.TL || {};

TL.cleanup = function(){
  if(TL.Views && TL.Views._intervals){
    TL.Views._intervals.forEach(id=>clearInterval(id));
    TL.Views._intervals=[];
  }
};

TL.Router = {
  currentView: null,
  views: {},
  navLinks: null,

  register(name, fn){this.views[name]=fn},

  init(){
    this.navLinks=document.querySelectorAll('[data-nav]');
    window.addEventListener('hashchange',()=>this.resolve());
    this.resolve();
  },

  resolve(){
    const hash=window.location.hash.slice(1)||'/';
    const parts=hash.split('?');
    const path=parts[0];
    const params=Object.fromEntries(new URLSearchParams(parts[1]||''));
    let view;
    if(path==='/')view='home';
    else if(path==='/builds')view='builds';
    else if(path==='/build')view='build';
    else if(path==='/tierlist')view='tierlist';
    else if(path==='/lab')view='lab';
    else if(path==='/weather')view='weather';
    else view='home';
    this.render(view,params);
  },

  render(name, params){
    if(this.currentView===name)return;
    if(typeof TL.cleanup==='function')TL.cleanup();
    this.currentView=name;
    const container=document.getElementById('view');
    const fn=this.views[name];
    if(!fn){container.innerHTML='<div class="view"><div class="empty-state"><div class="e">404</div><p>页面不存在</p></div></div>';return}
    container.innerHTML='<div class="view"></div>';
    const viewEl=container.querySelector('.view');
    fn(viewEl,params);
    this.navLinks.forEach(link=>{
      const href=link.getAttribute('href')||'';
      const isActive=href==='#/'+name||(name==='home'&&href==='#/');
      link.classList.toggle('active',isActive);
    });
    const mobileNav=document.getElementById('navLinks');
    if(mobileNav)mobileNav.classList.remove('open');
  },

  navigate(path){window.location.hash='#'+path}
};
