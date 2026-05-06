/* ATHLYNK — Servizi (Services / capabilities) */

function ServicesPage({ navigate }) {
  return (
    <div className="page" data-screen-label="03 Servizi">
      <section className="section" style={{ paddingTop: 160, paddingBottom: 80 }}>
        <div className="container">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="eyebrow">Capabilities · Moduli · Estensioni</span>
            <span className="tag">Vol · II</span>
          </div>
          <h1 className="h-mega mt-24" style={{ maxWidth: '14ch' }}>
            <SplitText text="Tutto ciò che" />
            <br />
            <span className="font-display-i" style={{ color: 'var(--bronze)' }}>
              <SplitText text="serve davvero." baseDelay={400} />
            </span>
          </h1>
          <p className="lede mt-32 reveal" style={{ '--d': '600ms', maxWidth: '52ch' }}>
            Sei moduli, un solo ecosistema. Ogni sezione è progettata per coesistere
            con le altre per elevare il servizio del tuo coaching.
          </p>
        </div>
      </section>

      {/* Capability index */}
      <section style={{ borderTop: '1px solid var(--rule)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRight: '1px solid var(--rule)' }}>
            {[
              { id: '01', t: 'Allenamento', sub: 'Programmazione strutturata', d: 'Costruisci programmi a blocchi riutilizzabili. Cicli, fasi, variazioni — versionate e tracciate.' },
              { id: '02', t: 'Nutrizione', sub: 'Piani alimentari intelligenti', d: 'Macro, alternative, scaling automatico per fase. L\'atleta vede l\'essenziale, tu controlli ogni dettaglio.' },
              { id: '03', t: 'Area cliente', sub: 'L\'app dell\'atleta', d: 'Allenamento del giorno, dieta, note personali, dialogo diretto. Costruita per una sola domanda: cosa devo fare ora.' },
              { id: '04', t: 'Monitoraggio', sub: 'Progressi e adesione', d: 'Monitoraggio reale, peso, misurazioni, commenti contestuali. I dati che spiegano l\'andamento, non quelli che lo decorano.' },
              { id: '05', t: 'Note operative', sub: 'Continuità della relazione', d: 'Audio, allegati, note testuali con timeline. Niente si perde, tutto è ricucibile a distanza di mesi.' },
              { id: '06', t: 'Chiron AI', sub: 'Add-on intelligente', d: 'Sintesi cliente, bozze, segnali di adesione. Un consigliere silenzioso, sempre da approvare manualmente.' },
            ].map((cap, i) => (
              <CapabilityRow key={cap.id} cap={cap} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Coach focus */}
      <section className="section dark-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="section-index">[ Per il Coach ]</span>
              <h2 className="h-1 mt-16">
                Lo studio,<br />
                <span className="font-display-i" style={{ color: 'var(--bronze-light)' }}>al massimo della lucidità.</span>
              </h2>
              <p className="lede mt-32">
                Athlynk è il pannello che mancava. Programmi a blocchi. Piani alimentari per fase. Roster
                con stati di adesione in chiaro. Note ricche, audio, allegati. Un'unica vista che restituisce
                ordine al lavoro quotidiano.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
                {[
                  'Roster centralizzato con metriche di compliance',
                  'Programmi modulari, riusabili, versionati',
                  'Piani alimentari con scaling per fase e alternative',
                  'Calendario unificato — sessioni, follow-up, scadenze',
                  'Note contestuali su ogni atleta, dal vivo',
                  'Esportazioni eleganti per audit, report e bilanci',
                ].map((f) => (
                  <li key={f} style={{ display: 'flex', gap: 14, alignItems: 'baseline', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
                    <Check color="var(--bronze-light)" />
                    <span style={{ fontSize: 16 }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <DashboardMockup variant="coach" />
          </div>
        </div>
      </section>

      {/* Client focus */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
            <DashboardMockup variant="client" />
            <div>
              <span className="section-index">[ Per l'Atleta ]</span>
              <h2 className="h-1 mt-16">
                Il tempio,<br />
                <span className="font-display-i" style={{ color: 'var(--aegean)' }}>chiaro come il marmo.</span>
              </h2>
              <p className="lede mt-32">
                L'app dell'atleta è progettata per una sola domanda: cosa devo fare oggi.
                Allenamento, nutrizione, note, dialogo. Niente di più. Niente di meno.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
                {[
                  'Sessione del giorno, già pronta — nessun setup',
                  'Macro chiari, alternative pronte, log a tap',
                  'Note personali, immagini, audio: tutto in continuità',
                  'Conversazione diretta con il coach, senza app esterne',
                  'Storico completo di ogni piano e progresso',
                  'Funziona anche offline durante l\'allenamento',
                ].map((f) => (
                  <li key={f} style={{ display: 'flex', gap: 14, alignItems: 'baseline', borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                    <Check color="var(--bronze)" />
                    <span style={{ fontSize: 16 }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI extension */}
      <section className="section" style={{ background: 'var(--marble)' }}>
        <div className="container">
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 56 }}>
            <span className="section-index">[ Estensione · Chiron AI ]</span>
            <span className="tag">Add-on premium</span>
          </div>
          <h2 className="h-1" style={{ maxWidth: '16ch' }}>
            <span className="font-display-i">Chiron</span> non sostituisce il coach. <span style={{ color: 'var(--ink-mute)' }}>Lo amplifica.</span>
          </h2>
          <div className="grid-3 mt-80">
            {[
              { t: 'Sintesi cliente', d: 'Un riassunto strutturato per ogni atleta — adesione, segnali, note salienti — sempre pronto.' },
              { t: 'Bozze di programma', d: 'Punti di partenza modulari. Mai pubblicati senza la tua firma esplicita.' },
              { t: 'Risposte assistite', d: 'Suggerimenti di risposta nel tono del coach. Tu approvi, modifichi, invii.' },
              { t: 'Insight di adesione', d: 'Pattern di compliance, segnali precoci, motivazioni probabili — leggibili in trenta secondi.' },
              { t: 'Sintesi nutrizionale', d: 'Bilancio della settimana, scarti rispetto al piano, alternative coerenti già pronte.' },
              { t: 'Memoria di percorso', d: 'Il filo di ogni atleta nel tempo — ricucito, sempre interrogabile.' },
            ].map((c) => (
              <div key={c.t} className="reveal" style={{ borderTop: '1px solid var(--rule)', paddingTop: 24 }}>
                <h3 className="h-3">{c.t}</h3>
                <p className="body mt-12">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA navigate={navigate} />
    </div>
  );
}

function CapabilityRow({ cap, index }) {
  const evenCol = index % 2 === 0;
  return (
    <div className="reveal" style={{
      padding: '48px 32px',
      borderTop: '1px solid var(--rule)',
      borderRight: evenCol ? '1px solid var(--rule)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      minHeight: 280,
      '--d': `${index * 60}ms`,
    }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="tag">{cap.id}</span>
        <span className="ornament">
          {{
            '01': <Capital size={28} color="var(--ink-mute)" />,
            '02': <Laurel size={28} color="var(--ink-mute)" />,
            '03': <SealPlus size={26} color="var(--ink-mute)" />,
            '04': <Wave width={48} height={20} color="var(--ink-mute)" />,
            '05': <Star size={20} color="var(--ink-mute)" />,
            '06': <Bolt size={26} color="var(--bronze)" />,
          }[cap.id]}
        </span>
      </div>
      <h3 className="h-2" style={{ marginTop: 24, fontSize: 'clamp(28px, 3.4vw, 48px)' }}>{cap.t}</h3>
      <span className="eyebrow eyebrow-bronze">{cap.sub}</span>
      <p className="body mt-12" style={{ maxWidth: '38ch' }}>{cap.d}</p>
      <a href="#more" className="link-u mt-16" style={{ fontSize: 13, marginTop: 'auto' }}>
        Esplora il modulo <span style={{ display: 'inline-block', transform: 'translateY(-1px)' }}>→</span>
      </a>
    </div>
  );
}

Object.assign(window, { ServicesPage });
