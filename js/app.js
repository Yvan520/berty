// ─── TL Nexus App Bootstrap ───
(function(){
  function init(){
    TL.Router.init();
    TL.UI.toast('🚀 TL Nexus 旗舰版已加载');
  }
  if(document.readyState==='complete')init();
  else document.addEventListener('DOMContentLoaded',init);
})();
