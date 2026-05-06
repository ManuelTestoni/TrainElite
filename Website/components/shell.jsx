/* ATHLYNK — Shared components: Nav, Footer, hooks, Mockups */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- Hooks ----------
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-line, .split-char');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function SplitText({ text, tag = 'span', baseDelay = 0, step = 24, className = '' }) {
  const Tag = tag;
  const words = text.split(' ');
  let idx = 0;
  return (
    <Tag className={className}>
      {words.map((w, wi) =>
      <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {w.split('').map((ch, ci) => {
          const d = baseDelay + idx * step;
          idx++;
          return (
            <span key={ci} className="split-char" style={{ '--d': d + 'ms', fontFamily: "\"Bodoni Moda\"" }}>{ch}</span>);

        })}
          {wi < words.length - 1 && <span style={{ display: 'inline-block', width: '0.32em' }}> </span>}
        </span>
      )}
    </Tag>);

}

// ---------- Cursor sigil ----------
function CursorFollow() {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const onMove = (e) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      el.classList.add('active');
    };
    const onLeave = () => el.classList.remove('active');
    const tick = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.18;
      pos.current.y += (pos.current.ty - pos.current.y) * 0.18;
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target;
      if (t.closest && t.closest('a, button, .faq-item, .tier, .card, [data-cursor-hover]')) {
        el.classList.add('hover');
      } else {
        el.classList.remove('hover');
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className="sigil-cursor">
      <CursorSigil />
    </div>);

}

// ---------- Nav ----------
function Nav({ route, navigate, dark = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
  { to: 'home', label: 'Athlynk' },
  { to: 'about', label: 'Chi siamo' },
  { to: 'services', label: 'Servizi' },
  { to: 'pricing', label: 'Pricing' },
  { to: 'faq', label: 'FAQ' }];

  return (
    <>
      <nav className={`nav ${dark ? 'dark' : ''}`} style={{ boxShadow: scrolled ? '0 1px 0 rgba(20,17,13,0.06)' : 'none' }}>
        <a href="#home" onClick={(e) => {e.preventDefault();navigate('home');}} className="brand">
          <Sigil size={22} />
          <span>Athlynk</span>
        </a>
        <div className="links">
          {links.slice(1).map((l) =>
          <a key={l.to} href={`#${l.to}`} onClick={(e) => {e.preventDefault();navigate(l.to);}}
          className={route === l.to ? 'active' : ''}>{l.label}</a>
          )}
        </div>
        <div className="right">
          <a href="#login" className="link-u" style={{ fontSize: 13, letterSpacing: '0.04em' }}>Accedi</a>
          <a href="#cta" onClick={(e) => {e.preventDefault();navigate('pricing');}}
          className="btn btn-cta" style={dark ? { '--bg': 'var(--parchment)', '--fg': 'var(--ink)' } : {}}>
            <span>Inizia ora</span>
            <span className="arrow"></span>
          </a>
          <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 7 H19 M3 15 H19" stroke="currentColor" strokeWidth="1.2" /></svg>
          </button>
        </div>
      </nav>
      <div className={`mobile-sheet ${open ? 'open' : ''}`}>
        <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 24, right: 24, color: 'var(--parchment)' }}>
          <svg width="22" height="22" viewBox="0 0 22 22"><path d="M4 4 L18 18 M18 4 L4 18" stroke="currentColor" strokeWidth="1.2" /></svg>
        </button>
        {links.slice(1).map((l) =>
        <a key={l.to} href={`#${l.to}`} onClick={(e) => {e.preventDefault();navigate(l.to);setOpen(false);}}>{l.label}</a>
        )}
      </div>
    </>);

}

// ---------- Footer ----------
function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="col gap-16">
            <Wordmark size={26} color="var(--parchment)" />
            <p className="body" style={{ maxWidth: '32ch', marginTop: 12 }}>
              Coach e atleti, in connessione continua. Disciplina, piano e progressi in un solo ecosistema.
            </p>
            <div className="row gap-16" style={{ marginTop: 12 }}>
              <span className="ornament" style={{ opacity: 0.4 }}><Trident size={28} color="var(--bronze-light)" /></span>
              <span className="ornament" style={{ opacity: 0.4 }}><Bolt size={22} color="var(--bronze-light)" /></span>
              <span className="ornament" style={{ opacity: 0.4 }}><Laurel size={28} color="var(--bronze-light)" /></span>
            </div>
          </div>
          <div>
            <h5>Prodotto</h5>
            <ul>
              <li><a href="#services" onClick={(e) => {e.preventDefault();navigate('services');}}>Servizi</a></li>
              <li><a href="#pricing" onClick={(e) => {e.preventDefault();navigate('pricing');}}>Pricing</a></li>
              <li><a href="#chiron">Chiron AI</a></li>
              <li><a href="#changelog">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h5>Brand</h5>
            <ul>
              <li><a href="#about" onClick={(e) => {e.preventDefault();navigate('about');}}>Chi siamo</a></li>
              <li><a href="#manifest">Manifesto</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#contact">Contatti</a></li>
            </ul>
          </div>
          <div>
            <h5>Risorse</h5>
            <ul>
              <li><a href="#faq" onClick={(e) => {e.preventDefault();navigate('faq');}}>FAQ</a></li>
              <li><a href="#docs">Documentazione</a></li>
              <li><a href="#status">Status</a></li>
              <li><a href="#legal">Termini & Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="colophon">
          <span>© MMXXVI · Athlynk · Forgiato in Italia</span>
          <span>v 1.0 · Olympia release</span>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">Athlynk</div>
    </footer>);

}

// ---------- Mockup: Athlynk dashboard ----------
function DashboardMockup({ variant = 'coach', compact = false }) {
  return (
    <div className="mockup">
      <div className="chrome">
        <span className="dot"></span><span className="dot"></span><span className="dot"></span>
        <span className="url">athlynk.app/{variant === 'coach' ? 'dashboard' : 'today'}</span>
      </div>
      <div className="screen" style={{ aspectRatio: compact ? '4 / 3' : '16 / 10' }}>
        {variant === 'coach' ? <CoachUI /> : <ClientUI />}
      </div>
    </div>);

}

function CoachUI() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', height: '100%', fontSize: 11 }}>
      {/* sidebar */}
      <aside style={{ background: '#efe7d3', padding: 16, borderRight: '1px solid rgba(20,17,13,0.08)', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sigil size={14} /> Athlynk
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--ink-mute)', marginTop: 8 }}>STUDIO</div>
        {['Dashboard', 'Clienti', 'Programmi', 'Nutrizione', 'Calendario', 'Note'].map((it, i) =>
        <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', color: i === 1 ? 'var(--ink)' : 'var(--ink-mute)', fontWeight: i === 1 ? 600 : 400, height: "11px" }}>
            <span style={{ background: i === 1 ? 'var(--bronze)' : 'transparent', borderRadius: '50%', height: "20px", width: "22px", padding: "0px 0px 0px 14.976563px" }}>Allenamento</span>
            {it}
          </div>
        )}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, padding: 8, border: '1px solid rgba(20,17,13,0.08)' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ink)', color: 'var(--parchment)', display: 'grid', placeItems: 'center', fontSize: 10 }}>EM</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 500 }}>Elena M.</span>
            <span style={{ color: 'var(--ink-mute)', fontSize: 9 }}>Head Coach</span>
          </div>
        </div>
      </aside>
      {/* main */}
      <main style={{ padding: 18, overflow: 'hidden', background: '#faf6ec' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--ink-mute)' }}>CLIENTI · 24 ATTIVI</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 22, marginTop: 2 }}>Roster</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ padding: '4px 10px', border: '1px solid rgba(20,17,13,0.2)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tutti</span>
            <span style={{ padding: '4px 10px', background: 'var(--ink)', color: 'var(--parchment)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' }}>+ Nuovo</span>
          </div>
        </div>
        {/* table */}
        <div style={{ border: '1px solid rgba(20,17,13,0.08)' }}>
          {[
          { n: 'Marco Costa', p: 'Hypertrophy · Wk 4', adh: 92, tone: 'var(--aegean)' },
          { n: 'Sara Bellini', p: 'Cut + Macro Plan', adh: 88, tone: 'var(--bronze)' },
          { n: 'Luca Vinci', p: 'Endurance Block', adh: 76, tone: 'var(--aegean)' },
          { n: 'Anna Greco', p: 'Recovery Phase', adh: 95, tone: 'var(--bronze)' },
          { n: 'Davide Conti', p: 'Strength · Wk 2', adh: 81, tone: 'var(--aegean)' }].
          map((r, i) =>
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1fr 60px', gap: 10, padding: '10px 12px', borderTop: i ? '1px solid rgba(20,17,13,0.06)' : 'none', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: r.tone, color: 'white', display: 'grid', placeItems: 'center', fontSize: 8 }}>{r.n.split(' ').map((s) => s[0]).join('')}</div>
                <span>{r.n}</span>
              </div>
              <span style={{ color: 'var(--ink-mute)' }}>{r.p}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, height: 3, background: 'rgba(20,17,13,0.08)' }}>
                  <div style={{ width: `${r.adh}%`, height: '100%', background: 'var(--ink)' }}></div>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9 }}>{r.adh}%</span>
              </div>
              <span style={{ textAlign: 'right', color: 'var(--ink-mute)' }}>↗</span>
            </div>
          )}
        </div>
      </main>
    </div>);

}

function ClientUI() {
  return (
    <div style={{ padding: 22, fontSize: 11, height: '100%', overflow: 'hidden', background: '#faf6ec' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--ink-mute)' }}>MARTEDÌ · SETTIMANA 4</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 26, marginTop: 4 }}>Buongiorno, Marco.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', border: '1px solid rgba(20,17,13,0.2)' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--aegean)' }}></span>
          <span style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Coach Elena · online</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        {/* workout card */}
        <div style={{ background: 'var(--ink)', color: 'var(--parchment)', padding: 18, position: 'relative' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', opacity: 0.6 }}>ALLENAMENTO · UPPER A</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 22, marginTop: 6 }}>Push · 6 esercizi</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
            {['Panca piana', 'Military press', 'Croci ai cavi', 'Dip parallele', 'French press', 'Alzate laterali'].map((ex, i) =>
            <div key={ex} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', opacity: i < 2 ? 1 : 0.6 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 12, height: 12, border: '1px solid rgba(255,255,255,0.4)', display: 'grid', placeItems: 'center', fontSize: 8, background: i < 2 ? 'var(--bronze-light)' : 'transparent', color: i < 2 ? 'var(--ink)' : 'transparent' }}>✓</span>
                  {ex}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, opacity: 0.7 }}>4 × 10</span>
              </div>
            )}
          </div>
        </div>
        {/* nutrition + progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: '#efe7d3', padding: 14, border: '1px solid rgba(20,17,13,0.06)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--ink-mute)' }}>NUTRIZIONE · OGGI</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 18, marginTop: 4 }}>2 240 kcal</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              {[{ l: 'P', v: 78, t: 180 }, { l: 'C', v: 60, t: 220 }, { l: 'F', v: 45, t: 70 }].map((m) =>
              <div key={m.l} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ height: 26, background: 'rgba(20,17,13,0.06)', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${m.v / m.t * 100}%`, background: 'var(--aegean)' }}></div>
                  </div>
                  <span style={{ fontSize: 9, color: 'var(--ink-mute)', textAlign: 'center' }}>{m.l} · {m.v}/{m.t}</span>
                </div>
              )}
            </div>
          </div>
          <div style={{ background: '#efe7d3', padding: 14, border: '1px solid rgba(20,17,13,0.06)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--ink-mute)' }}>PROGRESSO · 30 GIORNI</div>
            <svg width="100%" height="44" viewBox="0 0 200 44" style={{ marginTop: 6 }}>
              <path d="M0 32 L20 28 L40 30 L60 24 L80 22 L100 18 L120 16 L140 12 L160 14 L180 8 L200 6"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" />
              <path d="M0 32 L20 28 L40 30 L60 24 L80 22 L100 18 L120 16 L140 12 L160 14 L180 8 L200 6 L200 44 L0 44 Z"
              fill="var(--bronze)" opacity="0.15" />
            </svg>
          </div>
        </div>
      </div>
    </div>);

}

Object.assign(window, { useReveal, SplitText, CursorFollow, Nav, Footer, DashboardMockup, CoachUI, ClientUI });