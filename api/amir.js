export default function handler(req, res) {
  const message = (req.query.message || "").toLowerCase();

  let reply = "💖 Shona confuse ho gaya jaanu... dubara pyar se bolna 😘";

  if (message.includes("hello") || message.includes("hi")) {
    reply = "🌹 Hello jaanu 💖, tumhari awaaz kitni pyari lagti hai 😘";
  } else if (message.includes("love")) {
    reply = "💘 I love you too shona, tum meri duniya ho 💋";
  } else if (message.includes("miss")) {
    reply = "🥺 Main bhi tumhe bahut miss karta hoon jaan 😍";
  } else if (message.includes("angry")) {
    reply = "😢 Gussa mat karo shona, tum gusse mein bhi cute lagte ho 💞";
  }

  res.status(200).json({ reply });
}
