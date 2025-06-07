const API_KEY = process.env.REACT_APP_API_KEY;

export async function getRecentlyPlayedGames(steamid, count = 12) {
  const url = `/api/steam?type=recent&steamid=${steamid}`;

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