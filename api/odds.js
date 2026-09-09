// API QUOTE - SUREBET OPTIMIZER
// Struttura predisposta per collegare in futuro fonti/API autorizzate.
// Per ora restituisce dati demo, così possiamo testare il backend
// senza dipendere da bookmaker o endpoint non verificati.

export default function handler(req, res) {
  // Permetti richieste dal frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Gestione richiesta OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Accettiamo solo GET
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Metodo non consentito"
    });
  }

  // =========================================================
  // DATI DEMO
  // =========================================================
  //
  // Questa struttura sarà utilizzata anche quando collegheremo
  // le vere fonti delle quote.
  //
  // Ogni partita contiene:
  // - id
  // - squadra casa
  // - squadra ospite
  // - data
  // - bookmaker
  // - quote 1/X/2
  //
  // =========================================================

  const matches = [
    {
      id: "demo-001",
      home: "Inter",
      away: "Milan",
      date: "2026-09-10T20:45:00+02:00",

      bookmakers: [
        {
          name: "GoldBet",
          odds: {
            home: 2.20,
            draw: 3.50,
            away: 4.30
          }
        },

        {
          name: "Sportium",
          odds: {
            home: 2.15,
            draw: 3.60,
            away: 4.40
          }
        },

        {
          name: "QuiGioco",
          odds: {
            home: 2.25,
            draw: 3.40,
            away: 4.50
          }
        }
      ]
    },

    {
      id: "demo-002",
      home: "Juventus",
      away: "Napoli",
      date: "2026-09-11T20:45:00+02:00",

      bookmakers: [
        {
          name: "GoldBet",
          odds: {
            home: 2.10,
            draw: 3.30,
            away: 3.80
          }
        },

        {
          name: "Sportium",
          odds: {
            home: 2.15,
            draw: 3.40,
            away: 3.75
          }
        },

        {
          name: "QuiGioco",
          odds: {
            home: 2.05,
            draw: 3.45,
            away: 3.90
          }
        }
      ]
    }
  ];

  // =========================================================
  // PARAMETRI OPZIONALI
  // =========================================================
  //
  // In futuro il frontend potrà richiedere:
  //
  // /api/odds
  //
  // oppure:
  //
  // /api/odds?home=Inter&away=Milan
  //
  // =========================================================

  const home = req.query.home
    ? String(req.query.home).trim().toLowerCase()
    : "";

  const away = req.query.away
    ? String(req.query.away).trim().toLowerCase()
    : "";

  let result = matches;

  // Filtro squadra casa
  if (home) {
    result = result.filter(match =>
      match.home.toLowerCase().includes(home)
    );
  }

  // Filtro squadra ospite
  if (away) {
    result = result.filter(match =>
      match.away.toLowerCase().includes(away)
    );
  }

  // =========================================================
  // RISPOSTA API
  // =========================================================

  return res.status(200).json({
    success: true,

    source: "demo",

    updatedAt: new Date().toISOString(),

    count: result.length,

    matches: result
  });
}
