/* ATHLYNK — Pricing */

function PricingPage({ navigate }) {
  const [period, setPeriod] = useState('monthly'); // monthly | annual
  const [chiron, setChiron] = useState(true);

  const tiers = [
    {
      n: 'Hermes',
      role: 'Il messaggero',
      tagline: 'Per chi inizia.',
      desc: 'Il primo passo nel tempio. Pensato per il professionista solo, fino a dieci atleti seguiti con cura artigianale.',
      monthly: 19, annual: 15,
      icon: Bolt,
      color: 'var(--ink)',
      features: [
        '10 atleti attivi',
        'Programmi modulari illimitati',
        'Piani alimentari base',
        'Note operative testuali',
        'Area cliente completa',
      ],
      excludes: ['Audio note', 'Multi-coach', 'API, esportazioni avanzate'],
    },
    {
      n: 'Athena',
      role: 'La stratega',
      tagline: 'Per chi cresce.',
      desc: 'Lo strumento dello studio in espansione. Capacity reale, monitoraggio strutturato, tutto il prodotto, niente di superfluo.',
      monthly: 49, annual: 39,
      icon: Capital,
      color: 'var(--bronze)',
      featured: true,
      features: [
        '60 atleti attivi',
        'Programmi modulari illimitati',
        'Piani alimentari avanzati con scaling',
        'Note ricche · audio · allegati',
        'Area cliente completa',
        'Esportazioni eleganti · report PDF',
        'Calendario coach unificato',
      ],
      excludes: ['Multi-coach', 'API'],
    },
    {
      n: 'Zeus',
      role: 'Il sovrano',
      tagline: 'Per chi guida un team.',
      desc: 'L\'olimpo del prodotto. Atleti illimitati, multi-coach, integrazioni, dashboard amministrative. Pensato per i team strutturati.',
      monthly: 129, annual: 99,
      icon: Trident,
      color: 'var(--aegean)',
      features: [
        'Atleti illimitati',
        'Tutto Athena, ampliato',
        'Multi-coach con permessi',
        'Dashboard amministrativa',
        'API · webhook · esportazioni custom',
        'SSO · SLA dedicato',
        'Onboarding guidato 1:1',
      ],
      excludes: [],
    },
  ];

  return (
    <div className="page" data-screen-label="04 Pricing">
      {/* Hero */}
      <section className="section" style={{ paddingTop: 160, paddingBottom: 64 }}>
        <div className="container">
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 48 }}>
            <span className="eyebrow">Tre tier · Una promessa</span>
            <span className="tag">Vol · III</span>
          </div>
          <h1 className="h-mega" style={{ maxWidth: '14ch' }}>
            <SplitText text="Scegli il tuo" />
            <br />
            <span className="font-display-i" style={{ color: 'var(--bronze)' }}>
              <SplitText text="livello." baseDelay={400} />
            </span>
          </h1>
          <p className="lede mt-32 reveal" style={{ '--d': '500ms', maxWidth: '52ch' }}>
            Tre piani con una gerarchia limpida. L'estensione Chiron si aggiunge a qualsiasi piano,
            quando vuoi. Trenta giorni di prova senza vincoli, su ogni tier.
          </p>

          {/* Toggles */}
          <div className="row mt-48" style={{ gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="tabs" style={{ borderColor: 'var(--rule-strong)' }}>
              <span className="indicator" style={{
                transform: `translateX(${period === 'monthly' ? 0 : 100}%)`,
                width: '50%',
                top: 0, bottom: 0, left: 0,
                background: 'var(--ink)',
                position: 'absolute',
                transition: 'transform 0.5s var(--ease-out)',
              }}></span>
              <button onClick={() => setPeriod('monthly')} className={period === 'monthly' ? 'active' : ''}>Mensile</button>
              <button onClick={() => setPeriod('annual')} className={period === 'annual' ? 'active' : ''}>Annuale · −20 %</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 20px', border: '1px solid var(--rule-strong)' }}>
              <span className="tag" style={{ letterSpacing: '0.18em' }}>Chiron AI</span>
              <button
                onClick={() => setChiron(!chiron)}
                aria-pressed={chiron}
                style={{
                  width: 42, height: 22, borderRadius: 22, position: 'relative',
                  background: chiron ? 'var(--ink)' : 'rgba(20,17,13,0.15)',
                  transition: 'background 0.4s',
                }}
              >
                <span style={{
                  position: 'absolute', top: 3, left: chiron ? 23 : 3,
                  width: 16, height: 16, borderRadius: '50%',
                  background: chiron ? 'var(--bronze-light)' : 'var(--parchment)',
                  transition: 'left 0.4s var(--ease-out)',
                }}></span>
              </button>
              <span style={{ fontSize: 13, color: chiron ? 'var(--ink)' : 'var(--ink-mute)' }}>
                {chiron ? '+ €15 / mese, incluso' : 'Esteso al piano'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section style={{ paddingBottom: 48 }}>
        <div className="container">
          <div className="grid-3">
            {tiers.map((t) => {
              const base = period === 'monthly' ? t.monthly : t.annual;
              const total = chiron ? base + 15 : base;
              return (
                <div key={t.n} className={`tier ${t.featured ? 'featured' : ''} reveal`}>
                  {t.featured && (
                    <span className="tag" style={{
                      position: 'absolute', top: 18, right: 24,
                      color: 'var(--bronze-light)',
                    }}>Più scelto</span>
                  )}
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="font-display" style={{ fontSize: 36, lineHeight: 1 }}>{t.n}</span>
                      <span className="tag" style={{ display: 'block', marginTop: 6, color: t.featured ? 'rgba(244,239,228,0.5)' : 'var(--ink-mute)' }}>{t.role}</span>
                    </div>
                    <span className="ornament" style={{ opacity: 0.85 }}>
                      <t.icon size={32} color={t.featured ? 'var(--bronze-light)' : t.color} />
                    </span>
                  </div>

                  <p className="body tier-desc" style={{ marginTop: 8, maxWidth: '34ch' }}>{t.desc}</p>

                  <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                    <span className="font-display" style={{ fontSize: 72, lineHeight: 0.95 }}>€{total}</span>
                    <span className="price-suffix" style={{ fontSize: 14 }}>/ mese</span>
                  </div>
                  <span className="small price-suffix" style={{ marginTop: -8 }}>
                    {chiron && <>base €{base} + Chiron €15 · </>}
                    {period === 'annual' ? 'fatturato annualmente' : 'fatturato mensilmente'}
                  </span>

                  <button className="btn mt-16" style={t.featured ? { '--bg': 'var(--bronze-light)', '--fg': 'var(--ink)' } : {}}>
                    <span>Scegli {t.n}</span><span className="arrow"></span>
                  </button>

                  <div style={{ marginTop: 24 }}>
                    {t.features.map((f) => (
                      <div key={f} className="tier-feat-line" style={t.featured ? { borderColor: 'rgba(255,255,255,0.1)' } : {}}>
                        <Check size={12} color={t.featured ? 'var(--bronze-light)' : 'var(--bronze)'} />
                        <span>{f}</span>
                      </div>
                    ))}
                    {t.excludes.map((f) => (
                      <div key={f} className="tier-feat-line" style={{
                        opacity: 0.4,
                        borderColor: t.featured ? 'rgba(255,255,255,0.1)' : 'var(--rule-faint)',
                      }}>
                        <span style={{ flex: '0 0 14px', marginTop: 6, height: 1, background: 'currentColor' }}></span>
                        <span style={{ textDecoration: 'line-through' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chiron extension visual */}
      <section className="section" style={{ background: 'var(--marble)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="section-index">[ Add-on ]</span>
              <h2 className="h-1 mt-16">
                <span className="font-display-i">Chiron AI Extension.</span>
              </h2>
              <p className="lede mt-32" style={{ maxWidth: '50ch' }}>
                €15 / mese — si aggancia a qualsiasi piano. Sintesi clienti, bozze, insight di adesione,
                risposte assistite. Sempre da approvare manualmente, sempre nel tono del coach.
              </p>
              <div className="row mt-32" style={{ gap: 12 }}>
                <button onClick={() => setChiron(!chiron)} className="btn">
                  <span>{chiron ? 'Rimuovi Chiron' : 'Aggiungi Chiron'}</span><span className="arrow"></span>
                </button>
                <a href="#chiron" className="link-u" style={{ fontSize: 13 }}>Cosa fa esattamente</a>
              </div>
            </div>
            <div style={{ position: 'relative', minHeight: 380 }}>
              {/* base plan card */}
              <div style={{
                position: 'absolute', inset: '8% 30% 8% 0',
                background: 'var(--parchment)', border: '1px solid var(--rule)',
                padding: 24, transform: 'rotate(-1.5deg)',
              }}>
                <span className="tag">Piano · Athena</span>
                <h4 className="h-3 mt-16">€49</h4>
                <span className="small">Base, senza estensione</span>
                <div style={{ height: 1, background: 'var(--rule)', margin: '20px 0' }}></div>
                {['Roster', 'Programmi', 'Nutrizione', 'Note'].map((it) => (
                  <div key={it} className="row" style={{ justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                    <span>{it}</span><Check size={10} color="var(--bronze)" />
                  </div>
                ))}
              </div>
              {/* chiron extension overlay */}
              <div style={{
                position: 'absolute', inset: '12% 0 12% 30%',
                background: 'var(--ink)', color: 'var(--parchment)',
                padding: 24, transform: chiron ? 'rotate(2deg) translateY(-12px)' : 'rotate(0deg) translateY(60px)',
                opacity: chiron ? 1 : 0.3,
                transition: 'transform 0.7s var(--ease-out), opacity 0.5s',
                boxShadow: '0 30px 80px -30px rgba(20,17,13,0.5)',
              }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="tag" style={{ color: 'var(--bronze-light)' }}>Estensione · Chiron</span>
                  <Bolt size={20} color="var(--bronze-light)" />
                </div>
                <h4 className="h-3 mt-16">+ €15</h4>
                <span className="small" style={{ color: 'rgba(244,239,228,0.6)' }}>Si aggiunge al piano base</span>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '20px 0' }}></div>
                {['Sintesi clienti', 'Bozze programmi', 'Risposte assistite', 'Insight adesione'].map((it) => (
                  <div key={it} className="row" style={{ justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                    <span>{it}</span><Check size={10} color="var(--bronze-light)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison sober */}
      <section className="section">
        <div className="container">
          <span className="section-index">[ Confronto sintetico ]</span>
          <h2 className="h-2 mt-16">Una vista, tutte le differenze.</h2>
          <div className="mt-48" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--rule-strong)' }}>
                  <th style={{ textAlign: 'left', padding: '20px 16px', fontWeight: 500, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Capability</th>
                  {['Hermes', 'Athena', 'Zeus'].map((n) => (
                    <th key={n} style={{ textAlign: 'center', padding: '20px 16px', fontFamily: 'var(--display)', fontSize: 22 }}>{n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Atleti attivi', '10', '60', 'Illimitati'],
                  ['Programmi modulari', '✓', '✓', '✓'],
                  ['Piani alimentari avanzati', '–', '✓', '✓'],
                  ['Audio · allegati', '–', '✓', '✓'],
                  ['Multi-coach', '–', '–', '✓'],
                  ['API · webhook', '–', '–', '✓'],
                  ['SSO · SLA', '–', '–', '✓'],
                  ['Chiron compatibile', '✓', '✓', '✓'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--rule-faint)' }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: '18px 16px',
                        textAlign: ci ? 'center' : 'left',
                        fontSize: 14,
                        fontFamily: ci && cell !== '–' ? 'var(--mono)' : 'inherit',
                        color: cell === '–' ? 'var(--ink-mute)' : 'inherit',
                      }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FinalCTA navigate={navigate} />
    </div>
  );
}

Object.assign(window, { PricingPage });
