const API_KEY = process.env.REACT_APP_API_KEY;

export async function getRecentlyPlayedGames(steamid, count = 12) {
  const url = `/steamapi/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json&count=${count}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Chyba při načítání dat ze Steamu');
    const data = await res.json();
    return data.response;
  } catch (err) {
    console.error('Steam API chyba:', err);
    return null;
  }
}