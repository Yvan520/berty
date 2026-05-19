// ─── TL Nexus App Init ───
(function(){
  function init(){
    // Register views
    TL.Router.register('home', TL.Views.home);
    TL.Router.register('lab', TL.Views.lab);
    TL.Router.register('weather', TL.Views.weather);
    if(TL.Views.build)TL.Router.register('build', TL.Views.build);

    // Start router
    TL.Router.init();

    // Mobile nav toggle
    document.getElementById('navToggle').addEventListener('click',function(){
      document.getElementById('navLinks').classList.toggle('open');
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else {
    init();
  }
})();
