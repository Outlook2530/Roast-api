const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// helper to fetch roast from evilinsult.com API
async function fetchRoast(lang = "en") {
  try {
    const url = `https://evilinsult.com/generate_insult.php?lang=${lang}&type=json`;
    const { data } = await axios.get(url);
    return data.insult || "Couldn't generate roast right now, try again!";
  } catch (err) {
    return "⚠️ Roast service unavailable!";
  }
}

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "🌍 Global Roast API running",
    try: [
      "/roast",
      "/roast?name=Axhu",
      "/roast?name=Renuka&lang=en",
      "/roast?lang=es"
    ]
  });
});

app.get("/roast", async (req, res) => {
  const name = (req.query.name || "Friend").toString().slice(0, 40);
  const lang = (req.query.lang || "en").toLowerCase(); // en, es, de, fr etc.

  const roast = await fetchRoast(lang);
  const personalized = roast.replace(/@name/gi, name);

  res.json({ success: true, name, lang, roast: personalized });
});

// Local run only
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🔥 Roast API running on http://localhost:${PORT}`)
  );
}

// Export for Vercel
module.exports = app;
