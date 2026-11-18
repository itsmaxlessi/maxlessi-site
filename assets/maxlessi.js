(function(){
  var ANIM=document.documentElement.classList.contains('anim');
  var EN=document.documentElement.lang==='en';function L(fr,en){return EN?en:fr}
  // headings: split into words for the rise animation
  [].forEach.call(document.querySelectorAll('.mx'),function(h){
    var i=0;
    [].forEach.call(h.querySelectorAll('b,span'),function(p){
      if(p.querySelector('.w'))return;
      var ws=p.textContent.trim().split(/\s+/);
      p.innerHTML=ws.map(function(w){return '<i class="w"><i style="--i:'+(i++)+'">'+w+'</i></i>'}).join(' ');
    });
    if(h.tagName==='H1'){var last=h.querySelectorAll('span .w');if(last.length)last[last.length-1].classList.add('hl')}
  });
  function countUp(el){
    if(el.getAttribute('data-done'))return;el.setAttribute('data-done','1');
    var txt=el.textContent,m=txt.match(EN?/^([^0-9]*?)(\d[\d,.]*\d|\d)(.*)$/:/^([^0-9]*?)(\d[\d\s  ,]*\d|\d)(.*)$/);if(!m)return;
    var ns=m[2],v=EN?parseFloat(ns.replace(/,/g,'')):parseFloat(ns.replace(/[\s  ]/g,'').replace(',','.')),dec=(ns.split(EN?'.':',')[1]||'').length;
    if(!isFinite(v))return;var t0=null;
    function f(x){try{return x.toLocaleString(EN?'en-GB':'fr-FR',{minimumFractionDigits:dec,maximumFractionDigits:dec})}catch(e){return x.toFixed(dec)}}
    function step(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/1300),q=1-Math.pow(1-k,3);el.textContent=m[1]+f(v*q)+m[3];if(k<1)requestAnimationFrame(step);else el.textContent=txt}
    requestAnimationFrame(step);
  }
  // chat demo
  function esc(s){return s.replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
  function runDemo(el){
    var s=JSON.parse(el.getAttribute('data-demo')),b=el.querySelector('.ph-body'),i=0;
    function add(m){var d=document.createElement('div');d.className='msg '+m.w;d.innerHTML='<p>'+esc(m.t)+'</p>'+(m.h?'<time>'+m.h+'</time>':'');b.appendChild(d);requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('in')})})}
    if(!ANIM){s.forEach(function(m){add(m)});[].forEach.call(b.children,function(c){c.classList.add('in')});return}
    function typing(cb){var d=document.createElement('div');d.className='msg a typing in';d.innerHTML='<p><i></i><i></i><i></i></p>';b.appendChild(d);setTimeout(function(){if(d.parentNode)b.removeChild(d);cb()},1200)}
    function next(){
      if(i>=s.length){setTimeout(function(){[].forEach.call(b.children,function(c){c.classList.remove('in')});setTimeout(function(){b.innerHTML='';i=0;next()},500)},4500);return}
      var m=s[i++];
      if(m.w==='a')typing(function(){add(m);setTimeout(next,1500)});else{add(m);setTimeout(next,m.w==='s'?1600:1300)}
    }
    next();
  }
  var demos=[].slice.call(document.querySelectorAll('.phone[data-demo]'));
  if('IntersectionObserver' in window){
    var dio=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){runDemo(en.target);dio.unobserve(en.target)}})},{threshold:.3});
    demos.forEach(function(d){dio.observe(d)});
  }else demos.forEach(runDemo);
  // reveal on scroll
  if(ANIM){
    var sel='.mx,.eyebrow,.lead,.hpts,.scard,.fn,.st3,.plan,.offer,.rescard,.fdr figure,.faq,.pain,.agt,.case2,.svc,.cchips,.ctl>div,.cform,.cdir,.tbl,.dwrap';
    var els=[].slice.call(document.querySelectorAll(sel));
    els.forEach(function(e){
      if(!e.classList.contains('mx'))e.classList.add('rv');
      var p=e.parentNode,idx=[].indexOf.call(p.children,e);if(idx>0&&idx<8)e.style.setProperty('--rd',(idx*0.07)+'s');
    });
    var rio=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var e=en.target;e.classList.add('in');[].forEach.call(e.querySelectorAll('.pp b,.rescard b,.cnums b'),countUp);if(e.matches('.rescard')){var b=e.querySelector('b');if(b)setTimeout(function(){countUp(b)},200)}rio.unobserve(e)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e){rio.observe(e)});
  }
  // case videos: play in view, tap for sound
  var vids=[].slice.call(document.querySelectorAll('.case2 video'));
  if('IntersectionObserver' in window&&ANIM){
    var vio=new IntersectionObserver(function(es){es.forEach(function(en){var v=en.target;if(en.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.5});
    vids.forEach(function(v){vio.observe(v)});
  }
  vids.forEach(function(v){v.addEventListener('click',function(){v.muted=!v.muted;var p=v.play();if(p&&p.catch)p.catch(function(){})})});
  // mobile menu: close after a click
  [].forEach.call(document.querySelectorAll('.mpanel a'),function(a){a.addEventListener('click',function(){var d=a.closest('details');if(d)d.removeAttribute('open')})});
})();
(function(){
  var ANIM=document.documentElement.classList.contains('anim');
  var EN=document.documentElement.lang==='en';function L(fr,en){return EN?en:fr}
  function esc(s){return String(s).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
  // stagger dots on the integration map
  [].forEach.call(document.querySelectorAll('.itools'),function(g){[].forEach.call(g.children,function(c,i){c.style.setProperty('--n',i)})});
  function card(m){
    var h='<p>'+esc(m.t)+'</p>';
    if(m.bars){var mx=Math.max.apply(null,m.bars.map(function(b){return b[1]}));h+='<div class="bars">'+m.bars.map(function(b){return '<div><span>'+esc(b[0])+'</span><u><i data-w="'+Math.round(b[1]/mx*100)+'"></i></u><b>'+b[1]+'</b></div>'}).join('')+'</div>'}
    if(m.act)h+='<div class="acts"><span class="ok">'+esc(m.act)+'</span><span>'+L('Modifier','Edit')+'</span></div>';
    if(m.src)h+='<div class="srcs">'+m.src.map(function(x){return '<span>'+esc(x)+'</span>'}).join('')+'</div>';
    return h;
  }
  function runAssist(el){
    if(el.getAttribute('data-run'))return;el.setAttribute('data-run','1');
    var s=JSON.parse(el.getAttribute('data-ask')),b=el.querySelector('.as-body'),ty=el.querySelector('.as-typed'),tabs=el.querySelectorAll('.as-tabs b'),loop=0,i=0;
    function put(cls,html){var d=document.createElement('div');d.className=cls;d.innerHTML=html;b.appendChild(d);requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('in');[].forEach.call(d.querySelectorAll('.bars i'),function(x){x.style.width=x.getAttribute('data-w')+'%'})})});return d}
    if(!ANIM){s.forEach(function(m){if(m.r==='u')put('as-q',esc(m.t));else if(m.r==='a')put('as-r',card(m));else put('as-s',esc(m.t))});return}
    function typeText(t,cb){var k=0;ty.textContent='';(function step(){ty.textContent=t.slice(0,++k);if(k<t.length)setTimeout(step,26);else setTimeout(function(){ty.textContent='';cb()},350)})()}
    function next(){
      if(i>=s.length){setTimeout(function(){b.classList.add('fade');setTimeout(function(){b.innerHTML='';b.classList.remove('fade');i=0;loop++;[].forEach.call(tabs,function(t,j){t.classList.toggle('on',j===loop%2)});next()},450)},4500);return}
      var m=s[i++];
      if(m.r==='u')typeText(m.t,function(){put('as-q',esc(m.t));setTimeout(next,500)});
      else if(m.r==='a'){
        var th=put('as-th','<span class="ld"><i></i><i></i><i></i></span>'+L('Lecture des données','Reading data')+(m.src?L(' : ',': ')+m.src.map(function(x){return '<span>'+esc(x)+'</span>'}).join(''):''));
        setTimeout(function(){if(th.parentNode)b.removeChild(th);var d=put('as-r',card(m));if(m.act){setTimeout(function(){var ok=d.querySelector('.ok');if(ok)ok.classList.add('pressed');setTimeout(next,700)},1700)}else setTimeout(next,1700)},1300);
      }else{put('as-s',esc(m.t));setTimeout(next,900)}
    }
    if(s.length>2&&s[0].r==='u'&&s[1].r==='a'){put('as-q',esc(s[0].t));put('as-r',card(s[1]));i=2;setTimeout(next,2600)}else next();
  }
  window.__runAssist=runAssist;
  var as=[].slice.call(document.querySelectorAll('.asst[data-ask]'));
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){runAssist(en.target);io.unobserve(en.target)}})},{threshold:.3});as.forEach(function(a){io.observe(a)})}
  else as.forEach(runAssist);
  // reveal for the new blocks
  if(ANIM&&'IntersectionObserver' in window){
    var els=[].slice.call(document.querySelectorAll('.imap .itop,.imap .icore,.itool,.cyc li,.asst'));
    els.forEach(function(e){e.classList.add('rv');var p=e.parentNode,idx=[].indexOf.call(p.children,e);if(idx>0&&idx<9)e.style.setProperty('--rd',(idx*0.07)+'s')});
    var r=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');r.unobserve(en.target)}})},{threshold:.15});
    els.forEach(function(e){r.observe(e)});
  }
})();
// failsafe: never leave visible content hidden if an observer misses a jump
(function(){
  if(!document.documentElement.classList.contains('anim'))return;
  var t=null;
  function sweep(){var h=innerHeight;[].forEach.call(document.querySelectorAll('.asst[data-ask]:not([data-run])'),function(e){var r=e.getBoundingClientRect();if(r.top<h*0.9&&r.bottom>0&&window.__runAssist)window.__runAssist(e)});[].forEach.call(document.querySelectorAll('.rv:not(.in),.mx:not(.in),.hcard:not(.in)'),function(e){var r=e.getBoundingClientRect();if(r.top<h*0.95&&r.bottom>0)e.classList.add('in')})}
  addEventListener('scroll',function(){if(t)return;t=setTimeout(function(){t=null;sweep()},180)},{passive:true});
  addEventListener('load',function(){setTimeout(sweep,1200)});
  setTimeout(sweep,2500);
})();

// ===== lead forms, attribution, consent and conversion events =====
(function(){
  var EN=document.documentElement.lang==='en';function L(fr,en){return EN?en:fr}
  var C=window.MXCFG||{},LS={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  var SS={get:function(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
  // first-touch attribution kept for the session
  try{var q=new URLSearchParams(location.search),keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid','gbraid','wbraid'],got={};keys.forEach(function(k){if(q.get(k))got[k]=q.get(k)});
    if(Object.keys(got).length&&!SS.get('mx_utm')){got.landing=location.pathname;SS.set('mx_utm',JSON.stringify(got))}
    if(!SS.get('mx_ref'))SS.set('mx_ref',document.referrer||'')}catch(e){}
  function track(name,params){try{if(window.gtag)gtag('event',name,params||{});if(window.fbq){if(name==='generate_lead')fbq('track','Lead');else if(name==='contact')fbq('track','Contact')}}catch(e){}}
  // consent (CNIL): nothing loads before an explicit choice; refusing is as easy as accepting
  var need=C.ga4||C.pixel||C.gads;
  function loadTrackers(){
    if(window.__mxT)return;window.__mxT=1;
    if(C.ga4||C.gads){var s=document.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id='+(C.ga4||C.gads);document.head.appendChild(s);
      window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());
      gtag('consent','default',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
      if(C.ga4)gtag('config',C.ga4);if(C.gads)gtag('config',C.gads)}
    if(C.pixel){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',C.pixel);fbq('track','PageView')}
    if(document.body.classList.contains('k-thanks')&&SS.get('mx_lead')){track('generate_lead',{});if(window.gtag&&C.gads&&C.gadsLead)gtag('event','conversion',{send_to:C.gads+'/'+C.gadsLead});SS.set('mx_lead','')}
  }
  function banner(){
    var d=document.createElement('div');d.className='ckb';d.setAttribute('role','dialog');d.setAttribute('aria-label','Cookies');
    d.innerHTML='<p>'+L('Avec votre accord, nous utilisons des cookies de mesure et de publicité pour améliorer le site et mesurer nos campagnes.','With your consent, we use analytics and advertising cookies to improve the site and measure our campaigns.')+' <a href="'+(document.querySelector('a[href*="confidentialite"],a[href*="privacy"]')||{href:'#'}).href+'">'+L('En savoir plus','Learn more')+'</a></p><div><button type="button" data-c="no">'+L('Refuser','Decline')+'</button><button type="button" data-c="yes">'+L('Accepter','Accept')+'</button></div>';
    document.body.appendChild(d);
    d.addEventListener('click',function(ev){var c=ev.target.getAttribute('data-c');if(!c)return;LS.set('mx_consent',c==='yes'?'granted':'denied');d.remove();if(c==='yes')loadTrackers()});
  }
  if(need){var st=LS.get('mx_consent');if(st==='granted')loadTrackers();else if(!st)banner();
    [].forEach.call(document.querySelectorAll('[data-cookies]'),function(a){a.addEventListener('click',function(ev){ev.preventDefault();LS.set('mx_consent','');banner()})})}
  // click events on direct contact
  document.addEventListener('click',function(ev){var a=ev.target.closest&&ev.target.closest('a[href^="tel:"],a[href*="wa.me"]');if(a)track('contact',{method:a.href.indexOf('tel:')===0?'phone':'whatsapp'})});
  // lead forms
  [].forEach.call(document.querySelectorAll('form.lform'),function(f){
    var err=f.querySelector('.lerr'),btn=f.querySelector('button[type=submit]');
    f.addEventListener('submit',function(ev){
      ev.preventDefault();err.textContent='';
      var d={};[].forEach.call(f.elements,function(el){if(el.name&&el.type!=='checkbox')d[el.name]=(el.value||'').trim()});
      if(!d.nom||!d.entreprise){err.textContent=L('Merci d’indiquer votre nom et votre établissement.','Please enter your name and your business name.');return}
      if(!d.telephone&&!d.email){err.textContent=L('Merci d’indiquer un téléphone ou un e-mail.','Please enter a phone number or an email address.');return}
      if(d.email&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)){err.textContent=L('L’adresse e-mail semble incomplète.','The email address looks incomplete.');return}
      if(!f.querySelector('input[name=rgpd]').checked){err.textContent=L('Merci de cocher la case de consentement.','Please tick the consent box.');return}
      d.page=location.pathname;d.referrer=SS.get('mx_ref')||'';try{d.attribution=JSON.parse(SS.get('mx_utm')||'{}')}catch(e){d.attribution={}}
      d.date=new Date().toISOString();
      var txt=L('Demande de diagnostic Maxlessi','Maxlessi assessment request')+'\n'+['nom','entreprise','secteur','ville','telephone','email','message'].filter(function(k){return d[k]}).map(function(k){return k+' : '+d[k]}).join('\n');
      var at=d.attribution||{};if(at.utm_source||at.utm_campaign)txt+='\nsource : '+[at.utm_source,at.utm_campaign].filter(Boolean).join(' / ');
      function fallback(){
        f.classList.add('alt');
        f.querySelector('[data-alt=wa]').href=f.getAttribute('data-wa')+'?text='+encodeURIComponent(txt);
        f.querySelector('[data-alt=mail]').href='mailto:'+f.getAttribute('data-mail')+'?subject='+encodeURIComponent(L('Diagnostic gratuit : ','Free assessment: ')+d.entreprise)+'&body='+encodeURIComponent(txt);
        [].forEach.call(f.querySelectorAll('[data-alt]'),function(a){a.addEventListener('click',function(){SS.set('mx_lead','1');track('generate_lead',{method:a.getAttribute('data-alt')})})});
      }
      if(!C.form){fallback();return}
      btn.disabled=true;btn.textContent=L('Envoi…','Sending…');
      fetch(C.form,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(d)}).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){var j=null;try{j=JSON.parse(t)}catch(e){}if(j&&j.ok===false)throw 0;SS.set('mx_lead','1');location.href=f.getAttribute('data-merci')}).catch(function(){btn.disabled=false;btn.textContent=L('Envoyer ma demande','Send my request');fallback()});
    });
  });
})();
