export default async function handler(req, res) {
  const { type, steamid } = req.query;
  const API_KEY = process.env.STEAM_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing Steam API Key" });
  }

  let url = "";
  if (type === "summary") {
    url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}&format=json`;
  } else if (type === "recent") {
    url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json`;
  } else {
    return res.status(400).json({ error: "Invalid type" });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Steam API error", details: error.message });
  }
}