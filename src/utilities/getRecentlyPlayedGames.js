// Dynamická URL podle prostředí (localhost vs produkce)
const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'  // URL pro localhost
  : 'https://<heroku-app-name>.herokuapp.com';  // URL pro produkci na Heroku

export async function getRecentlyPlayedGames(steamid, count = 12) {
  const url = `${BASE_URL}/getRecentlyPlayedGames?steamid=${steamid}&count=${count}`;  // Dynamická URL pro API volání

  console.log('Načítám nedávno hrané hry pro ID:', steamid);
  console.log('Použitá URL:', url);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Chyba při načítání her ze Steamu');

    const data = await res.json();  // Rozparsování JSON odpovědi
    return data.response;
  } catch (err) {
    console.error('Steam API chyba (hry):', err);
    return null;
  }
}
