import express from "express";

const app = express();
const PORT = 3000;

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
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
    }
    .hero {
      background: linear-gradient(135deg, #0f172a, #111827);
      color: white;
      padding: 50px 20px;
      text-align: center;
    }
    .wrap {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }
    .card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 20px;
      margin-top: 20px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 8px;
    }
    textarea {
      width: 100%;
      min-height: 260px;
      padding: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      resize: vertical;
      box-sizing: border-box;
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
    }
    .primary {
      background: #2563eb;
      color: white;
    }
    .secondary {
      background: white;
      color: #0f172a;
      border: 1px solid #cbd5e1;
    }
    .status {
      margin-top: 15px;
      font-size: 14px;
      color: #475569;
    }
    .result {
      margin-top: 20px;
      background: #0b1220;
      color: #e5eefc;
      border-radius: 14px;
      padding: 18px;
      white-space: pre-wrap;
      min-height: 220px;
    }
    @media (max-width: 800px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Hirevize</h1>
    <p>Genera CV, lettera motivazionale ed email candidatura con AI.</p>
  </div>

  <div class="wrap">
    <div class="card">
      <div class="grid">
        <div>
          <label for="cv">Dati candidato</label>
          <textarea id="cv" placeholder="Nome, esperienze, competenze, formazione..."></textarea>
        </div>
        <div>
          <label for="job">Annuncio di lavoro</label>
          <textarea id="job" placeholder="Incolla qui l'annuncio di lavoro..."></textarea>
        </div>
      </div>

      <div class="actions">
        <button class="primary" onclick="generateResult()">Genera candidatura</button>
        <button class="secondary" onclick="loadDemo()">Carica demo</button>
        <button class="secondary" onclick="clearAll()">Pulisci</button>
        <button class="secondary" onclick="copyResult()">Copia risultato</button>
        <button class="secondary" onclick="downloadPDF()">Scarica PDF</button>
      </div>

      <div id="status" class="status"></div>
      <div id="result" class="result">Nessun risultato generato ancora.</div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
  <script>
    function setStatus(text) {
      document.getElementById("status").innerText = text;
    }

    function loadDemo() {
      document.getElementById("cv").value =
        "Mario Rossi\\n" +
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
        document.getElementById("result").innerText = data.result || "Nessun risultato.";
        setStatus("Fatto.");
      } catch (error) {
        document.getElementById("result").innerText = "Errore: " + error.message;
        setStatus("Errore durante la richiesta.");
      }
    }

    async function copyResult() {
      const text = document.getElementById("result").innerText;
      try {
        await navigator.clipboard.writeText(text);
        setStatus("Risultato copiato.");
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
      doc.text("Hirevize - Candidatura generata", margin, y);

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

      doc.save("hirevize-candidatura.pdf");
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