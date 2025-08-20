cat > index.js << 'EOF'
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// --- Short & Savage Hinglish Roasts (emoji) ---
const ROASTS = [
  "@name 🤡 tera dimaag 2G ka, attitude 5G ka!",
  "@name 🐌 speed itni slow ki buffering bhi sharmae.",
  "@name 🐒 tujhse zyada smart mera charger.",
  "@name 🗑️ walking trash notification.",
  "@name 🪫 low-battery human version.",
  "@name 🤖 brain reboot chahiye—hang ho gaya.",
  "@name 🧻 one-time-use personality.",
  "@name 📵 logic airplane mode pe.",
  "@name 🧊 thanda reaction, zero content.",
  "@name ⏳ reply itna late ki topic retire ho gaya.",
  "@name 🔧 fix hone se pehle khud broken hai.",
  "@name 🧠 trial version intellect.",
  "@name 🧲 attention magnet, content zero.",
  "@name 🪤 apne hi ego ke trap me.",
  "@name 🔁 repeat pe repeat—fresh kuch nahi.",
  "@name 🧂 extra salty, zero spice.",
  "@name 🎭 comedy show without jokes.",
  "@name 📦 empty dabba with noise.",
  "@name 🔄 sabka time waste, khud ka bhi.",
  "@name 💾 memory ka free trial khatam.",
  "@name 🧯 roast-proof? nahi, bas roast-prone.",
  "@name 🧪 beta version human.",
  "@name 🧹 clean up kar—random bakwaas overflow.",
  "@name 🚽 flush-worthy vibes.",
  "@name 🚧 work in no progress."
];

// helper
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Hinglish Roast API running",
    try: ["/roast?name=Ajeet", "/roast?name=Ajeet&level=max"]
  });
});

// level param future-proof (abhi same bank use ho raha)
app.get("/roast", (req, res) => {
  const name = (req.query.name || "Friend").toString().slice(0, 40);
  const roast = pick(ROASTS).replace(/@name/g, name);
  res.json({ success: true, name, roast });
});

// Local run only
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🔥 Roast API on http://localhost:${PORT}`));
}

// Export for Vercel serverless
module.exports = app;
EOF

git add index.js
git commit -m "feat: add /roast endpoint with short savage Hinglish roasts"
git push
