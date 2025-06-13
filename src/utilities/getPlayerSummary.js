const API_KEY = '1EF3D42AC009B6597E5E1235B6E8666A'

export async function getPlayerSummary(steamid) {
  const url = `/steamapi/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}&format=json;`

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