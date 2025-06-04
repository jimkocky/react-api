const API_KEY = process.env.REACT_APP_API_KEY;

export async function getPlayerSummary(steamid) {
  const url = `/steamapi/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}&format=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Chyba při načítání profilu ze Steamu');
    const data = await res.json();
    return data.response.players[0];
  } catch (err) {
    console.error('Steam API chyba (profil):', err);
    return null;
  }
}