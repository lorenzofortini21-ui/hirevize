import express from "express";

const app = express();
const PORT = 3000;
const GUMROAD_URL = "https://fortinix.gumroad.com/l/odfzgi";

app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hirevize</title>
  <style>
    :root {
      --bg: #0f172a;
      --bg-soft: #111827;
      --card: #ffffff;
      --text: #0f172a;
      --muted: #475569;
      --primary: #2563eb;
      --primary-dark: #1d4ed8;
      --success: #16a34a;
      --success-dark: #15803d;
      --line: #e2e8f0;
      --surface: #f8fafc;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: var(--surface);
      color: var(--text);
      line-height: 1.5;
    }

    .hero {
      background: linear-gradient(135deg, var(--bg), var(--bg-soft));
      color: white;
      padding: 56px 20px 42px;
      text-align: center;
    }

    .hero h1 {
      margin: 0 0 12px;
      font-size: 42px;
    }

    .hero p {
      margin: 0 auto;
      max-width: 760px;
      font-size: 18px;
      color: rgba(255,255,255,0.88);
    }

    .wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 24px 20px 50px;
    }

    .card {
      background: white;
      border: 1px solid var(--line);
      border-radius: 22px;
      padding: 24px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 22px;
    }

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 15px;
    }

    .field-note {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 10px;
    }

    textarea {
      width: 100%;
      min-height: 280px;
      padding: 14px;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      resize: vertical;
      box-sizing: border-box;
      outline: none;
    }

    textarea:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
    }

    .actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    button {
      border: none;
      border-radius: 12px;
      padding: 12px 18px;
      font-weight: bold;
      cursor: pointer;
      font-size: 14px;
    }

    .primary {
      background: var(--primary);
      color: white;
    }

    .primary:hover {
      background: var(--primary-dark);
    }

    .secondary {
      background: white;
      color: var(--text);
      border: 1px solid #cbd5e1;
    }

    .secondary:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    .unlock-btn {
      background: var(--success);
      color: white;
    }

    .unlock-btn:hover {
      background: var(--success-dark);
    }

    .status {
      margin-top: 15px;
      font-size: 14px;
      color: var(--muted);
      font-weight: bold;
      min-height: 20px;
    }

    .result-card {
      margin-top: 24px;
      background: white;
      border: 1px solid var(--line);
      border-radius: 22px;
      padding: 24px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    }

    .result-top {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }

    .result-top h2 {
      margin: 0;
      font-size: 24px;
    }

    .result-top p {
      margin: 5px 0 0;
      color: var(--muted);
      font-size: 14px;
    }

    .result {
      margin-top: 10px;
      background: #0b1220;
      color: #e5eefc;
      border-radius: 16px;
      padding: 18px;
      white-space: pre-wrap;
      min-height: 240px;
      word-break: break-word;
      font-size: 14px;
      line-height: 1.6;
    }

    .pay-box {
      margin-top: 16px;
      padding: 16px;
      border-radius: 16px;
      border: 1px solid #bbf7d0;
      background: #f0fdf4;
    }

    .pay-box h3 {
      margin: 0 0 6px;
      color: #166534;
      font-size: 18px;
    }

    .pay-box p {
      margin: 0 0 12px;
      color: #166534;
      font-size: 14px;
    }

    .small-note {
      margin-top: 10px;
      color: var(--muted);
      font-size: 13px;
    }

    @media (max-width: 800px) {
      .grid {
        grid-template-columns: 1fr;
      }

      .hero h1 {
        font-size: 34px;
      }

      .actions {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Hirevize</h1>
    <p>Genera CV, lettera motivazionale ed email candidatura con AI. Prova gratis l’anteprima e sblocca la versione completa.</p>
  </div>

  <div class="wrap">
    <div class="card">
      <div class="grid">
        <div>
          <label for="cv">Dati candidato</label>
          <div class="field-note">Nome, esperienze, competenze, formazione, progetti, certificazioni.</div>
          <textarea id="cv" placeholder="Mario Rossi

Esperienza:
- Addetto vendita presso negozio di elettronica, 2022-2024
- Assistenza clienti
- Gestione cassa
- Riordino scaffali

Competenze:
- Assistenza clienti
- Problem solving
- Teamwork
- Uso base Excel

Formazione:
- Diploma tecnico commerciale"></textarea>
        </div>

        <div>
          <label for="job">Annuncio di lavoro</label>
          <div class="field-note">Incolla qui la job description completa.</div>
          <textarea id="job" placeholder="Azienda retail cerca Sales Assistant.

Responsabilità:
- assistenza clienti
- supporto vendita
- gestione punto vendita
- riassortimento scaffali

Requisiti:
- ottime capacità comunicative
- orientamento al cliente
- lavoro in team
- flessibilità
- conoscenza base strumenti digitali"></textarea>
        </div>
      </div>

      <div class="actions">
        <button class="primary" onclick="generateResult()">Genera candidatura</button>
        <button class="secondary" onclick="loadDemo()">Carica demo</button>
        <button class="secondary" onclick="clearAll()">Pulisci</button>
      </div>

      <div id="status" class="status"></div>
    </div>

    <div class="result-card">
      <div class="result-top">
        <div>
          <h2>Risultato</h2>
          <p>Vedi l’anteprima gratis. Sblocca la versione completa per ottenere tutto il contenuto.</p>
        </div>
        <div class="actions" style="margin-top:0;">
          <button class="secondary" onclick="copyResult()">Copia anteprima</button>
          <button class="secondary" onclick="downloadPDF()">Scarica PDF</button>
        </div>
      </div>

      <div id="result" class="result">Nessun risultato generato ancora.</div>

      <div class="pay-box">
        <h3>🔓 Sblocca la versione completa</h3>
        <p>Ottieni il contenuto completo generato da Hirevize con CV, lettera motivazionale ed email candidatura.</p>
        <button class="unlock-btn" onclick="unlock()">Sblocca versione completa (3€)</button>
      </div>

      <div class="small-note">
        Dopo il pagamento puoi usare il tool completo dal sito e continuare a testare il servizio.
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
  <script>
    let fullResult = "";

    function setStatus(text) {
      document.getElementById("status").innerText = text;
    }

    function unlock() {
      window.open("${GUMROAD_URL}", "_blank");
    }

    function loadDemo() {
      document.getElementById("cv").value =
        "Mario Rossi\\n\\n" +
        "Esperienza:\\n" +
        "- Addetto vendita presso negozio di elettronica, 2022-2024\\n" +
        "- Assistenza clienti\\n" +
        "- Gestione cassa\\n" +
        "- Riordino scaffali\\n\\n" +
        "Competenze:\\n" +
        "- Assistenza clienti\\n" +
        "- Problem solving\\n" +
        "- Teamwork\\n" +
        "- Uso base Excel\\n\\n" +
        "Formazione:\\n" +
        "- Diploma tecnico commerciale";

      document.getElementById("job").value =
        "Azienda retail cerca Sales Assistant.\\n\\n" +
        "Responsabilità:\\n" +
        "- assistenza clienti\\n" +
        "- supporto vendita\\n" +
        "- gestione punto vendita\\n" +
        "- riassortimento scaffali\\n\\n" +
        "Requisiti:\\n" +
        "- ottime capacità comunicative\\n" +
        "- orientamento al cliente\\n" +
        "- lavoro in team\\n" +
        "- flessibilità\\n" +
        "- conoscenza base strumenti digitali";

      setStatus("Demo caricata.");
    }

    function clearAll() {
      document.getElementById("cv").value = "";
      document.getElementById("job").value = "";
      document.getElementById("result").innerText = "Nessun risultato generato ancora.";
      fullResult = "";
      setStatus("");
    }

    async function generateResult() {
      const cv = document.getElementById("cv").value.trim();
      const job = document.getElementById("job").value.trim();

      if (!cv || !job) {
        setStatus("Compila entrambi i campi.");
        return;
      }

      setStatus("Generazione in corso...");
      document.getElementById("result").innerText = "Sto generando la candidatura...";

      try {
        const response = await fetch("/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ cv: cv, job: job })
        });

        const data = await response.json();
        fullResult = data.result || "Nessun risultato.";

        if (fullResult.startsWith("Errore")) {
          document.getElementById("result").innerText = fullResult;
          setStatus("Errore durante la generazione.");
          return;
        }

        const preview = fullResult.substring(0, 350);
        document.getElementById("result").innerText =
          preview +
          "\\n\\n🔒 Anteprima limitata. Sblocca la versione completa per vedere tutto il contenuto.";

        setStatus("Anteprima generata.");
      } catch (error) {
        document.getElementById("result").innerText = "Errore: " + error.message;
        setStatus("Errore durante la richiesta.");
      }
    }

    async function copyResult() {
      const text = document.getElementById("result").innerText;
      try {
        await navigator.clipboard.writeText(text);
        setStatus("Anteprima copiata.");
      } catch (error) {
        setStatus("Impossibile copiare.");
      }
    }

    function downloadPDF() {
      const text = document.getElementById("result").innerText.trim();

      if (!text || text === "Nessun risultato generato ancora." || text.indexOf("Errore") === 0) {
        setStatus("Genera prima un risultato valido.");
        return;
      }

      const jsPDF = window.jspdf.jsPDF;
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const maxWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, maxWidth);

      let y = 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Hirevize - Anteprima candidatura", margin, y);

      y += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      for (let i = 0; i < lines.length; i++) {
        if (y > pageHeight - 15) {
          doc.addPage();
          y = 20;
        }
        doc.text(lines[i], margin, y);
        y += 6;
      }

      doc.save("hirevize-anteprima.pdf");
      setStatus("PDF scaricato.");
    }
  </script>
</body>
</html>
  `);
});

app.post("/generate", async (req, res) => {
  const body = req.body || {};
  const cv = body.cv;
  const job = body.job;

  if (!cv || !job) {
    return res.json({
      result: "Errore: devi inserire sia i dati del candidato sia l'annuncio di lavoro."
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.json({
      result: "Errore: OPENAI_API_KEY non impostata nel terminale o nelle variabili ambiente."
    });
  }

  const prompt =
    "Sei un recruiter senior e career coach specializzato in ottimizzazione CV e ATS.\\n\\n" +
    "Il tuo obiettivo è creare una candidatura professionale, credibile e adattata all'annuncio di lavoro.\\n\\n" +
    "Regole obbligatorie:\\n" +
    "- non inventare esperienze, risultati o competenze non presenti nei dati del candidato\\n" +
    "- migliora il linguaggio rendendolo più professionale e più chiaro\\n" +
    "- integra parole chiave rilevanti presenti nell'annuncio\\n" +
    "- rendi il CV orientato al ruolo richiesto\\n" +
    "- evita frasi generiche, vuote o ripetitive\\n" +
    "- usa uno stile professionale, concreto e leggibile\\n\\n" +
    "Crea il contenuto in questo formato:\\n\\n" +
    "NOME COGNOME\\n\\n" +
    "PROFILO\\n" +
    "Scrivi un breve profilo professionale di 3-4 righe mirato alla posizione.\\n\\n" +
    "ESPERIENZA\\n" +
    "Per ogni esperienza:\\n" +
    "- indica ruolo, azienda e periodo se presenti\\n" +
    "- riscrivi le attività in bullet point\\n" +
    "- evidenzia responsabilità concrete e competenze rilevanti\\n\\n" +
    "COMPETENZE\\n" +
    "Elenca competenze tecniche e soft skill più utili per questa candidatura.\\n\\n" +
    "FORMAZIONE\\n" +
    "Mantieni la formazione in modo chiaro e ordinato.\\n\\n" +
    "LETTERA MOTIVAZIONALE\\n" +
    "Scrivi una breve lettera motivazionale professionale e coerente con il ruolo.\\n\\n" +
    "EMAIL DI CANDIDATURA\\n" +
    "Scrivi una email breve e pronta da inviare.\\n\\n" +
    "DATI CANDIDATO:\\n" + cv + "\\n\\n" +
    "ANNUNCIO DI LAVORO:\\n" + job;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Sei un recruiter senior specializzato in CV, ATS e candidature efficaci."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.json({
        result: "Errore API: " + ((data && data.error && data.error.message) || "richiesta fallita")
      });
    }

    const content =
      data &&
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content;

    if (!content) {
      return res.json({
        result: "Errore: risposta API non valida."
      });
    }

    return res.json({ result: content });
  } catch (error) {
    return res.json({
      result: "Errore: " + error.message
    });
  }
});

app.listen(PORT, () => {
  console.log("Server attivo su http://localhost:" + PORT);
});