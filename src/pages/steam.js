import { useState } from 'react';
import Corenavbar from "../components/navbar";
import { getRecentlyPlayedGames } from "../utilities/getRecentlyPlayedGames";

export default function Steam() {
  const [steamId, setSteamId] = useState('');
  const [games, setGames] = useState([]);

  const handleClick = async () => {
    if (!steamId) {
      alert("Zadej Steam ID!");
      return;
    }

    const data = await getRecentlyPlayedGames(steamId);
    if (data?.games?.length > 0) {
      setGames(data.games);
    } else {
      alert("Nepodařilo se načíst data. Zkontroluj Steam ID nebo jestli má profil veřejný.");
    }
  };

  return (
    <>
      <Corenavbar />
      <div className="steam">
        <h1 className="title-steam">Steam Playlog: Gaming Activity Tracker</h1>
        <h2 className="subtitle-steam">
          Sleduj svou herní aktivitu a prohlédni si přehled svých nejoblíbenějších her!
        </h2>
        <input
          type="text"
          className="input-steam"
          placeholder="Zadej své Steam ID…"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)}
        />
        <button className="btn-steam" onClick={handleClick}>
          Zobrazit hry
        </button>

        {games.length > 0 && (
          <ul className="game-list">
            {games.map((game) => (
              <li key={game.appid} className="game-item">
                <h3>{game.name}</h3>
                <p>Hráno za celou dobu: {Math.round((game.playtime_forever || 0) / 60)} hodin</p>
                <p>Hráno za poslední 2 týdny: {Math.round((game.playtime_2weeks || 0) / 60)} hodin</p>
                <img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt={game.name} className="game-icon"/>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}