// ─── TL Nexus Build Detail View & Overlay ───
window.TL = window.TL || {};
TL.Views = TL.Views || {};

TL.Views.showBuildDetail=function(id){
  const b=TL.BUILDS.find(x=>x.id===id);
  if(!b)return;

  const overlay=document.createElement('div');
  overlay.className='detail-overlay';
  overlay.id='buildDetailOverlay';
  overlay.innerHTML=`
    <div class="detail-panel">
      ${TL.UI.buildDetailHTML(b)}
    </div>`;

  overlay.addEventListener('click',function(e){
    if(e.target===this)TL.Views.closeBuildDetail();
  });

  document.body.appendChild(overlay);
  document.addEventListener('keydown',TL.Views._closeOnEscape);
};

TL.Views._closeOnEscape=function(e){
  if(e.key==='Escape')TL.Views.closeBuildDetail();
};

TL.Views.closeBuildDetail=function(){
  const el=document.getElementById('buildDetailOverlay');
  if(el){el.remove()}
  document.removeEventListener('keydown',TL.Views._closeOnEscape);
};

// Full-page build view (for shared URLs like #/build?id=5)
TL.Views.build = function(el, params){
  const id=parseInt(params.id);
  const b=TL.BUILDS.find(x=>x.id===id);

  if(!b){
    el.innerHTML=`
      <div class="hero" style="padding:40px 0">
        <h1>Build 未找到</h1>
        <p style="color:var(--text-dim);margin-top:8px">ID ${params.id||'?'} 不存在</p>
        <a href="#/" class="btn btn-primary" style="margin-top:20px;display:inline-flex">← 返回首页</a>
      </div>`;
    return;
  }

  el.innerHTML=`
    <div style="max-width:640px;margin:0 auto">
      <a href="#/" style="display:inline-flex;align-items:center;gap:4px;color:var(--text-dim);font-size:13px;margin-bottom:20px;transition:color var(--transition)" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-dim)'">← 返回首页</a>
      <div class="card" style="padding:28px 32px">
        ${TL.UI.buildDetailHTML(b)}
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="TL.Views.showBuildDetail(${b.id})">🔍 弹窗查看</button>
          <button class="btn btn-sm" style="background:var(--surface);border:1px solid var(--border);color:var(--text-dim)" onclick="(function(){navigator.clipboard.writeText(window.location.href).then(()=>TL.UI.toast('链接已复制'));})()">🔗 复制链接</button>
        </div>
      </div>
    </div>`;
};
