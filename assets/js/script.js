'use strict';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const sidebar = $('[data-sidebar]');
const sidebarBtn = $('[data-sidebar-btn]');
if (sidebar && sidebarBtn) sidebarBtn.onclick = () => sidebar.classList.toggle('active');

const main = $('.main-content');
const home = $('[data-page="about"]');
const work = $('[data-page="resume"]');
const writing = $('[data-page="portfolio"]');
if (home) $('.article-title', home).textContent = 'Home';

const studies = {
  baza: { type:'Featured project · Service marketplace', title:'Baza', lead:'A trust-focused platform connecting clients with informal artisans while making reputation, verification and job completion easier to understand.', parts:[['The problem','Finding reliable informal workers can be difficult when clients have limited information about experience, identity and previous work.'],['The solution','Baza combines worker profiles, verification, ratings, GPS-aware discovery, booking and OTP-based job completion into one flow.'],['Key features','Worker and client roles, Trust Score, skill selection, availability, job alerts, GPS arrival confirmation, completion OTP, ratings and dispute handling.'],['Technology','React Native, TypeScript, Firebase Authentication, Cloud Firestore, Cloud Storage and location services.']] },
  iduka: { type:'Product · Retail management', title:'Iduka', lead:'A shop-management system giving small retailers a clearer view of stock, sales, expenses and profit.', parts:[['The problem','Manual records make it difficult to know what sold, what remains and how much profit was actually made.'],['The solution','Iduka centralizes products, stock movements, daily sales and expenses, turning records into useful business information.'],['Key features','Product and stock management, searchable stock, sales, expenses, profit calculations and role-aware workflows.'],['Technology','React Native, Supabase, authentication, database workflows and realtime updates.']] },
  docket: { type:'Academic project · Web application', title:'Docket Management System', lead:'A web application designed to simplify student examination docket administration and verification.', parts:[['The problem','Manual examination docket processes can make payment checks and verification slow and difficult to audit.'],['The solution','The system brings docket records, fee status and QR-based verification into one digital workflow.'],['Key features','Student docket management, fee-payment status, QR verification and lecturer workflows.'],['Technology','HTML, CSS, JavaScript, backend/database technologies and QR verification workflows.']] }
};

const card = (id,title,type,text,img) => `<article class="case-study-card"><div class="case-image"><img src="./assets/images/${img}" alt="${title}" loading="lazy"></div><div class="case-content"><span class="eyebrow">${type}</span><h3>${title}</h3><p>${text}</p><button class="case-link" data-case="${id}">View case study <ion-icon name="arrow-forward-outline"></ion-icon></button></div></article>`;

if (work) {
  work.className='work'; work.dataset.page='work';
  work.innerHTML=`<header><h2 class="h2 article-title">Selected Work</h2></header><p class="section-intro">A selection of systems and products I have designed and built to solve practical problems.</p><section class="case-study-grid">${card('baza','Baza','Featured project','A trust-focused service marketplace for verified artisans in Zambia.','baza-cover.svg')}${card('iduka','Iduka','Retail management','A practical shop-management system for stock, sales, expenses and business performance.','iduka-cover.svg')}${card('docket','Docket Management System','Education technology','A web system for examination dockets, payments and QR verification.','docket-cover.svg')}</section><div class="case-study-modal" id="caseModal"><div class="modal-backdrop" data-close-case></div><section class="case-study-dialog"><button class="modal-close" aria-label="Close" data-close-case>×</button><span class="eyebrow" id="caseType"></span><h3 class="case-study-title" id="caseTitle"></h3><p class="case-study-lead" id="caseLead"></p><div class="case-study-sections" id="caseBody"></div></section></div>`;
}

if (writing) {
  writing.className='writing'; writing.dataset.page='writing';
  writing.innerHTML=`<header><h2 class="h2 article-title">Writing</h2></header><p class="section-intro">Poetry, creative writing, quotations and other pieces outside my technical work.</p><section class="writing-feature"><div><span class="eyebrow">Poetry collection</span><h3>Echoes from the West</h3><p>An immersive reading experience where each poem unfolds one section at a time, like a cinematic presentation.</p></div><button class="primary-btn" id="openPoems">Open collection <ion-icon name="arrow-forward-outline"></ion-icon></button></section><section class="writing-grid"><button class="writing-card" id="openPoems2"><span class="writing-number">01</span><h3>Echoes from the West</h3><p>Poetry collection · 4 poems</p><span>Read collection →</span></button><article class="writing-card"><span class="writing-number">02</span><h3>Quotations</h3><p>Short thoughts, observations and lines worth keeping.</p><span>Coming soon</span></article><article class="writing-card"><span class="writing-number">03</span><h3>Books &amp; Ideas</h3><p>Notes, concepts and longer-form creative work.</p><span>Coming soon</span></article></section><div class="poem-modal" id="poemModal"><div class="modal-backdrop" data-close-poem></div><section class="poem-reader"><button class="modal-close" aria-label="Close" data-close-poem>×</button><div class="poem-progress"><span id="poemBar"></span></div><div class="poem-meta"><span>Echoes from the West</span><span id="poemCount"></span></div><div class="poem-stage"><span class="eyebrow">POEM</span><h3 id="poemTitle"></h3><div id="poemText"></div></div><div class="poem-controls"><button class="secondary-btn" id="prevPoem">← Previous</button><button class="primary-btn" id="nextPoem">Next →</button></div></section></div>`;
}

if (main && !main.querySelector('[data-page="articles"]')) { const a=document.createElement('article'); a.dataset.page='articles'; a.innerHTML=`<header><h2 class="h2 article-title">Articles</h2></header><section class="coming-soon"><div class="coming-icon"><ion-icon name="document-text-outline"></ion-icon></div><span class="eyebrow">Writing in progress</span><h3>Articles are coming soon.</h3><p>I am currently preparing articles. This space will become the home for longer-form technical and professional writing.</p></section>`; main.appendChild(a); }

const nav=$('.navbar-list');
if(nav) nav.innerHTML=['Home','Work','Articles','Writing','Contact'].map((n,i)=>`<li class="navbar-item"><button class="navbar-link ${i?'':'active'}" data-target="${n.toLowerCase()}">${n}</button></li>`).join('');

const menu=document.createElement('button'); menu.className='mobile-menu-toggle'; menu.setAttribute('aria-label','Open navigation'); menu.setAttribute('aria-expanded','false'); menu.innerHTML='<ion-icon name="menu-outline"></ion-icon>'; document.body.appendChild(menu);
const closeMenu=()=>{nav?.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false');menu.innerHTML='<ion-icon name="menu-outline"></ion-icon>';};
menu.onclick=()=>{const open=nav?.classList.toggle('mobile-open');menu.setAttribute('aria-expanded',String(!!open));menu.innerHTML=open?'<ion-icon name="close-outline"></ion-icon>':'<ion-icon name="menu-outline"></ion-icon>';};
function go(target){const page=target==='home'?'about':target; $$('[data-page]').forEach(p=>p.classList.toggle('active',p.dataset.page===page)); $$('[data-target]').forEach(b=>b.classList.toggle('active',b.dataset.target===target)); closeMenu(); window.scrollTo({top:0,behavior:'smooth'});}
$$('[data-target]').forEach(b=>b.onclick=()=>go(b.dataset.target));

const cm=$('#caseModal');
if(cm){const type=$('#caseType'),title=$('#caseTitle'),lead=$('#caseLead'),body=$('#caseBody'); $$('[data-case]').forEach(b=>b.onclick=()=>{const s=studies[b.dataset.case];type.textContent=s.type;title.textContent=s.title;lead.textContent=s.lead;body.innerHTML=s.parts.map(x=>`<div><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('');cm.classList.add('active');document.body.classList.add('modal-open');}); $$('[data-close-case]',cm).forEach(b=>b.onclick=()=>{cm.classList.remove('active');document.body.classList.remove('modal-open');});}

/* Replace these four entries with the full poem text when the final poems are added. */
const poems=[{title:'Smile',verses:['Your poem text will appear here.','Each verse enters with a subtle cinematic animation.']},{title:'Welcome',verses:['Your poem text will appear here.']},{title:'Perspective',verses:['Your poem text will appear here.']},{title:'The Road',verses:['Your poem text will appear here.']}];
let poemIndex=0; const pm=$('#poemModal');
if(pm){const pt=$('#poemTitle'),px=$('#poemText'),pc=$('#poemCount'),pb=$('#poemBar'); const render=()=>{const p=poems[poemIndex];pt.textContent=p.title;px.innerHTML=p.verses.map((v,i)=>`<p style="animation-delay:${i*110}ms">${v}</p>`).join('');pc.textContent=`${poemIndex+1} / ${poems.length}`;pb.style.width=`${(poemIndex+1)/poems.length*100}%`;}; const open=()=>{poemIndex=0;render();pm.classList.add('active');document.body.classList.add('modal-open');}; $('#openPoems')?.addEventListener('click',open);$('#openPoems2')?.addEventListener('click',open);$$('[data-close-poem]',pm).forEach(b=>b.onclick=()=>{pm.classList.remove('active');document.body.classList.remove('modal-open');});$('#nextPoem').onclick=()=>{if(poemIndex<poems.length-1){poemIndex++;render();}else{pm.classList.remove('active');document.body.classList.remove('modal-open');}};$('#prevPoem').onclick=()=>{if(poemIndex){poemIndex--;render();}};}

const form=$('[data-form]'); if(form){const inputs=$$('[data-form-input]',form),btn=$('[data-form-btn]',form);inputs.forEach(i=>i.oninput=()=>btn.disabled=!form.checkValidity());}
document.onkeydown=e=>{if(e.key==='Escape'){ $$('.case-study-modal,.poem-modal').forEach(m=>m.classList.remove('active'));document.body.classList.remove('modal-open');closeMenu();}};
