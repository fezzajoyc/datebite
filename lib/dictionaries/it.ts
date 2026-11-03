// it: dizionario UI italiano — forma chiavi identica a en (tests/seo.test.ts fa un confronto ricorsivo).
// Registro informale ("tu"), coerente con il resto del sito. "DateBite" e i segnaposto {n}/{count}/{query}/{category} restano intatti.
const it = {
  brand: "DateBite",
  tagline: "Ogni calcolo sulle date gira nel tuo browser.",
  metaDesc:
    "Calcolatrici gratuite di date e ore: età esatta, giorni lavorativi, differenze tra date e cicli del sonno. Tutto gira nel browser — le tue date non lasciano mai il dispositivo.",

  nav: {
    tools: "Tutti gli strumenti",
    categories: "Categorie",
    about: "Chi siamo",
    menu: "Menu",
    language: "Lingua",
  },

  home: {
    heroTitle: "Ogni domanda sulle date, risolta con un tocco",
    heroSub:
      "DateBite è una raccolta di calcolatrici di date e ore: età esatta, giorni lavorativi, differenze tra date, cicli del sonno. Tutto nel browser — veloce, gratuito, senza registrazione, senza invii.",
    browseAll: "Sfoglia tutti gli strumenti",
    pinned: "Fissati",
    pin: "Fissa in alto",
    unpin: "Rimuovi dai fissati",
    popular: "Popolari adesso",
    categoriesTitle: "Categorie",
    featuredTitle: "Strumenti popolari",
    trustLocal: "Le tue date restano sul tuo dispositivo",
    trustFree: "Gratis, senza account",
    trustFast: "Istantaneo, funziona offline",
    rotating: [
      "La tua età esatta in anni, mesi e giorni — al giorno preciso",
      "Quanti giorni lavorativi alla scadenza? Weekend e festivi saltati",
      "Quanto tempo tra due date? Settimane, mesi e giorni totali",
      "Vuoi svegliarti riposato? Risali fino al tuo orario di sonno",
    ],
    statsLabels: { tools: "strumenti", languages: "lingue", uploads: "upload", accounts: "account" },
    eyebrow: "Gratis per sempre",
    heroCtaSecondary: "Come funziona",
    statsTools: "{n} strumenti",
    statsLanguages: "{n} lingue",
    statsUploads: "0 upload",
    statsAccounts: "0 account",
    categoriesSub: "Calcolatrici di date e ore, tutte sul tuo dispositivo.",
    popularSub: "Gli strumenti che le persone aprono più spesso.",
    privacyTitle: "Le tue date non lasciano mai il tuo dispositivo.",
    privacySub:
      "Non esiste un passaggio di upload. Gli strumenti sono JavaScript in esecuzione nel tuo browser: non è una promessa in una privacy policy, è come sono costruiti.",
    privacyPoint1T: "Elaborazione locale",
    privacyPoint1D:
      "Le date e i numeri inseriti vengono elaborati in memoria mentre scrivi. Nulla viene trasmesso, da nessuna parte.",
    privacyPoint2T: "Nessun account",
    privacyPoint2D: "Niente registrazione, niente email, niente cronologia salvata. Apri uno strumento e usalo.",
    privacyPoint3T: "Onesti per costruzione",
    privacyPoint3D:
      "Se qualcosa non si può davvero fare nel browser, lo diciamo invece di fingere il contrario.",
    privacyLink: "Leggi la nota privacy completa",
    endTitle: "Scegli uno strumento. Funziona, e basta.",
    endSub: "Quindici lingue, zero invii, niente da installare.",
  },

  tools: {
    title: "Tutti gli strumenti",
    subtitle: "Cerca tra {count} strumenti gratuiti nel browser. Nessun upload, nessuna registrazione.",
    filterPlaceholder: "Cerca strumenti…",
    count: "{count} strumenti",
    empty: "Nessuno strumento corrisponde a “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Unisci, dividi, converti e modifica file PDF senza caricarli da nessuna parte." },
    image: { name: "Immagini", desc: "Comprimi, ridimensiona, ritaglia e converti immagini direttamente nel tuo browser." },
    text: { name: "Testo", desc: "Conta, pulisci, ordina e trasforma il testo all'istante, mentre scrivi." },
    developer: { name: "Sviluppo", desc: "Formattatori, codificatori, decodificatori e generatori per il lavoro di ogni giorno." },
    seo: { name: "SEO", desc: "Meta tag, markup schema, anteprima SERP e altri aiuti per la SEO on-page." },
    security: { name: "Sicurezza", desc: "Password, hash e ricerche — generati e verificati sul tuo dispositivo." },
    utility: { name: "Date e ore", desc: "Età, giorni lavorativi, differenza tra date e cicli del sonno: la matematica delle date di ogni giorno." },
  },

  tool: {
    howTo: "Come si usa",
    faq: "Domande frequenti",
    related: "Strumenti correlati",
    nextStep: "Passaggi successivi",
    copyLink: "Copia link",
    privacyNote:
      "Questo strumento gira interamente nel tuo browser. I tuoi dati non lasciano mai il dispositivo: non vengono caricati su nessun server.",
    inCategory: "Altri in {category}",
    backToCategory: "Tutti gli strumenti {category}",
  },

  common: {
    openTool: "Apri strumento",
    copy: "Copia",
    copied: "Copiato",
    download: "Scarica",
    reset: "Reimposta",
    swap: "Inverti",
    clear: "Svuota",
    error: "Qualcosa è andato storto. Controlla i dati inseriti e riprova.",
    input: "Input",
    output: "Risultato",
    settings: "Opzioni",
    dropFiles: "Trascina qui i file o clicca per sceglierli",
    dropFile: "Trascina qui un file o clicca per sceglierlo",
    processing: "Elaborazione…",
    fileSize: "Dimensione",
    sample: "Prova un esempio",
    uppercase: "MAIUSCOLO",
  },

  unit: {
    from: "Da",
    to: "A",
    amount: "Quantità",
    result: "Risultato",
    common: "Conversioni comuni",
    formula: "Formula",
    allUnits: "Tutte le unità",
  },

  text: {
    stats: {
      words: "Parole",
      characters: "Caratteri",
      charsNoSpaces: "Senza spazi",
      sentences: "Frasi",
      paragraphs: "Paragrafi",
      lines: "Righe",
      readingTime: "Tempo di lettura",
      readingMinutes: "{n} min di lettura",
    },
  },

  footer: {
    line: "Calcolatrici di date e ore. Nulla di ciò che inserisci qui lascia il tuo dispositivo.",
    privacy: "Privacy",
    terms: "Termini",
    about: "Chi siamo",
    badges: "Badge",
    language: "Lingua",
  },

  badge: {
    title: "Badge DateBite",
    desc: "Metti un badge DateBite sul tuo sito, README o documentazione. Rimanda qui e dice che le calcolatrici dietro girano interamente nel browser.",
    voluntary: "L'incorporamento è del tutto volontario: scegli un badge se il progetto ti piace. Non serve alcun permesso.",
    md: "Markdown (README)",
    html: "HTML (sito web)",
    thanks: "Grazie per spargere la voce: ogni incorporamento aiuta più persone a scoprire strumenti che rispettano i loro file.",
  },

    embed: {
    title: "Incorpora questo strumento",
    desc: "Metti questo strumento sul tuo sito con una riga: gira nel browser del visitatore.",
  },

    mcp: {
    title: "Server MCP — strumenti accessibili all'IA",
    desc1: "DateBite offre un server MCP (Model Context Protocol): assistenti IA come Claude o Cursor eseguono le stesse calcolatrici di date di questo sito — la stessa logica testata, nessuna reimplementazione.",
    desc2: "Gli strumenti eseguono le funzioni pure del sito stesso: età esatta, giorni lavorativi, differenze tra date, orari del sonno. L'esecuzione avviene sulla macchina del client IA via npx — nulla viene inviato ai nostri server.",
    toolsTitle: "Strumenti eseguibili ({n})",
    requiresNode: "Richiede Node.js 18+. Il server gira localmente via stdio; solo le chiamate che fai vengono calcolate sulla tua macchina.",
    privacy: "Richiede Node.js 18+. Il server gira localmente via stdio; solo le chiamate che fai vengono calcolate sulla tua macchina.",
  },

    notFound: {
    title: "Pagina non trovata",
    body: "Lo strumento che cerchi non esiste. Sfoglia invece tutti gli strumenti.",
    home: "Vai alla homepage",
  },
};

export default it;
