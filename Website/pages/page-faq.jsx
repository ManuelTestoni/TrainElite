/* ATHLYNK — FAQ */

function FaqPage({ navigate }) {
  const groups = [
    {
      cat: 'Athlynk · La piattaforma',
      items: [
        { q: 'A chi è rivolto Athlynk?', a: 'Coach, personal trainer e nutrizionisti che lavorano con clienti in modo strutturato — dal professionista solo allo studio con team multipli. Ogni piano è dimensionato sulla scala del lavoro.' },
        { q: 'Athlynk è una web app o un\'app mobile?', a: 'Athlynk è una web app responsive accessibile da qualsiasi browser moderno, ottimizzata per desktop e mobile. L\'app mobile dedicata per atleti è in arrivo nel 2026.' },
        { q: 'Devo migrare i miei clienti esistenti?', a: 'Sì, ma in modo guidato. L\'onboarding consente di importare clienti, modelli di programmi e archivio storico in poche sessioni. Per i piani Athena e Zeus offriamo onboarding assistito.' },
        { q: 'Quanto è sicura la piattaforma?', a: 'Hosting europeo, crittografia at-rest e in-transit, controlli di accesso granulari, conformità GDPR. I piani Zeus aggiungono SSO e SLA dedicati.' },
      ],
    },
    {
      cat: 'Coach · Cliente · Differenze',
      items: [
        { q: 'Qual è la differenza tra l\'area coach e l\'area cliente?', a: 'L\'area coach è una vista di studio — roster, programmi, piani, note operative, monitoraggio. L\'area cliente è radicalmente semplice: l\'atleta vede ciò che deve fare oggi e può registrare progressi e note personali.' },
        { q: 'Il cliente può modificare il proprio piano?', a: 'No. Il cliente consulta, esegue, registra log e note. Le modifiche al piano restano prerogativa del coach. È una scelta deliberata — il giudizio resta umano e specialistico.' },
        { q: 'Posso lavorare insieme ad altri coach sullo stesso cliente?', a: 'Sì, sui piani Zeus. Permessi granulari per ruolo (head coach, assistente, nutrizionista esterno, fisioterapista) e log completo delle azioni di ciascuno.' },
      ],
    },
    {
      cat: 'Chiron · L\'estensione AI',
      items: [
        { q: 'Cos\'è Chiron?', a: 'Chiron è l\'assistente AI integrato in Athlynk. Il nome richiama il centauro Chirone, maestro di Achille — figura di guida silenziosa e sapiente. Chiron osserva il roster, suggerisce, redige bozze, sintetizza. Mai sostituisce il giudizio del coach.' },
        { q: 'Chiron decide al posto mio?', a: 'No. Chiron è un consigliere, non un esecutore. Ogni bozza di programma, risposta, modifica al piano richiede l\'approvazione esplicita del coach. È un principio non negoziabile della piattaforma.' },
        { q: 'Come funziona l\'add-on Chiron?', a: 'L\'estensione si aggiunge a qualsiasi piano per €15/mese. Si attiva e disattiva in qualsiasi momento dalla dashboard. I piani classici funzionano completamente anche senza Chiron.' },
        { q: 'Cosa fa esattamente Chiron?', a: 'Sintesi cliente, bozze di programma e di piano alimentare, risposte assistite ai messaggi degli atleti nel tono del coach, insight di adesione, allerte precoci su pattern di compliance. Tutto sempre da approvare.' },
        { q: 'I dati dei miei clienti sono usati per addestrare modelli?', a: 'No. I dati dei tuoi clienti restano tuoi. Non vengono mai usati per addestrare modelli, né condivisi con terze parti. Vengono elaborati solo nel contesto della tua sessione, sotto la tua autorità.' },
      ],
    },
    {
      cat: 'Pricing · Prova · Vincoli',
      items: [
        { q: 'C\'è una prova gratuita?', a: 'Sì. Trenta giorni di prova completa su qualsiasi piano, senza inserire metodi di pagamento. Allo scadere, scegli se procedere — oppure i tuoi dati restano in archivio per 90 giorni in caso di ripensamento.' },
        { q: 'Posso cambiare piano in qualsiasi momento?', a: 'Sì. Upgrade immediati, downgrade alla scadenza del ciclo. Nessuna penale, nessun obbligo di permanenza.' },
        { q: 'Cosa succede ai miei dati se annullo?', a: 'Mantenuti in sola lettura per 90 giorni in caso di riattivazione. Esportazione completa in formato strutturato disponibile in qualsiasi momento, anche dopo l\'annullamento.' },
      ],
    },
  ];

  const [open, setOpen] = useState(`${0}-${0}`);
  return (
    <div className="page" data-screen-label="05 FAQ">
      <section className="section" style={{ paddingTop: 160, paddingBottom: 80 }}>
        <div className="container">
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 48 }}>
            <span className="eyebrow">Domande frequenti</span>
            <span className="tag">Vol · IV</span>
          </div>
          <h1 className="h-mega" style={{ maxWidth: '14ch' }}>
            <SplitText text="Risposte" />
            <br />
            <span className="font-display-i" style={{ color: 'var(--aegean)' }}>
              <SplitText text="dirette." baseDelay={400} />
            </span>
          </h1>
          <p className="lede mt-32 reveal" style={{ '--d': '500ms', maxWidth: '52ch' }}>
            Niente giri di parole. Le domande che ricevuto più spesso —
            su prodotto, AI, pricing, dati. Se manca qualcosa, scrivici.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64 }}>
            {/* index */}
            <aside style={{ position: 'sticky', top: 100, alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span className="tag">Indice</span>
              {groups.map((g, gi) => (
                <a key={gi} href={`#g${gi}`} className="link-u" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, marginRight: 12, color: 'var(--ink-mute)' }}>0{gi + 1}</span>
                  {g.cat}
                </a>
              ))}
              <div style={{ marginTop: 24, padding: 20, background: 'var(--marble)', border: '1px solid var(--rule)' }}>
                <span className="tag">Hai un'altra domanda?</span>
                <p className="body mt-12" style={{ fontSize: 14 }}>Il team risponde entro 24 ore.</p>
                <a href="#contact" className="link-u mt-16" style={{ fontSize: 13, marginTop: 16, display: 'inline-flex' }}>Scrivici →</a>
              </div>
            </aside>

            {/* FAQ groups */}
            <div>
              {groups.map((g, gi) => (
                <div key={gi} id={`g${gi}`} style={{ marginBottom: 64 }}>
                  <div className="row" style={{ alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
                    <span className="font-display" style={{ fontSize: 14, color: 'var(--bronze)' }}>0{gi + 1}</span>
                    <h2 className="h-3" style={{ fontSize: 24 }}>{g.cat}</h2>
                  </div>
                  {g.items.map((item, qi) => {
                    const id = `${gi}-${qi}`;
                    const isOpen = open === id;
                    return (
                      <div key={qi}
                        className={`faq-item ${isOpen ? 'open' : ''}`}
                        onClick={() => setOpen(isOpen ? null : id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(isOpen ? null : id); } }}
                      >
                        <div className="faq-q">
                          <h3 className="font-display" style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.25, maxWidth: '36ch' }}>{item.q}</h3>
                          <span className="faq-toggle"></span>
                        </div>
                        <div className="faq-a">
                          <p className="body" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: '64ch' }}>{item.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA navigate={navigate} />
    </div>
  );
}

Object.assign(window, { FaqPage });
