export default async function handler(req, res) {
  const { type, steamid } = req.query;
  const API_KEY = process.env.REACT_APP_API_KEY;

  let url = '';

  if (type === 'summary') {
    url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}&format=json`;
  } else if (type === 'recent') {
    url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json&count=12`;
  } else {
    return res.status(400).json({ error: 'Invalid type parameter' });
  }

  try {
    const steamRes = await fetch(url);
    const data = await steamRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Steam API chyba:', error);
    res.status(500).json({ error: 'Steam API error', details: error.message });
  }
}