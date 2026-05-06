/* ATHLYNK — Chi siamo (About) */

function AboutPage({ navigate }) {
  return (
    <div className="page" data-screen-label="02 Chi siamo">
      {/* Manifesto hero */}
      <section className="section" style={{ paddingTop: 160, paddingBottom: 120, position: 'relative' }}>
        <div className="container">
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 56 }}>
            <span className="eyebrow">Manifesto · Visione · Origine</span>
            <span className="tag">Vol · I</span>
          </div>
          <h1 className="h-mega" style={{ maxWidth: '14ch' }}>
            <SplitText text="Athlos." />
            <br />
            <SplitText text="Link." baseDelay={300} />
            <br />
            <span className="font-display-i" style={{ color: 'var(--aegean)' }}><SplitText text="Athlynk." baseDelay={600} /></span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, marginTop: 80, alignItems: 'flex-start' }}>
            <div style={{ gridColumn: 'span 4' }}>
              <span className="ornament" style={{ display: 'block', marginBottom: 24 }}>
                <Meander height={14} color="var(--bronze)" width={180} />
              </span>
              <p className="tag">Etimologia</p>
            </div>
            <div style={{ gridColumn: 'span 8' }} className="reveal">
              <p className="lede" style={{ fontSize: 22, lineHeight: 1.5 }}>
                <em className="font-display-i">Athlos</em>, dal greco antico — impresa, prova, sforzo nobile.{' '}
                <em className="font-display-i">Link</em>, l'inglese contemporaneo — collegamento.
              </p>
              <p className="lede mt-24">
                Athlynk è la connessione che non si spezza tra chi guida e chi compie l'impresa.
                Una piattaforma costruita perché coach e atleta restino allineati — sempre, ovunque,
                lungo tutto il percorso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="meander ornament" style={{ background: 'var(--ink)', maxWidth: 'var(--container)', margin: '0 auto' }}></div>

      {/* Why we exist */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32 }}>
            <div style={{ gridColumn: 'span 5' }}>
              <span className="section-index">[ I ] · Perché esiste</span>
              <h2 className="h-2 mt-16">Il coaching merita un'architettura.</h2>
            </div>
            <div style={{ gridColumn: 'span 7' }}>
              <p className="lede reveal">
                Per anni, il lavoro del coach è stato sparso tra fogli di calcolo, conversazioni, PDF allegati,
                appunti su carta, applicazioni che non si parlano. Il prezzo lo paga il percorso dell'atleta:
                interruzioni, confusione, decisioni improvvise.
              </p>
              <p className="lede mt-24 reveal" style={{ '--d': '120ms' }}>
                Athlynk nasce da un'osservazione semplice — la disciplina merita strumenti all'altezza.
                Una sola sede per programmazione, nutrizione, monitoraggio, dialogo. Un'estetica
                che onora la professione. Una connessione che non si rompe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}

      {/* Origin / classical reinterpretation */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', aspectRatio: '4 / 5' }}>
              {/* abstract bas-relief panel */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, var(--marble), var(--stone))',
                border: '1px solid var(--rule)',
                overflow: 'hidden',
              }}>
                <svg viewBox="0 0 400 500" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="hatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="4" stroke="var(--ink)" strokeWidth="0.4" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="400" height="500" fill="url(#hatch)" />
                  {/* abstract figure */}
                  <g stroke="var(--ink)" strokeWidth="1" fill="none" opacity="0.85">
                    <circle cx="200" cy="140" r="38" />
                    <path d="M200 178 V 320 M170 230 H 230 M150 230 L 170 220 M250 230 L 230 220" />
                    <path d="M180 320 L 160 420 M220 320 L 240 420" />
                    <path d="M155 50 L 200 90 L 245 50" />
                  </g>
                  {/* meander border */}
                  <g transform="translate(20,460)">
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((x) => (
                      <path key={x} d={`M${x} 17 H${x + 24} V1 H${x + 6} V10 H${x + 18} V4 H${x + 9} V7 H${x + 15}`}
                        stroke="var(--ink)" strokeWidth="0.8" fill="none" />
                    ))}
                  </g>
                </svg>
              </div>
            </div>
            <div>
              <span className="section-index">[ II ] · Riferimenti</span>
              <h2 className="h-2 mt-16">Linguaggio classico, sguardo contemporaneo.</h2>
              <p className="lede mt-24">
                Il greco antico nel nostro linguaggio non è ornamento, è etica. Disciplina, ordine,
                proporzione, il rispetto per l'impresa. Lo riportiamo dentro un prodotto digitale
                contemporaneo perché crediamo che certi valori si trasmettano anche dal modo in cui
                un'interfaccia respira.
              </p>
              <div className="grid-2 mt-48" style={{ gap: 24 }}>
                {[
                  { t: 'Disciplina', d: 'L\'allenamento come pratica seria, non passatempo.' },
                  { t: 'Proporzione', d: 'Ogni elemento dell\'app ha un peso pensato.' },
                  { t: 'Continuità', d: 'Il percorso resta intatto, sempre.' },
                  { t: 'Risultati', d: 'Ognuno è artefice del proprio destino.' },
                ].map((v) => (
                  <div key={v.t} style={{ borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                    <h4 className="h-4">{v.t}</h4>
                    <p className="small mt-8">{v.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section" style={{ paddingTop: 80, paddingBottom: 80, background: 'var(--marble)' }}>
        <div className="container text-center">
          <span className="ornament" style={{ display: 'inline-block', opacity: 0.4 }}>
            <Laurel size={48} color="var(--bronze)" />
          </span>
          <blockquote className="font-display-i mt-24" style={{ fontSize: 'clamp(28px, 4.4vw, 64px)', lineHeight: 1.2, maxWidth: '20ch', margin: '24px auto 0' }}>
            "Niente di grande accade senza disciplina. Niente di durevole, senza connessione."
          </blockquote>
          <span className="tag" style={{ display: 'block', marginTop: 32 }}>— Athlynk</span>
        </div>
      </section>

      {/* Team / numbers */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, marginBottom: 56 }}>
            <div style={{ gridColumn: 'span 6' }}>
              <span className="section-index">[ III ] · Lo studio</span>
              <h2 className="h-2 mt-16">Un team piccolo. Una visione grande.</h2>
            </div>
            <div style={{ gridColumn: 'span 6' }}>
              <p className="lede">
                Athlynk è costruita da un nucleo ristretto di product designer, ingegneri e sport scientist
                in Italia. Lavoriamo a release brevi, deliberate. Quando una funzione esce, è perché
                ha già attraversato la disciplina che chiediamo ai nostri utenti.
              </p>
            </div>
          </div>

          
        </div>
      </section>

      <FinalCTA navigate={navigate} />
    </div>
  );
}

Object.assign(window, { AboutPage });
