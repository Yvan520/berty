// ─── TL Nexus Router ───
window.TL = window.TL || {};

// Global cleanup — clears all registered intervals when switching views
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

  register(name, renderFn){
    this.views[name]=renderFn;
  },

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
    else if(path==='/lab')view='lab';
    else if(path==='/weather')view='weather';
    else if(path==='/build')view='build';
    else view='home';

    this.render(view,params);
  },

  render(name, params){
    if(this.currentView===name)return;
    // Cleanup previous view
    if(typeof TL.cleanup==='function')TL.cleanup();
    this.currentView=name;
    const container=document.getElementById('view');
    const fn=this.views[name];
    if(!fn){container.innerHTML='<div class="view"><div class="empty-state"><div class="e">404</div><p>页面不存在</p></div></div>';return}

    container.innerHTML='<div class="view view-enter"></div>';
    const viewEl=container.querySelector('.view');
    fn(viewEl,params);

    this.navLinks.forEach(link=>{
      link.classList.toggle('active',link.getAttribute('href')==='#/'+name||(name==='home'&&link.getAttribute('href')==='#/'));
    });

    // Close mobile nav
    const mobileNav=document.getElementById('navLinks');
    mobileNav.classList.remove('open');
  },

  navigate(path){
    window.location.hash='#'+path;
  }
};
