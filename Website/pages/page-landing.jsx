/* ATHLYNK — Landing page */

function LandingPage({ navigate }) {
  return (
    <div className="page" data-screen-label="01 Landing">
      <Hero navigate={navigate} />
      <MarqueeStrip />
      <ProductShowcase />
      <DualEcosystem />
      <Workflow />
      <ChironModule />
      <ValueProps />
      <PricingPreview navigate={navigate} />
      <SocialProof />
      <FinalCTA navigate={navigate} />
    </div>);

}

// ---------- HERO ----------
function Hero({ navigate }) {
  return (
    <section className="section" style={{ position: 'relative', minHeight: '100vh', paddingTop: 140, paddingBottom: 0, overflow: 'hidden' }}>
      {/* monumental columns backdrop */}
      <div className="columns-stage ornament" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6].map((i) =>
        <div className="col-wrap" key={i}>
            <div className="column">
              <div className="capital"></div>
              <div className="shaft"></div>
              <div className="base"></div>
            </div>
          </div>
        )}
      </div>
      <div className="pediment ornament" aria-hidden="true"></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, paddingTop: 'clamp(20px, 4vw, 64px)' }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="eyebrow">Coaching · Nutrizione · Performance</span>
            <span className="tag">EST · MMXXVI</span>
          </div>
          <h1 className="h-mega" style={{ textAlign: 'center', maxWidth: '14ch', margin: '0 auto' }}>
            <SplitText text="Disciplina," tag="span" baseDelay={0} step={22} /><br />
            <span className="font-display-i" style={{ color: 'var(--aegean)' }}>
              <SplitText text="scolpita." tag="span" baseDelay={300} step={22} />
            </span>
          </h1>
          <p className="lede reveal" style={{ textAlign: 'center', margin: '0 auto', '--d': '900ms', fontFamily: "S\xF6hne", fontSize: "22.200001px" }}>Athlynk è la piattaforma che tiene coach e atleta in connessione continua: allenamento, nutrizione e progressi, in un unico ecosistema.


          </p>
          <div className="row reveal" style={{ justifyContent: 'center', marginTop: 12, '--d': '1100ms' }}>
            <button onClick={() => navigate('pricing')} className="btn">
              <span>Inizia il tuo percorso</span>
              <span className="arrow"></span>
            </button>
            <button onClick={() => navigate('services')} className="btn btn-ghost">
              <span>Esplora la piattaforma</span>
              <span className="arrow"></span>
            </button>
          </div>

          {/* product preview floating below */}
          <div style={{ marginTop: 'clamp(40px, 7vw, 90px)', position: 'relative' }} className="reveal" data-d="1300">
            <div style={{ maxWidth: 1080, margin: '0 auto', transform: 'perspective(2000px) rotateX(2deg)' }}>
              <DashboardMockup variant="coach" />
            </div>
            {/* corner ornaments */}
            <div className="ornament" style={{ position: 'absolute', top: -28, left: 0, opacity: 0.5 }}>
              <Meander height={14} color="var(--ink)" width={120} />
            </div>
            <div className="ornament" style={{ position: 'absolute', top: -28, right: 0, opacity: 0.5, transform: 'scaleX(-1)' }}>
              <Meander height={14} color="var(--ink)" width={120} />
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ---------- Marquee ----------
function MarqueeStrip() {
  const items = ['Connessione continua', 'Coach · Atleta · AI', 'ΑΘΛΗΤΗΣ · ΑΘΛΗΤΡΙΑ', 'Rivoluzione', 'Ecosistema', 'Coach · Atleta · AI', 'ΑΘΛΗΤΗΣ · ΑΘΛΗΤΡΙΑ', 'EST · MMXXVI'];
  return (
    <section style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', padding: '24px 0', overflow: 'hidden' }}>
      <div className="marquee">
        <div className="marquee-track">
          {[...items, ...items].map((t, i) =>
          <span key={i} className="font-display" style={{ fontSize: 26, display: 'inline-flex', alignItems: 'center', gap: 80 }}>
              {t}
              <span className="ornament"><Bolt size={16} color="var(--bronze)" /></span>
            </span>
          )}
        </div>
      </div>
    </section>);

}

// ---------- Product showcase ----------
function ProductShowcase() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 64 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
            <div style={{ maxWidth: '60ch' }}>
              <span className="section-index reveal">[ Capitolo 01 ] · Il prodotto</span>
              <h2 className="h-1 reveal" style={{ marginTop: 16, '--d': '120ms' }}>
                Una sola sede.<br /><span className="font-display-i" style={{ color: 'var(--bronze)' }}>Mille percorsi.</span>
              </h2>
            </div>
            <p className="lede reveal" style={{ '--d': '240ms' }}>
              Programmi, piani alimentari, note operative e dialogo con il cliente
              non più sparsi tra fogli, chat e PDF. Tutto convive in un'unica architettura.
            </p>
          </div>

          <div className="grid-3 reveal" style={{ '--d': '300ms' }}>
            {[
            { idx: '01', t: 'Allenamento', d: 'Programmi modulari, su misura e adatti a te, in un unico pannello.' },
            { idx: '02', t: 'Nutrizione', d: 'Macro, alternative, scaling per fase. Modifiche live, log del cliente in chiaro.' },
            { idx: '03', t: 'Monitoraggio', d: 'Note, audio, video, foto, allegati. Non sei mai da solo.' }].
            map((c) =>
            <div key={c.idx} className="reveal-line" style={{ paddingTop: 24 }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="tag">{c.idx}</span>
                  <span className="ornament"><SealPlus size={20} color="var(--ink-mute)" /></span>
                </div>
                <h3 className="h-3" style={{ marginTop: 28 }}>{c.t}</h3>
                <p className="body" style={{ marginTop: 12 }}>{c.d}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ---------- Dual ecosystem ----------
function DualEcosystem() {
  const [tab, setTab] = useState('coach');
  const indicatorRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    if (!tabsRef.current || !indicatorRef.current) return;
    const active = tabsRef.current.querySelector(`button[data-t="${tab}"]`);
    if (active) {
      indicatorRef.current.style.transform = `translateX(${active.offsetLeft}px)`;
      indicatorRef.current.style.width = `${active.offsetWidth}px`;
    }
  }, [tab]);

  return (
    <section className="section dark-section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="section-index">[ Capitolo 02 ] · Due ecosistemi</span>
            <h2 className="h-1" style={{ marginTop: 16 }}>
              Studio del coach.<br />
              <span className="font-display-i" style={{ color: 'var(--bronze-light)' }}>Tempio dell'atleta.</span>
            </h2>
          </div>
          <div className="tabs" ref={tabsRef} style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <span className="indicator" ref={indicatorRef}></span>
            <button data-t="coach" className={tab === 'coach' ? 'active' : ''} onClick={() => setTab('coach')}>Coach</button>
            <button data-t="client" className={tab === 'client' ? 'active' : ''} onClick={() => setTab('client')}>Atleta</button>
          </div>
        </div>

        <div className="split-stage" style={{ background: 'var(--ink-soft)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className={`split-pane ${tab === 'coach' ? 'active' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Per il Coach</span>
              <h3 className="h-2" style={{ marginTop: 16 }}>Controllo totale, zero attrito.</h3>
              <p className="lede" style={{ marginTop: 16, color: 'rgba(244,239,228,0.7)' }}>
                Dal singolo cliente alla gestione di duecento e oltre. Pianifichi, monitori, intervieni
                con la lucidità di chi vede tutto in un'unica vista.
              </p>
              <ul style={{ listStyle: 'none', marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['Gestionale centralizzato con stati e adesione', 'Programmi modulari riusabili e versionati', 'Piani alimentari con scaling automatico', 'Note operative ricche, audio, allegati', 'Grafici e insight del progresso'].map((f) =>
                <li key={f} style={{ display: 'flex', gap: 14, alignItems: 'baseline', fontSize: 15 }}>
                    <Check size={11} color="var(--bronze-light)" />
                    {f}
                  </li>
                )}
              </ul>
            </div>
            <DashboardMockup variant="coach" />
          </div>
          <div className={`split-pane ${tab === 'client' ? 'active' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Per l'Atleta</span>
              <h3 className="h-2" style={{ marginTop: 16 }}>Chiarezza ogni giorno.</h3>
              <p className="lede" style={{ marginTop: 16, color: 'rgba(244,239,228,0.7)' }}>
                Apri Athlynk e sai cosa fare. Allenamento, dieta, note, dialogo con il coach
                tutto a portata di un click.
              </p>
              <ul style={{ listStyle: 'none', marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['Allenamento del giorno, già pronto', 'Macro e alternative chiare', 'Spazio personale per note e progressi', 'Continuità del percorso, sempre', 'Conversazione diretta con il coach'].map((f) =>
                <li key={f} style={{ display: 'flex', gap: 14, alignItems: 'baseline', fontSize: 15 }}>
                    <Check size={11} color="var(--bronze-light)" />
                    {f}
                  </li>
                )}
              </ul>
            </div>
            <DashboardMockup variant="client" />
          </div>
        </div>
      </div>
    </section>);

}

// ---------- Workflow / How it works ----------
function Workflow() {
  const steps = [
  { n: 'I', t: 'Onboarding', d: 'Importi clienti, modelli, archivio storico. La piattaforma adotta il tuo metodo, non il contrario.' },
  { n: 'II', t: 'Pianificazione', d: 'Costruisci programmi e piani alimentari da blocchi modulari. Versioni, cicli, fasi sempre tracciate.' },
  { n: 'III', t: 'Connessione', d: 'L\'atleta riceve il piano in un\'app pulita. Esegue, registra, commenta. Tu vedi tutto in tempo reale.' },
  { n: 'IV', t: 'Iterazione', d: 'Grafici e insight di adesione e progresso. Modifichi al volo, motivi, riallinei. Il percorso non si interrompe mai.' }];

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, marginBottom: 56, alignItems: 'flex-end' }}>
          <div style={{ gridColumn: 'span 6' }}>
            <span className="section-index reveal">[ Capitolo 03 ] · Il metodo</span>
            <h2 className="h-1 reveal" style={{ marginTop: 16, '--d': '120ms' }}>
              Quattro atti.<br />
              <span className="font-display-i" style={{ color: 'var(--aegean)' }}>Una sola visione.</span>
            </h2>
          </div>
        </div>

        <div>
          {steps.map((s, i) =>
          <div className="step reveal" key={s.n} style={{ '--d': `${i * 80}ms` }}>
              <div>
                <span className="font-display" style={{ fontSize: 56, color: 'var(--bronze)' }}>{s.n}</span>
              </div>
              <div>
                <h3 className="h-3">{s.t}</h3>
              </div>
              <div className="step-detail">
                <p className="body">{s.d}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ---------- Chiron AI module ----------
function ChironModule() {
  return (
    <section className="section" style={{ background: 'var(--marble)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 56 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16 }}>
            <span className="section-index">[ Capitolo 04 ] · Intelligenza</span>
            <span className="tag">Add-on premium</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <h2 className="h-1 reveal">
                <span className="font-display-i">Chiron.</span><br />
                Il consigliere<br />silenzioso.
              </h2>
              <p className="lede mt-32 reveal" style={{ '--d': '120ms' }}>
                Ispirato al centauro che educò Achille, Chiron osserva il roster, suggerisce aggiustamenti,
                redige bozze, sintetizza adesione. Non sostituisce il coach. Lo amplifica.
              </p>
              <div className="grid-2 mt-48">
                {[
                { t: 'Sintesi cliente', d: 'Una nota strutturata su ogni atleta, aggiornata in tempo reale.' },
                { t: 'Bozze di programma', d: 'Punti di partenza modulari, sempre da approvare manualmente.' },
                { t: 'Aderenza intelligente', d: 'Pattern di compliance e segnali di allerta, prima che diventino problemi.' },
                { t: 'Risposte assistite', d: 'Risposte ai messaggi degli atleti, nel tono del coach.' }].
                map((f) =>
                <div key={f.t} className="reveal-line" style={{ paddingTop: 16 }}>
                    <h4 className="h-4">{f.t}</h4>
                    <p className="small mt-8">{f.d}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chiron visual */}
            <div style={{ position: 'relative', aspectRatio: '1 / 1.05', display: 'grid', placeItems: 'center' }}>
              <div style={{
                position: 'absolute', inset: '8%',
                background: 'radial-gradient(circle at 50% 45%, rgba(28,74,82,0.12), transparent 60%)'
              }}></div>
              <svg viewBox="0 0 400 420" style={{ width: '100%', height: '100%' }} aria-hidden="true">
                {/* outer seal */}
                <circle cx="200" cy="210" r="190" fill="none" stroke="var(--ink)" strokeWidth="0.8" opacity="0.4" />
                <circle cx="200" cy="210" r="170" fill="none" stroke="var(--ink)" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.4" />
                <circle cx="200" cy="210" r="140" fill="none" stroke="var(--bronze)" strokeWidth="1" />
                {/* radiating lines */}
                {Array.from({ length: 36 }).map((_, i) => {
                  const a = i / 36 * Math.PI * 2;
                  const x1 = 200 + Math.cos(a) * 145;
                  const y1 = 210 + Math.sin(a) * 145;
                  const x2 = 200 + Math.cos(a) * (i % 3 === 0 ? 168 : 152);
                  const y2 = 210 + Math.sin(a) * (i % 3 === 0 ? 168 : 152);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth="0.6" opacity="0.5" />;
                })}
                {/* central monogram — X (chi) */}
                <g transform="translate(200,210)">
                  <text textAnchor="middle" dominantBaseline="central" fontFamily="Bodoni Moda, serif" fontSize="160" fill="var(--ink)">Χ</text>
                </g>
                <text x="200" y="380" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="6" fill="var(--ink-mute)">CHIRON · ASSISTANT</text>
                <text x="200" y="50" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="6" fill="var(--ink-mute)">SAPIENS · DISCRETUS</text>
              </svg>
            </div>
          </div>

          <blockquote className="font-display-i reveal" style={{ fontSize: 'clamp(28px, 3.6vw, 52px)', lineHeight: 1.15, maxWidth: '24ch', marginTop: 48, paddingLeft: 32, borderLeft: '1px solid var(--bronze)' }}>
            "L'AI è l'aiutante del maestro. Mai la sua voce."
            <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 11, fontStyle: 'normal', letterSpacing: '0.18em', marginTop: 16, color: 'var(--ink-mute)' }}>— ATHLYNK</span>
          </blockquote>
        </div>
      </div>
    </section>);

}

// ---------- Value props ----------
function ValueProps() {
}

// ---------- Pricing preview ----------
function PricingPreview({ navigate }) {
  return (
    <section className="section dark-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-index">[ Capitolo 05 ] · Tier</span>
          <h2 className="h-1" style={{ marginTop: 16 }}>
            Tre livelli. <span className="font-display-i" style={{ color: 'var(--bronze-light)' }}>Una sola promessa.</span>
          </h2>
        </div>
        <div className="grid-3">
          {[
          { n: 'Hermes', p: '€19', d: 'Per il professionista che parte. Fino a 10 atleti.', icon: Bolt },
          { n: 'Athena', p: '€49', d: 'Per lo studio in crescita. Fino a 60 atleti, Chiron incluso.', icon: Capital, featured: true },
          { n: 'Zeus', p: '€129', d: 'Per i team strutturati. Atleti illimitati, multi-coach, API.', icon: Trident }].
          map((t) =>
          <div key={t.n} style={{
            border: '1px solid rgba(255,255,255,0.14)',
            padding: 32,
            background: t.featured ? 'var(--bronze)' : 'transparent',
            color: t.featured ? 'var(--ink)' : 'inherit'
          }}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="font-display" style={{ fontSize: 28 }}>{t.n}</span>
                <span className="ornament"><t.icon size={28} color={t.featured ? 'var(--ink)' : 'var(--bronze-light)'} /></span>
              </div>
              <div style={{ marginTop: 32 }}>
                <span className="font-display" style={{ fontSize: 56 }}>{t.p}</span>
                <span style={{ fontSize: 14, opacity: 0.6 }}> · / mese</span>
              </div>
              <p className="body" style={{ marginTop: 16, color: t.featured ? 'rgba(20,17,13,0.7)' : 'rgba(244,239,228,0.7)' }}>{t.d}</p>
            </div>
          )}
        </div>
        <div className="text-center mt-48">
          <button onClick={() => navigate('pricing')} className="btn" style={{ '--bg': 'var(--parchment)', '--fg': 'var(--ink)' }}>
            <span>Pricing completo</span><span className="arrow"></span>
          </button>
        </div>
      </div>
    </section>);

}

// ---------- Social proof / numbers ----------
function SocialProof() {
}

// ---------- Final CTA ----------
function FinalCTA({ navigate }) {
  return (
    <section className="section" style={{ background: 'var(--ink)', color: 'var(--parchment)', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <span className="ornament" style={{ display: 'inline-block', opacity: 0.5 }}>
          <Meander height={14} color="var(--bronze-light)" width={180} />
        </span>
        <h2 className="h-mega reveal" style={{ marginTop: 32, lineHeight: 0.95 }}>
          Inizia.<br />
          <span className="font-display-i" style={{ color: 'var(--bronze-light)' }}>Costruisci.</span><br />
          Resta.
        </h2>
        <p className="lede mt-32 reveal" style={{ margin: '32px auto 0', color: 'rgba(244,239,228,0.7)', '--d': '180ms' }}>
          Trenta giorni di prova. Nessun vincolo. La piattaforma adotta il tuo metodo dal primo accesso.
        </p>
        <div className="row mt-48 reveal" style={{ justifyContent: 'center', '--d': '300ms' }}>
          <button onClick={() => navigate('pricing')} className="btn" style={{ '--bg': 'var(--parchment)', '--fg': 'var(--ink)' }}>
            <span>Scegli il tuo piano</span><span className="arrow"></span>
          </button>
          <button onClick={() => navigate('about')} className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--parchment)' }}>
            <span>Conosci il brand</span><span className="arrow"></span>
          </button>
        </div>
      </div>
    </section>);

}

Object.assign(window, { LandingPage });