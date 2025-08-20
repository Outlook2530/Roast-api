const axios = require("axios");

async function fetchRoast(lang = "en") {
  try {
    const url = `https://evilinsult.com/generate_insult.php?lang=${lang}&type=json`;
    const { data } = await axios.get(url);
    return data.insult || "Couldn't generate roast right now!";
  } catch (err) {
    return "⚠️ Roast service unavailable!";
  }
}

module.exports = async (req, res) => {
  const { query } = req;
  const name = (query.name || "Friend").toString().slice(0, 40);
  const lang = (query.lang || "en").toLowerCase();

  const roast = await fetchRoast(lang);
  const personalized = roast.replace(/@name/gi, name);

  res.status(200).json({
    success: true,
    name,
    lang,
    roast: personalized,
    example: `/api/roast?name=Denish&lang=fr`
  });
};
