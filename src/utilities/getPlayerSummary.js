// Dynamická URL podle prostředí (localhost vs produkce)
const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'  // URL pro localhost
  : 'https://<heroku-app-name>.herokuapp.com';  // URL pro produkci na Heroku

export async function getPlayerSummary(steamid) {
  const url = `${BASE_URL}/getPlayerSummary?steamid=${steamid}`;  // Dynamická URL pro API volání

  console.log('Načítám profil ze Steamu pro ID:', steamid);
  console.log('Použitá URL:', url);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Chyba při načítání dat ze Steamu');

    const data = await res.json();  // Rozparsování JSON odpovědi
    return data.response.players[0];
  } catch (err) {
    console.error('Steam API chyba (profil):', err);
    return null;
  }
}