const API_KEY = process.env.REACT_APP_API_KEY;

export async function getPlayerSummary(steamid) {
  const url = `/api/steam?type=summary&steamid=${steamid}`;
  console.log('Načítám profil ze Steamu pro ID:', steamid);
  console.log('Použitá URL:', url);
  console.log('API klíč:', API_KEY);

  try {
    const res = await fetch(url);

    const resText = await res.text();
    console.log('Odpověď ze Steamu (text):', resText);

    if (!res.ok) throw new Error('Chyba při načítání profilu ze Steamu');

    const data = JSON.parse(resText); 
    return data.response.players[0];
  } catch (err) {
    console.error('Steam API chyba (profil):', err);
    return null;
  }
}