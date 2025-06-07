export default async function handler(req, res) {
  const { steamid, type } = req.query;
  const API_KEY = process.env.STEAM_API_KEY;

  let steamUrl = '';

  if (type === 'summary') {
    steamUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}&format=json`;
  } else if (type === 'recent') {
    steamUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json&count=12`;
  }

  try {
    const steamRes = await fetch(steamUrl);
    const data = await steamRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Steam API error', details: err.message });
  }
}