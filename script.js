/* ============================================================================
   BENJAMÍN ORTIZ · PORTAFOLIO v2  ·  script.js
   Contenido editable: data/projects.js  y  data/posts.js
   ========================================================================= */
(() => {
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const store = {
  get(k, d) { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} }
};

/* ─────────────────────────── IDIOMA ─────────────────────────── */
let LANG = store.get('bo_lang', 'es');

const T = {
  es: {
    cat:    { sim:'Simulación', vr:'Realidad virtual', war:'Bélico', horror:'Terror espacial', game:'Videojuego' },
    status: { shipped:'Publicado', wip:'En desarrollo', rnd:'I+D', concept:'Concepto' },
    sheet:'Ver ficha completa', role:'Rol', stack:'Stack', links:'Enlaces', key:'Puntos clave',
    gallery:'Galería', min:'min', placeholder:'Placeholder', read:'Leer entrada',
    searchPh:'Buscar en el devlog…', all:'Todos', noRes:'Sin resultados',
    copied:'Correo copiado al portapapeles', sect:'Sección', proj:'Proyecto', post:'Entrada',
    more:'Cargar más entradas', formErr:'Completa nombre, correo y mensaje.',
    formOk:'Abriendo tu cliente de correo…', roles:[
      'Simulación geoespacial en Unity DOTS',
      'Gemelos digitales y análisis de riesgo',
      'Realidad virtual multiusuario',
      'Diseño y desarrollo de videojuegos'
    ]
  },
  en: {
    cat:    { sim:'Simulation', vr:'Virtual reality', war:'Warfare', horror:'Space horror', game:'Game' },
    status: { shipped:'Shipped', wip:'In development', rnd:'R&D', concept:'Concept' },
    sheet:'Open full sheet', role:'Role', stack:'Stack', links:'Links', key:'Key points',
    gallery:'Gallery', min:'min', placeholder:'Placeholder', read:'Read entry',
    searchPh:'Search the devlog…', all:'All', noRes:'No results',
    copied:'Email copied to clipboard', sect:'Section', proj:'Project', post:'Entry',
    more:'Load more entries', formErr:'Please fill in name, email and message.',
    formOk:'Opening your email client…', roles:[
      'Geospatial simulation on Unity DOTS',
      'Digital twins and risk analysis',
      'Multiuser virtual reality',
      'Game design and development'
    ]
  }
};
const t = () => T[LANG];
const pick = (o, k) => (LANG === 'en' && o[k + '_en']) ? o[k + '_en'] : o[k];

function applyLang() {
  document.documentElement.lang = LANG;
  document.body.dataset.lang = LANG;
  $('#langLabel').textContent = LANG === 'es' ? 'EN' : 'ES';

  $$('[data-en]').forEach(el => {
    if (!el.dataset.es) el.dataset.es = el.innerHTML.trim();
    el.innerHTML = LANG === 'en' ? el.dataset.en : el.dataset.es;
  });
  $$('[data-en-ph]').forEach(el => {
    if (!el.dataset.esPh) el.dataset.esPh = el.placeholder;
    el.placeholder = LANG === 'en' ? el.dataset.enPh : el.dataset.esPh;
  });

  renderProjects();
  buildTagBar();
  renderPosts(true);
  buildPalette();
}

/* ─────────────────────────── PRELOADER ─────────────────────────── */
(function boot() {
  const box = $('#boot'), log = $('#bootLog'), bar = $('#bootBar');
  if (!box) return;
  const lines = [
    '> init render pipeline ......... OK',
    '> load terrain [DEM] .......... OK',
    '> compile burst jobs .......... OK',
    '> mount portfolio modules ..... OK'
  ];
  if (RM) { box.classList.add('done'); return; }
  let i = 0;
  const step = () => {
    if (i < lines.length) {
      log.textContent += (i ? '\n' : '') + lines[i];
      bar.style.width = ((++i) / lines.length * 100) + '%';
      setTimeout(step, 190);
    } else {
      setTimeout(() => box.classList.add('done'), 320);
    }
  };
  setTimeout(step, 160);
})();

/* ─────────────────────────── HERO CANVAS ─────────────────────────── */
(function heroTerrain() {
  const cv = $('#heroCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let mx = 0, my = 0, tx = 0, ty = 0, raf = 0, running = true;

  const ROWS = 30, COLS = 46;
  const stars = Array.from({ length: 90 }, () => ({
    x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + .25, a: Math.random() * .6 + .15
  }));

  function size() {
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  new ResizeObserver(size).observe(cv);
  size();

  addEventListener('mousemove', e => {
    tx = (e.clientX / innerWidth - .5) * 2;
    ty = (e.clientY / innerHeight - .5) * 2;
  }, { passive: true });

  const wave = (c, r, tm) =>
      Math.sin(c * .34 + tm * .55 + r * .18) * .55
    + Math.sin(c * .13 - tm * .8 + r * .07) * .45
    + Math.sin(r * .42 + tm * .35) * .35;

  function frame(now) {
    if (!running) return;
    const tm = now * .001;
    mx += (tx - mx) * .045; my += (ty - my) * .045;

    ctx.clearRect(0, 0, W, H);
    const horizon = H * .40 + my * 16;
    const cx = W / 2 - mx * 40;

    // cielo + estrellas
    const sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, 'rgba(10,14,24,1)');
    sky.addColorStop(1, 'rgba(24,14,10,1)');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, horizon + 2);
    stars.forEach(s => {
      ctx.globalAlpha = s.a * (.5 + .5 * Math.sin(tm * 1.4 + s.x * 40));
      ctx.fillStyle = '#9fd2ff';
      ctx.fillRect(s.x * W, s.y * horizon, s.r, s.r);
    });
    ctx.globalAlpha = 1;

    // resplandor de horizonte
    const gl = ctx.createRadialGradient(cx, horizon, 0, cx, horizon, W * .55);
    gl.addColorStop(0, 'rgba(255,122,47,.30)');
    gl.addColorStop(.5, 'rgba(255,122,47,.06)');
    gl.addColorStop(1, 'rgba(255,122,47,0)');
    ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);

    // malla del terreno
    const P = [];
    for (let r = 0; r <= ROWS; r++) {
      const d = r / ROWS;
      const dd = Math.pow(d, 2.1);
      const yb = horizon + dd * (H * .82);
      const spread = dd * W * 2.1 + W * .05;
      const amp = 8 + dd * 130;
      const row = [];
      for (let c = 0; c <= COLS; c++) {
        const x = cx + ((c / COLS) - .5) * spread;
        const y = yb - wave(c, r, tm) * amp * .5;
        row.push([x, y]);
      }
      P.push(row);
    }

    ctx.lineWidth = 1;
    for (let r = 0; r <= ROWS; r++) {
      const d = r / ROWS;
      ctx.beginPath();
      P[r].forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
      ctx.strokeStyle = `rgba(${Math.round(255 - d * 170)},${Math.round(122 + d * 66)},${Math.round(47 + d * 190)},${(.08 + d * .55).toFixed(3)})`;
      ctx.stroke();
    }
    for (let c = 0; c <= COLS; c += 1) {
      ctx.beginPath();
      for (let r = 0; r <= ROWS; r++) { const [x, y] = P[r][c]; r ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.strokeStyle = `rgba(77,215,255,${(.04 + (c % 4 === 0 ? .16 : .03))})`;
      ctx.stroke();
    }

    // línea de horizonte
    ctx.beginPath(); ctx.moveTo(0, horizon); ctx.lineTo(W, horizon);
    ctx.strokeStyle = 'rgba(255,150,90,.55)'; ctx.lineWidth = 1.4; ctx.stroke();

    raf = requestAnimationFrame(frame);
  }

  if (RM) {                       // versión estática accesible
    const g = ctx.createLinearGradient(0, 0, 0, cv.clientHeight);
    g.addColorStop(0, '#0a0e18'); g.addColorStop(1, '#140b07');
    ctx.fillStyle = g; ctx.fillRect(0, 0, cv.clientWidth, cv.clientHeight);
  } else {
    raf = requestAnimationFrame(frame);
    // pausa el canvas cuando el hero sale de pantalla
    new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running) raf = requestAnimationFrame(frame); else cancelAnimationFrame(raf);
    }, { threshold: 0 }).observe($('#hero'));
  }
})();

/* ─────────────────────────── HUD: reloj, fps, typed ─────────────────── */
(function hud() {
  const clock = $('#clock'), fps = $('#fps');
  const tick = () => {
    if (clock) clock.textContent = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  };
  tick(); setInterval(tick, 20000);

  if (fps && !RM) {
    let n = 0, last = performance.now();
    const loop = now => {
      n++;
      if (now - last >= 1000) { fps.textContent = n; n = 0; last = now; }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  const out = $('#typed');
  if (!out) return;
  let li = 0, ci = 0, del = false;
  const run = () => {
    const list = t().roles, s = list[li % list.length];
    ci += del ? -1 : 1;
    out.textContent = s.slice(0, ci);
    let d = del ? 28 : 52;
    if (!del && ci === s.length) { d = 1900; del = true; }
    else if (del && ci === 0) { del = false; li++; d = 320; }
    setTimeout(run, RM ? 4000 : d);
  };
  run();
})();

/* ─────────────────────────── NAV / SCROLL ─────────────────────────── */
(function nav() {
  const bar = $('#scrollBar'), navEl = $('#nav'), top = $('#toTop');
  const links = $$('#navLinks a'), secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);

  const onScroll = () => {
    const y = scrollY, h = document.body.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    navEl.classList.toggle('stuck', y > 40);
    top.classList.toggle('on', y > 700);

    let cur = secs[0];
    secs.forEach(s => { if (s.offsetTop - 140 <= y) cur = s; });
    links.forEach(a => a.classList.toggle('on', cur && a.getAttribute('href') === '#' + cur.id));
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  top.onclick = () => scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });

  const burger = $('#burger'), menu = $('#navLinks');
  burger.onclick = () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  };
  links.forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

/* ─────────────────────────── REVEAL / CONTADORES / BARRAS ─────────── */
const revealIO = new IntersectionObserver((es, o) => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } });
}, { threshold: .12, rootMargin: '0px 0px -40px' });
const watchReveal = () => $$('.reveal:not(.in)').forEach(el => revealIO.observe(el));
watchReveal();

(function counters() {
  const box = $('#heroStats'); if (!box) return;
  new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return; o.disconnect();
    $$('b[data-count]', box).forEach(b => {
      const end = +b.dataset.count, suf = b.dataset.suffix || '';
      if (RM) { b.textContent = end + suf; return; }
      let s = null;
      const step = ts => {
        if (!s) s = ts;
        const p = Math.min((ts - s) / 1400, 1);
        b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }), { threshold: .4 }).observe(box);
})();

(function bars() {
  const io = new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return;
    const f = $('.fill', e.target);
    if (f) f.style.width = (e.target.dataset.lvl || 60) + '%';
    o.unobserve(e.target);
  }), { threshold: .3 });

  $$('.bars li').forEach(li => {
    const f = document.createElement('span');
    f.className = 'fill';
    li.appendChild(f);
    io.observe(li);
  });
})();

/* ─────────────────────────── PROYECTOS ─────────────────────────── */
const PROJECTS = window.PROJECTS || [];
let projFilter = 'all';

const esc = s => String(s ?? '').replace(/[&<>"]/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[m]));
const catColor = c => `var(--c-${c || 'sim'})`;

function projectCard(p) {
  const cat = t().cat[p.cat] || p.cat;
  const st  = t().status[p.status] || '';
  return `
  <article class="pcard${p.featured ? ' wide' : ''}" style="--cc:${catColor(p.cat)}" data-proj="${p.id}" tabindex="0" role="button">
    <div class="pcard__media">
      <img src="${esc(p.cover)}" alt="${esc(pick(p,'title'))}" loading="lazy" />
      <div class="pcard__tags">
        <span class="badge badge--cat">${esc(cat)}</span>
        ${st ? `<span class="badge badge--st">${esc(st)}</span>` : ''}
        ${p.placeholder ? `<span class="badge badge--ph">${t().placeholder}</span>` : ''}
      </div>
      <span class="pcard__year">${esc(p.year || '')}</span>
    </div>
    <div class="pcard__body">
      <h3>${esc(pick(p,'title'))}</h3>
      <span class="pcard__role">${esc(pick(p,'role'))}</span>
      <p>${esc(pick(p,'tagline'))}</p>
      <div class="pcard__stack">${(p.stack||[]).slice(0,4).map(s=>`<span class="tech">${esc(s)}</span>`).join('')}</div>
      <span class="pcard__go">${t().sheet}<svg class="ic"><use href="#i-arrow"></use></svg></span>
    </div>
  </article>`;
}

function renderProjects() {
  const grid = $('#projGrid'); if (!grid) return;
  const list = PROJECTS.filter(p => projFilter === 'all' || p.cat === projFilter);
  grid.innerHTML = list.map(projectCard).join('');
  $('#projEmpty').hidden = list.length > 0;
  $$('[data-proj]', grid).forEach(el => {
    const open = () => openProject(el.dataset.proj);
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

$$('#projFilters .chip').forEach(b => b.onclick = () => {
  $$('#projFilters .chip').forEach(x => x.classList.remove('is-on'));
  b.classList.add('is-on');
  projFilter = b.dataset.cat;
  renderProjects();
});

const linkIcon = i => ({ play:'i-play', repo:'i-repo', drive:'i-drive', itch:'i-itch', doc:'i-doc', web:'i-web' }[i] || 'i-arrow');

function openProject(id) {
  const p = PROJECTS.find(x => x.id === id); if (!p) return;
  const cc = catColor(p.cat);
  const media = p.video
    ? `<div class="mhero" data-yt="${p.video}">
         <img src="${esc(p.cover)}" alt="" />
         <button class="playbtn" aria-label="Play"><svg class="ic"><use href="#i-play"></use></svg></button>
       </div>`
    : `<div class="mhero"><img src="${esc(p.cover)}" alt="" /></div>`;

  const html = `
    ${media}
    <div class="mbody" style="--cc:${cc}">
      <div class="mkicker">
        <span>${esc(t().cat[p.cat] || '')}</span><span>·</span>
        <span>${esc(t().status[p.status] || '')}</span><span>·</span>
        <span>${esc(p.year || '')}</span>
        ${p.placeholder ? `<span class="badge badge--ph">${t().placeholder}</span>` : ''}
      </div>
      <h2>${esc(pick(p,'title'))}</h2>
      <p class="mtag">${esc(pick(p,'tagline'))}</p>

      ${(p.metrics||[]).length ? `<div class="mmetrics">${p.metrics.map(m =>
        `<div><b>${esc(m.v)}</b><span>${esc(LANG==='en'&&m.k_en?m.k_en:m.k)}</span></div>`).join('')}</div>` : ''}

      <div class="mgrid">
        <div>
          <h4>${t().key}</h4>
          <ul class="mlist">${(p.bullets||[]).map(b => `<li>${esc(LANG==='en'?b.en:b.es)}</li>`).join('')}</ul>
        </div>
        <div class="mside">
          <div>
            <h4>${t().role}</h4>
            <p style="font-size:.9rem">${esc(pick(p,'role'))}${p.org ? `<br><span style="color:var(--txt-dim)">${esc(p.org)}</span>` : ''}</p>
          </div>
          <div>
            <h4>${t().stack}</h4>
            <div class="mstack">${(p.stack||[]).map(s => `<span class="tech">${esc(s)}</span>`).join('')}</div>
          </div>
          ${(p.links||[]).length ? `<div><h4>${t().links}</h4><div class="mlinks">${p.links.map(l =>
            `<a class="btn btn--line btn--sm" href="${esc(l.url)}" target="_blank" rel="noopener">
               <svg class="ic"><use href="#${linkIcon(l.icon)}"></use></svg>${esc(LANG==='en'&&l.label_en?l.label_en:l.label)}
             </a>`).join('')}</div></div>` : ''}
        </div>
      </div>

      ${(p.gallery||[]).length > 1 ? `<h4>${t().gallery}</h4>
        <div class="mgal">${p.gallery.map(g => `<img src="${esc(g)}" alt="" loading="lazy">`).join('')}</div>` : ''}
    </div>`;
  showModal(html);
}

/* ─────────────────────────── DEVLOG ─────────────────────────── */
const POSTS = (window.POSTS || []).slice().sort((a, b) => (a.date < b.date ? 1 : -1));
let postQuery = '', postTag = 'all', postShown = 6;
const PAGE = 6;

const tagColor = tg => {
  const pal = ['--c-game', '--c-sim', '--c-horror', '--c-war', '--c-vr'];
  let h = 0; for (const ch of tg) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return `var(${pal[h % pal.length]})`;
};
const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString(LANG === 'en' ? 'en-GB' : 'es-CL',
  { day: '2-digit', month: 'short', year: 'numeric' });

function buildTagBar() {
  const bar = $('#postTags'); if (!bar) return;
  const tags = [...new Set(POSTS.flatMap(p => p.tags || []))];
  bar.innerHTML = `<button class="chip${postTag === 'all' ? ' is-on' : ''}" data-tag="all">${t().all}</button>` +
    tags.map(tg => `<button class="chip${postTag === tg ? ' is-on' : ''}" data-tag="${esc(tg)}">${esc(tg)}</button>`).join('');
  $$('.chip', bar).forEach(b => b.onclick = () => {
    $$('.chip', bar).forEach(x => x.classList.remove('is-on'));
    b.classList.add('is-on'); postTag = b.dataset.tag; postShown = PAGE; renderPosts();
  });
}

function cover(p, cls) {
  if (p.cover) return `<img src="${esc(p.cover)}" alt="" loading="lazy">`;
  return `<div class="gencover" style="--cc:${tagColor((p.tags||['x'])[0])}">
            <svg class="ic"><use href="#i-spark"></use></svg></div>`;
}

function postMeta(p) {
  return `<div class="bmeta">
    <span><svg class="ic"><use href="#i-cal"></use></svg>${fmtDate(p.date)}</span>
    <span><svg class="ic"><use href="#i-clock"></use></svg>${p.read || 3} ${t().min}</span>
  </div>`;
}

function matches(p) {
  const q = postQuery.toLowerCase();
  const inTag = postTag === 'all' || (p.tags || []).includes(postTag);
  if (!inTag) return false;
  if (!q) return true;
  return (pick(p,'title') + ' ' + pick(p,'excerpt') + ' ' + (p.tags||[]).join(' ')).toLowerCase().includes(q);
}

function renderPosts(reset) {
  if (reset) postShown = PAGE;
  const pinBox = $('#postPinned'), grid = $('#postGrid'); if (!grid) return;

  const list = POSTS.filter(matches);
  const pin  = (!postQuery && postTag === 'all') ? list.find(p => p.pinned) : null;
  const rest = list.filter(p => p !== pin);

  pinBox.innerHTML = pin ? `
    <article class="pinned reveal" data-post="${pin.id}">
      <div class="pinned__media">${cover(pin)}</div>
      <div class="pinned__body">
        ${postMeta(pin)}
        <h3>${esc(pick(pin,'title'))}</h3>
        <p>${esc(pick(pin,'excerpt'))}</p>
        <div class="btags">${(pin.tags||[]).map(tg =>
          `<span class="tech" style="color:${tagColor(tg)}">${esc(tg)}</span>`).join('')}</div>
        <span class="pcard__go" style="--cc:var(--acc-2);color:var(--acc-2)">${t().read}
          <svg class="ic"><use href="#i-arrow"></use></svg></span>
      </div>
    </article>` : '';

  const page = rest.slice(0, postShown);
  grid.innerHTML = page.map(p => `
    <article class="bcard reveal" data-post="${p.id}">
      <div class="bcard__media">${cover(p)}</div>
      <div class="bcard__body">
        ${postMeta(p)}
        <h3>${esc(pick(p,'title'))}</h3>
        <p>${esc(pick(p,'excerpt'))}</p>
        <div class="btags">${(p.tags||[]).map(tg =>
          `<span class="tech" style="color:${tagColor(tg)}">${esc(tg)}</span>`).join('')}</div>
      </div>
    </article>`).join('');

  $('#postEmpty').hidden = list.length > 0;
  $('#morePosts').hidden = rest.length <= postShown;
  $('#morePosts').textContent = t().more;

  $$('[data-post]').forEach(el => el.onclick = () => openPost(el.dataset.post));
  watchReveal();
  requestAnimationFrame(() => $$('#postPinned .reveal, #postGrid .reveal').forEach(e => e.classList.add('in')));
}

$('#postSearch').addEventListener('input', e => { postQuery = e.target.value.trim(); renderPosts(true); });
$('#morePosts').onclick = () => { postShown += PAGE; renderPosts(); };

function openPost(id) {
  const p = POSTS.find(x => x.id === id); if (!p) return;
  const body = LANG === 'en' && p.body_en ? p.body_en : p.body;
  const head = p.cover ? `<div class="mhero"><img src="${esc(p.cover)}" alt=""></div>` : '';
  showModal(`${head}
    <article class="article">
      <div class="btags" style="margin-bottom:14px">${(p.tags||[]).map(tg =>
        `<span class="tech" style="color:${tagColor(tg)}">${esc(tg)}</span>`).join('')}</div>
      <h2>${esc(pick(p,'title'))}</h2>
      ${postMeta(p)}
      ${body || ''}
      ${p.link ? `<a class="btn btn--primary" href="${esc(p.link)}" target="_blank" rel="noopener">
        <svg class="ic"><use href="#i-arrow"></use></svg>${LANG==='en'?'Open external link':'Abrir enlace externo'}</a>` : ''}
    </article>`);
}

/* ─────────────────────────── MODAL ─────────────────────────── */
const modal = $('#modal'), modalBody = $('#modalBody');
let lastFocus = null;

function showModal(html) {
  lastFocus = document.activeElement;
  modalBody.innerHTML = html;
  modal.hidden = false;
  document.body.classList.add('lock');
  modal.querySelector('.modal__panel').scrollTop = 0;
  bindYT(modalBody);
  $('.modal__x').focus();
}
function hideModal() {
  modal.hidden = true;
  modalBody.innerHTML = '';
  document.body.classList.remove('lock');
  lastFocus && lastFocus.focus();
}
$$('[data-close]').forEach(el => el.onclick = hideModal);

/* YouTube perezoso (solo se carga al pulsar play) */
function bindYT(scope) {
  $$('[data-yt]', scope).forEach(box => {
    const btn = $('.playbtn', box); if (!btn) return;
    btn.onclick = e => {
      e.stopPropagation();
      const id = box.dataset.yt;
      box.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0"
        title="${esc(box.dataset.title || 'video')}" allow="accelerometer;autoplay;clipboard-write;encrypted-media;picture-in-picture"
        allowfullscreen loading="lazy"></iframe>`;
    };
  });
}
bindYT(document);

/* ─────────────────────────── COMMAND PALETTE ─────────────────────────── */
const palette = $('#palette'), pInput = $('#paletteInput'), pList = $('#paletteList');
let pItems = [], pSel = 0;

function buildPalette() {
  const secs = $$('#navLinks a').map(a => ({
    kind: t().sect, icon: 'i-arrow', label: a.textContent.trim(), sub: a.getAttribute('href'),
    run: () => { location.hash = a.getAttribute('href'); }
  }));
  const projs = PROJECTS.map(p => ({
    kind: t().proj, icon: 'i-cube', label: pick(p, 'title'), sub: pick(p, 'tagline'),
    run: () => { hidePalette(); openProject(p.id); }
  }));
  const posts = POSTS.map(p => ({
    kind: t().post, icon: 'i-doc', label: pick(p, 'title'), sub: (p.tags || []).join(' · '),
    run: () => { hidePalette(); openPost(p.id); }
  }));
  pItems = [...secs, ...projs, ...posts];
}

function drawPalette(q = '') {
  const s = q.toLowerCase();
  const hits = pItems.filter(i => (i.label + ' ' + i.sub).toLowerCase().includes(s)).slice(0, 24);
  pSel = 0;
  pList.innerHTML = hits.length ? hits.map((i, n) => `
    <li data-n="${n}" class="${n === 0 ? 'sel' : ''}">
      <svg class="ic"><use href="#${i.icon}"></use></svg>
      <span><b>${esc(i.label)}</b><em>${esc((i.sub || '').slice(0, 70))}</em></span>
      <span class="k">${esc(i.kind)}</span>
    </li>`).join('') : `<div class="palette__none">${t().noRes}</div>`;
  $$('li', pList).forEach(li => {
    li.onmouseenter = () => { $$('li', pList).forEach(x => x.classList.remove('sel')); li.classList.add('sel'); pSel = +li.dataset.n; };
    li.onclick = () => hits[+li.dataset.n].run();
  });
  pList._hits = hits;
}
function showPalette() {
  palette.hidden = false; document.body.classList.add('lock');
  pInput.value = ''; drawPalette(''); pInput.focus();
}
function hidePalette() { palette.hidden = true; document.body.classList.remove('lock'); }

$('#openPalette').onclick = showPalette;
$$('[data-pclose]').forEach(el => el.onclick = hidePalette);
pInput.addEventListener('input', e => drawPalette(e.target.value));
pInput.addEventListener('keydown', e => {
  const hits = pList._hits || [];
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (!hits.length) return;
    pSel = (pSel + (e.key === 'ArrowDown' ? 1 : -1) + hits.length) % hits.length;
    $$('li', pList).forEach((li, n) => li.classList.toggle('sel', n === pSel));
    $$('li', pList)[pSel].scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'Enter' && hits[pSel]) { e.preventDefault(); hits[pSel].run(); }
});

addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.hidden ? showPalette() : hidePalette(); }
  if (e.key === 'Escape') { if (!palette.hidden) hidePalette(); else if (!modal.hidden) hideModal(); }
});

/* ─────────────────────────── CONTACTO / UTIL ─────────────────────────── */
const toast = (() => {
  const el = document.createElement('div');
  el.className = 'toast'; document.body.appendChild(el);
  let tm;
  return msg => { el.textContent = msg; el.classList.add('on'); clearTimeout(tm); tm = setTimeout(() => el.classList.remove('on'), 2600); };
})();

$('#copyMail').onclick = async () => {
  const mail = $('#mailText').textContent.trim();
  try { await navigator.clipboard.writeText(mail); toast(t().copied); }
  catch { location.href = 'mailto:' + mail; }
};

$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, d = Object.fromEntries(new FormData(f));
  if (!d.name || !d.email || !d.message) { toast(t().formErr); return; }
  const subject = encodeURIComponent(d.subject || `[Portafolio] ${d.name}`);
  const body = encodeURIComponent(`${d.message}\n\n—\n${d.name}\n${d.email}`);
  toast(t().formOk);
  location.href = `mailto:benjaminortizlucero@gmail.com?subject=${subject}&body=${body}`;
});

$('#year').textContent = new Date().getFullYear();

$('#langToggle').onclick = () => {
  LANG = LANG === 'es' ? 'en' : 'es';
  store.set('bo_lang', LANG);
  applyLang();
};

/* ─────────────────────────── ARRANQUE ─────────────────────────── */
applyLang();
})();
