'use strict';

const elementToggleFunc = (elem) => elem?.classList.toggle('active');

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn?.addEventListener('click', () => {
  elementToggleFunc(sidebar);
  const expanded = sidebar?.classList.contains('active');
  sidebarBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
const ctaButtons = document.querySelectorAll('[data-nav-target]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navbar = document.querySelector('.navbar');

const scrollToTop = () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) window.scrollTo(0, 0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};

const normalizeRoute = (route) => {
  if (!route) return 'home';
  const cleaned = route.toString().trim().replace(/^#\/?/, '');
  return cleaned || 'home';
};

const getNavRoute = (pageName) => pageName.startsWith('work/') ? 'work' : pageName;

const setActivePage = (pageName) => {
  const normalizedPage = normalizeRoute(pageName);
  const pageExists = Array.from(pages).some((page) => page.dataset.page === normalizedPage);
  const activePage = pageExists ? normalizedPage : 'home';
  pages.forEach((page) => page.classList.toggle('active', page.dataset.page === activePage));
  const activeRoute = getNavRoute(activePage);
  navigationLinks.forEach((link) => link.classList.toggle('active', link.dataset.route === activeRoute));
  if (navbar?.classList.contains('active')) {
    navbar.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
  scrollToTop();
};

const navigateTo = (pageName) => {
  const normalizedPage = normalizeRoute(pageName);
  const currentHash = normalizeRoute(window.location.hash);
  if (currentHash !== normalizedPage) window.location.hash = `#/${normalizedPage}`;
  else setActivePage(normalizedPage);
};

navigationLinks.forEach((link) => link.addEventListener('click', () => {
  if (link.dataset.route) navigateTo(link.dataset.route);
}));

document.querySelectorAll('a[href^="#/"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const href = link.getAttribute('href');
    if (href) navigateTo(href);
  });
});

ctaButtons.forEach((button) => button.addEventListener('click', () => {
  if (button.dataset.navTarget) navigateTo(button.dataset.navTarget);
}));

navToggle?.addEventListener('click', () => {
  navbar?.classList.toggle('active');
  const expanded = navbar?.classList.contains('active');
  navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});

window.addEventListener('hashchange', () => setActivePage(window.location.hash));
setActivePage(window.location.hash);

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach((element) => revealObserver.observe(element));

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const updateFormState = () => {
  if (!form || !formBtn) return;
  if (form.checkValidity()) formBtn.removeAttribute('disabled');
  else formBtn.setAttribute('disabled', '');
};
formInputs.forEach((input) => input.addEventListener('input', updateFormState));
updateFormState();

/* --------------------------------------------------------------------------
   Echoes from the West — immersive poetry reader
   This enhancement sits on top of the latest portfolio layout without
   replacing the existing page structure.
---------------------------------------------------------------------------- */
const poems = [
  {
    title: 'Welcome',
    verses: [
      'Was it fate, was it destiny?',
      'There I was—',
      'watching everyone cry for me, staring at my own lifeless body.',
      'People came from far and wide, faces I did not recognize,',
      'even those who swore they hated me most—',
      'they stood there too.',
      'I thought this was the only way. All my life I dreaded death, only to end my own fear.',
      'But later, I realized the harm I had done.',
      'I watched my mother.',
      'No tears fell,',
      'but in her eyes I saw a sorrow too deep for words, a pain I had carved into her soul.',
      'I saw my children— innocent, unaware, their future now uncertain, their world suddenly torn apart.',
      'And then I was gone, in another world, surrounded by souls with sins far darker than mine.',
      'Yet I felt like the worst among them.',
      'There is no turning back.',
      'Only to live forever with the weight of what I caused, knowing I hurt those I once professed to love.',
      'I fall apart.',
      'And in the silence I whisper "Welcome to hell."',
      'And am afraid.'
    ]
  },
  {
    title: 'Smile',
    verses: [
      'He was there…', 'right before my eyes.', 'Rope.', 'Round his neck.', 'Eyes… cold.', 'Still.',
      'And today — he got all the attention he had ever wanted.', 'All the love.', 'All the sorrow.', 'All the pity.',
      'People came from miles away, even strangers, just to stand in the same silence.',
      'No one spoke.', 'No one dared.', 'Today… he received all the love.', 'But he wasn’t here… to see it.',
      'And I asked myself, If I died… what would be my greatest regret?',
      'The answer came… like a whisper I couldn’t ignore: “That I never told her… how much she meant to me.”',
      'I could have held it in.', 'I could have buried it with me.',
      'But the thought of leaving this world without making my love known terrifies me.',
      'Sometimes we act because we must.', 'Sometimes… fear holds the reins.',
      'But as I stood there, staring at what was left of him, I thought of all that life had still given me.',
      'And somehow… I smiled.'
    ]
  },
  {
    title: 'Him',
    verses: [
      'Am I worthy… or am I not?',
      'Some days, I feel like I’m not him — not worthy of you.',
      'I wonder when I became my own harshest critic, always telling myself I haven’t done enough.',
      'Falling for you is like walking uphill in deep sand — each step forward makes the next one harder, and sometimes it feels like I’m slipping back.',
      'It’s like traveling from one village to another across long hills — from afar, the distance seems small, but the closer you get, the more you realize how far it truly is.',
      'Yet no matter how far I wander, I’m always led back to you.',
      'It’s like the roads in a forest — no matter how many detours I take, whether left or right, every path still leads me to the same village… and that village is you.'
    ]
  },
  {
    title: 'Her',
    verses: [
      'Being with you is like watching the sun rise and set over a quiet valley plain — peaceful, gentle, breathtaking.',
      'Like lying beneath a sky full of stars in a distant village, where no city lights or noise disturb the silence — only the vast heavens above, awe-inspiring and pure.',
      'You are like the moon to a lonely traveler in the forest — though he walks alone, the moon is always there, following, watching, keeping him company.',
      'Your silence comforts me the same way — sometimes your presence says more than words ever could.',
      'Your voice is like birdsong in a still forest, soft and rare, yet enough to stir my soul.',
      'Water tastes sweeter when there’s only a little to be had, and so it is with my time with you — no matter how brief, it leaves an imprint on my heart.',
      'Falling for you wasn’t planned. It was like walking on sand — no matter how carefully I tried to lift my steps, I found myself sinking deeper.',
      'Like water vanishing into sand in seconds, my heart had already disappeared into you.'
    ]
  },
  {
    title: 'Perspective',
    verses: [
      'If you crown yourself with two wives and call it wealth— then riches will sit at your table.',
      'If you count your cows like coins, their shadows will make you a king. If gold is the fire in your eyes, then treasure will burn in your hands.',
      'If you drink from a dam of dust and sorrow, and whisper to your body, endure— it will obey.',
      'If you ration your thirst into droplets, your spirit will learn to survive on less.',
      'If you fear the footsteps of witchcraft, its shadow will chase you in the night.',
      'If you believe the road, though long, will bend beneath your stride, then the horizon will meet you.',
      'If you trust that God will open doors, then even walls will bow down like gates.',
      'If twenty kilometers shrink to the breath of only two, your bones will march without complaint.',
      'If you command your heart to keep beating, it will listen like a loyal drum.',
      'No—',
      'we do not always seize all that our hands reach for.',
      'But belief is a seed— it grows forests, it moves rivers, it shapes the very ground beneath your feet.',
      'So I urge you, tend to your mind like a garden of light.',
      'For what you believe will become what you are.'
    ]
  },
  {
    title: 'The Road',
    verses: [
      'It all began with ease, laughter carried us forward, the journey felt light.',
      'But soon the weight came, sand pulling us down, feet sinking, hands pushing when strength was gone.',
      'The forest stretched endless, we wandered for hours, each voice saying “It is near,” yet the distance mocked us— far, and farther still.',
      'Cold water to quench thirst, but bitter with dirt.',
      'Thirty kilometers beneath weary legs, each step heavier than the last. Still we endured, still we made memories that pain could not erase.',
      'At times we were stranded, our strength not enough. But help arrived, lifting us when our arms gave way.',
      'And we learned— sometimes survival rests in another’s kindness.',
      'There were days of waiting, when nothing seemed to move. But persistence lit the spark, and what once refused finally obeyed.',
      'Again obstacles rose, again we stumbled— but this time we were not afraid. Experience had shaped us, patience had taught us, and the weight no longer held power.',
      'At last, the way grew clear, and joy filled tired hearts.',
      'For life is like this— at first it is light, then struggles deepen, detours deceive, strength is tested.',
      'But if we endure, if we believe, if we learn— the path will open, and what seemed endless will become victory.'
    ]
  },
  {
    title: 'Déjà Vu',
    verses: [
      'Oh , how beautiful you are.',
      'Not only the beauty of your face, But the quiet glow of your soul.',
      'We’ve never spoken, Yet I feel you from a distance, A spirit so gentle, so kind — I swear I see it written on your face.',
      'It’s sad that language stands between us.',
      'I wish I could share more of me with you, And hear the stories you keep inside.',
      'It feels like déjà vu.',
      'As if I have known you before, As if we once loved, And lived a life together That ended too soon.',
      'It’s the smile you wear when your eyes find mine. The respect in your silence.',
      'The way you shine in a simple chitenge, The way your beauty doesn’t need a single trace of makeup.',
      'It feels like I already know you.',
      'And then I remember why.',
      'Because you are like her.',
      'Her spirit moves in you.',
      'And that is why my heart leapt so quickly — Why I held on to you in such a short time.',
      'You are her…',
      'And because of that, I miss her all over again.',
      'Maybe life sent you to me for just a while, Not to stay, But to let me taste again What it once felt like to be loved by her.'
    ]
  }
];

const writingPage = document.querySelector('[data-page="writing"]');
if (writingPage) {
  writingPage.innerHTML = `
    <section class="section-header reveal active">
      <span class="section-eyebrow">Writing</span>
      <h2>Echoes from the West</h2>
      <p>A collection of poems written as fragments of memory, distance, love, fear, endurance, and perspective.</p>
    </section>
    <section class="poetry-intro reveal active">
      <div>
        <span class="poetry-kicker">Poetry collection</span>
        <h3>Read slowly.</h3>
        <p>Choose a poem. Let the words take their time. Each piece opens into its own quiet space.</p>
      </div>
      <button class="button button-primary" data-open-poetry>Enter the collection →</button>
    </section>
    <section class="poetry-grid reveal active">
      ${poems.map((poem, index) => `
        <button class="poetry-card" data-poem-index="${index}">
          <span class="poetry-card-number">${String(index + 1).padStart(2, '0')}</span>
          <span class="poetry-card-title">${poem.title}</span>
          <span class="poetry-card-note">${poem.verses.length} passages</span>
          <span class="poetry-card-arrow">Read poem ↗</span>
        </button>`).join('')}
    </section>
    <div class="poetry-reader" data-poetry-reader aria-hidden="true">
      <div class="poetry-reader-backdrop" data-close-poetry></div>
      <section class="poetry-reader-panel" role="dialog" aria-modal="true" aria-label="Poem reader">
        <div class="poetry-progress"><span data-poetry-progress></span></div>
        <header class="poetry-reader-top">
          <div><span>Echoes from the West</span><small data-poetry-counter></small></div>
          <button class="poetry-close" data-close-poetry aria-label="Close poem reader">×</button>
        </header>
        <div class="poetry-atmosphere" aria-hidden="true"><i></i><i></i><i></i></div>
        <main class="poetry-stage">
          <span class="poetry-label">POEM</span>
          <h3 data-poetry-title></h3>
          <div class="poetry-lines" data-poetry-lines></div>
        </main>
        <footer class="poetry-controls">
          <button class="button button-secondary" data-poetry-prev>← Previous</button>
          <button class="button button-primary" data-poetry-next>Next poem →</button>
        </footer>
      </section>
    </div>`;

  const reader = writingPage.querySelector('[data-poetry-reader]');
  const title = writingPage.querySelector('[data-poetry-title]');
  const lines = writingPage.querySelector('[data-poetry-lines]');
  const counter = writingPage.querySelector('[data-poetry-counter]');
  const progress = writingPage.querySelector('[data-poetry-progress]');
  const prev = writingPage.querySelector('[data-poetry-prev]');
  const next = writingPage.querySelector('[data-poetry-next]');
  let currentPoem = 0;

  const renderPoem = (index, direction = 1) => {
    currentPoem = Math.max(0, Math.min(poems.length - 1, index));
    const poem = poems[currentPoem];
    title.textContent = poem.title;
    counter.textContent = `${String(currentPoem + 1).padStart(2, '0')} / ${String(poems.length).padStart(2, '0')}`;
    progress.style.width = `${((currentPoem + 1) / poems.length) * 100}%`;
    lines.classList.remove('poetry-lines-enter');
    void lines.offsetWidth;
    lines.classList.add('poetry-lines-enter');
    lines.innerHTML = poem.verses.map((verse, i) => `<p style="--delay:${Math.min(i * 55, 500)}ms" class="${verse.length <= 10 ? 'poetry-line-short' : ''}">${verse}</p>`).join('');
    prev.disabled = currentPoem === 0;
    next.textContent = currentPoem === poems.length - 1 ? 'Close collection ×' : 'Next poem →';
    if (direction !== 0) reader.querySelector('.poetry-stage').dataset.direction = direction > 0 ? 'forward' : 'back';
  };

  const openReader = (index = 0) => {
    renderPoem(index, 0);
    reader.classList.add('active');
    reader.setAttribute('aria-hidden', 'false');
    document.body.classList.add('poetry-open');
    writingPage.querySelector('[data-close-poetry]')?.focus?.();
  };
  const closeReader = () => {
    reader.classList.remove('active');
    reader.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('poetry-open');
  };

  writingPage.querySelector('[data-open-poetry]')?.addEventListener('click', () => openReader(0));
  writingPage.querySelectorAll('[data-poem-index]').forEach((card) => card.addEventListener('click', () => openReader(Number(card.dataset.poemIndex))));
  writingPage.querySelectorAll('[data-close-poetry]').forEach((button) => button.addEventListener('click', closeReader));
  prev.addEventListener('click', () => { if (currentPoem > 0) renderPoem(currentPoem - 1, -1); });
  next.addEventListener('click', () => { if (currentPoem < poems.length - 1) renderPoem(currentPoem + 1, 1); else closeReader(); });

  document.addEventListener('keydown', (event) => {
    if (!reader.classList.contains('active')) return;
    if (event.key === 'Escape') closeReader();
    if (event.key === 'ArrowRight' && currentPoem < poems.length - 1) renderPoem(currentPoem + 1, 1);
    if (event.key === 'ArrowLeft' && currentPoem > 0) renderPoem(currentPoem - 1, -1);
  });
}

/* Scoped styling keeps the latest portfolio design intact while giving the
   writing section its own editorial, cinematic visual language. */
const poetryStyles = document.createElement('style');
poetryStyles.textContent = `
.poetry-intro{display:flex;justify-content:space-between;align-items:end;gap:28px;margin:26px 0 22px;padding:30px;border:1px solid rgba(255,255,255,.08);border-radius:24px;background:radial-gradient(circle at 85% 20%,rgba(124,92,255,.16),transparent 38%),linear-gradient(135deg,rgba(200,255,61,.06),rgba(255,255,255,.02))}.poetry-kicker{display:block;text-transform:uppercase;letter-spacing:.24em;font-size:.72rem;color:var(--accent);margin-bottom:12px}.poetry-intro h3{font:italic clamp(2rem,4vw,3.4rem) Georgia,serif;margin:0 0 8px}.poetry-intro p{max-width:650px;color:var(--muted);line-height:1.8;margin:0}.poetry-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.poetry-card{min-height:230px;text-align:left;padding:24px;border:1px solid rgba(255,255,255,.08);border-radius:20px;background:rgba(255,255,255,.025);display:flex;flex-direction:column;align-items:flex-start;transition:transform .3s ease,border-color .3s ease,background .3s ease}.poetry-card:hover{transform:translateY(-5px);border-color:rgba(200,255,61,.3);background:rgba(200,255,61,.045)}.poetry-card-number{font-family:var(--font-mono);font-size:.72rem;color:var(--accent-secondary);margin-bottom:auto}.poetry-card-title{font:italic clamp(1.65rem,2.8vw,2.3rem) Georgia,serif;margin-bottom:10px}.poetry-card-note{font-size:.78rem;color:var(--muted)}.poetry-card-arrow{margin-top:22px;font-size:.82rem;color:var(--accent)}.poetry-reader{position:fixed;inset:0;z-index:100;display:grid;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .4s ease,visibility .4s ease}.poetry-reader.active{opacity:1;visibility:visible;pointer-events:auto}.poetry-reader-backdrop{position:absolute;inset:0;background:rgba(4,5,7,.94);backdrop-filter:blur(18px)}.poetry-reader-panel{position:relative;z-index:1;height:100dvh;display:grid;grid-template-rows:auto 1fr auto;padding:24px clamp(22px,6vw,90px);overflow:hidden;background:radial-gradient(circle at 80% 18%,rgba(124,92,255,.12),transparent 32%),radial-gradient(circle at 12% 84%,rgba(200,255,61,.07),transparent 30%),#090b0e}.poetry-progress{position:absolute;left:0;top:0;width:100%;height:2px;background:rgba(255,255,255,.07)}.poetry-progress span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--accent),var(--accent-secondary));box-shadow:0 0 20px rgba(200,255,61,.35);transition:width .65s cubic-bezier(.22,1,.36,1)}.poetry-reader-top{display:flex;align-items:center;justify-content:space-between;color:rgba(255,255,255,.42);font-family:var(--font-mono);font-size:.67rem;letter-spacing:.18em;text-transform:uppercase}.poetry-reader-top div{display:flex;gap:18px;align-items:center}.poetry-reader-top small{color:var(--accent);font-size:.67rem}.poetry-close{width:44px;height:44px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.04);font-size:1.6rem;color:var(--text);transition:.25s}.poetry-close:hover{background:rgba(255,255,255,.1);transform:rotate(4deg)}.poetry-stage{position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;min-height:0;padding:35px 10px 25px;overflow:hidden}.poetry-stage:before,.poetry-stage:after{content:"";position:absolute;border:1px solid rgba(255,255,255,.035);border-radius:50%;pointer-events:none}.poetry-stage:before{width:min(70vw,760px);height:min(70vw,760px);animation:poetryOrbit 30s linear infinite}.poetry-stage:after{width:min(46vw,500px);height:min(46vw,500px);animation:poetryOrbit 21s linear infinite reverse}.poetry-atmosphere{position:absolute;inset:0;pointer-events:none;overflow:hidden}.poetry-atmosphere i{position:absolute;width:22vw;height:22vw;border-radius:50%;filter:blur(50px);opacity:.16}.poetry-atmosphere i:nth-child(1){background:var(--accent);top:5%;left:8%;animation:poetryFloat 11s ease-in-out infinite alternate}.poetry-atmosphere i:nth-child(2){background:var(--accent-secondary);right:5%;top:30%;animation:poetryFloat 14s ease-in-out infinite alternate-reverse}.poetry-atmosphere i:nth-child(3){background:#fff;left:45%;bottom:-15%;width:15vw;height:15vw;opacity:.05;animation:poetryFloat 9s ease-in-out infinite alternate}.poetry-label{position:relative;z-index:2;font-family:var(--font-mono);font-size:.62rem;letter-spacing:.42em;color:rgba(255,255,255,.38);margin-bottom:18px}.poetry-stage h3{position:relative;z-index:2;font:italic clamp(3rem,7vw,6.5rem)/.95 Georgia,'Times New Roman',serif;letter-spacing:-.045em;margin:0 0 30px;text-shadow:0 18px 60px rgba(0,0,0,.45);animation:poetryTitleIn .8s cubic-bezier(.22,1,.36,1)}.poetry-lines{position:relative;z-index:2;width:min(780px,100%);max-height:48vh;overflow:auto;padding:5px 18px;scrollbar-width:none}.poetry-lines::-webkit-scrollbar{display:none}.poetry-lines p{font:italic clamp(1rem,1.75vw,1.28rem)/2 Georgia,'Times New Roman',serif;color:rgba(241,243,245,.82);margin:0 auto 8px;animation:poetryVerseIn .8s cubic-bezier(.22,1,.36,1) both;animation-delay:var(--delay)}.poetry-lines p.poetry-line-short{color:rgba(241,243,245,.98);font-size:clamp(1.12rem,2vw,1.45rem)}.poetry-controls{display:flex;justify-content:space-between;gap:16px;position:relative;z-index:3;padding-top:16px}.poetry-controls .button{min-width:130px;justify-content:center}.poetry-controls button:disabled{opacity:.25;cursor:not-allowed}.poetry-open{overflow:hidden}.poetry-lines-enter{animation:poetryPageIn .55s ease both}@keyframes poetryVerseIn{from{opacity:0;transform:translateY(18px);filter:blur(4px)}to{opacity:1;transform:none;filter:blur(0)}}@keyframes poetryTitleIn{from{opacity:0;transform:translateY(18px) scale(.97);filter:blur(5px)}to{opacity:1;transform:none;filter:blur(0)}}@keyframes poetryPageIn{from{opacity:.25;transform:translateX(12px)}to{opacity:1;transform:none}}@keyframes poetryOrbit{to{transform:rotate(360deg)}}@keyframes poetryFloat{from{transform:translate3d(-12px,-8px,0) scale(.92)}to{transform:translate3d(18px,18px,0) scale(1.08)}}@media(max-width:900px){.poetry-grid{grid-template-columns:repeat(2,1fr)}.poetry-intro{align-items:flex-start;flex-direction:column}}@media(max-width:600px){.poetry-grid{grid-template-columns:1fr}.poetry-card{min-height:190px}.poetry-reader-panel{padding:18px 16px}.poetry-reader-top{font-size:.58rem}.poetry-reader-top div{gap:10px}.poetry-close{width:40px;height:40px}.poetry-stage{padding:25px 0 12px}.poetry-stage h3{font-size:clamp(2.7rem,14vw,4.5rem);margin-bottom:20px}.poetry-lines{max-height:57vh;padding:5px 4px}.poetry-lines p{font-size:1rem;line-height:1.8}.poetry-controls .button{min-width:105px;padding:10px 12px;font-size:.78rem}}
@media(prefers-reduced-motion:reduce){.poetry-stage:before,.poetry-stage:after,.poetry-atmosphere i,.poetry-stage h3,.poetry-lines p{animation:none!important}.poetry-reader,.poetry-progress span{transition:none}}
`;
document.head.appendChild(poetryStyles);
