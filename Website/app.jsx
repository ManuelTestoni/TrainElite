/* ATHLYNK — App shell + routing + Tweaks */

const { useState: useS, useEffect: useE, useRef: useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "ornaments": 2
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = useS(getRouteFromHash());
  const [tweaks, setTweaks] = useS(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = useS(false);

  // Apply ornament intensity to root
  useE(() => {
    document.documentElement.dataset.orn = tweaks.ornaments;
  }, [tweaks.ornaments]);

  // Hash routing
  useE(() => {
    const onHash = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Tweak protocol
  useE(() => {
    const onMessage = (e) => {
      const data = e.data || {};
      if (data.type === '__activate_edit_mode') setEditMode(true);
      if (data.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const navigate = (to) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.location.hash = to;
    setRoute(to);
  };

  // Reveal on scroll wiring (single observer for the whole app — refreshed on route change)
  useE(() => {
    const els = document.querySelectorAll('.reveal, .reveal-line, .split-char');
    els.forEach((el) => el.classList.remove('in'));
    requestAnimationFrame(() => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            ent.target.classList.add('in');
            io.unobserve(ent.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
      els.forEach((el) => io.observe(el));
      // immediate reveal for above-the-fold
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) {
          setTimeout(() => el.classList.add('in'), 30);
        }
      });
    });
  }, [route]);

  const handleTweakChange = (key, val) => {
    const next = { ...tweaks, [key]: val };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  };

  const Page = {
    home: LandingPage,
    about: AboutPage,
    services: ServicesPage,
    pricing: PricingPage,
    faq: FaqPage,
  }[route] || LandingPage;

  // Determine if this page has its hero on a dark first section (none do; all start light)
  const navDark = false;

  return (
    <>
      <CursorFollow />
      <Nav route={route} navigate={navigate} dark={navDark} />
      <main key={route}><Page navigate={navigate} /></main>
      <Footer navigate={navigate} />

      {editMode && (
        <TweaksPanel onClose={() => {
          setEditMode(false);
          window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
        }}>
          <TweakSection title="Ornamenti greci">
            <TweakRadio
              label="Intensità"
              value={String(tweaks.ornaments)}
              options={[
                { value: '0', label: 'Whisper' },
                { value: '1', label: 'Refined' },
                { value: '2', label: 'Statement' },
              ]}
              onChange={(v) => handleTweakChange('ornaments', parseInt(v, 10))}
            />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginTop: 8 }}>
              Whisper nasconde ornamenti greci · Refined li riduce · Statement è la versione piena.
            </p>
          </TweakSection>
          <TweakSection title="Navigazione rapida">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {['home', 'about', 'services', 'pricing', 'faq'].map((r) => (
                <button key={r} onClick={() => navigate(r)} style={{
                  padding: '8px 10px',
                  background: route === r ? '#f4efe4' : 'rgba(255,255,255,0.06)',
                  color: route === r ? '#14110d' : '#f4efe4',
                  fontSize: 12,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: 0,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}>{r}</button>
              ))}
            </div>
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

function getRouteFromHash() {
  const h = (window.location.hash || '').replace('#', '');
  if (['home', 'about', 'services', 'pricing', 'faq'].includes(h)) return h;
  return 'home';
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
