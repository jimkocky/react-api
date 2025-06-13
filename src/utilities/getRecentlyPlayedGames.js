const API_KEY = '1EF3D42AC009B6597E5E1235B6E8666A'

export async function getRecentlyPlayedGames(steamid, count = 12) {
  const url = `/steamapi/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json&count=${count};`

  console.log('Načítám nedávno hrané hry pro ID:', steamid);
  console.log('Použitá URL:', url);
  console.log('API klíč:', API_KEY);

  try {
    const res = await fetch(url);

    const resText = await res.text();
    console.log('Odpověď ze Steamu (text):', resText);

    if (!res.ok) throw new Error('Chyba při načítání dat ze Steamu');

    const data = JSON.parse(resText);
    return data.response;
  } catch (err) {
    console.error('Steam API chyba:', err);
    return null;
  }
}