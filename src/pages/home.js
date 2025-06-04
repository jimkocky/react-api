import { useState } from 'react';
import Corenavbar from "../components/navbar";
import { getRecentlyPlayedGames } from "../utilities/getRecentlyPlayedGames";
import { getPlayerSummary } from "../utilities/getPlayerSummary";

export default function Home() {
    const [steamId, setSteamId] = useState('');
    const [username, setUsername] = useState('');
    const [realName, setRealName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [status, setStatus] = useState('');
    const [lastOnline, setLastOnline] = useState('');
    const [country, setCountry] = useState('');
    const [currentGame, setCurrentGame] = useState('');
    const [games, setGames] = useState([]);

    const handleClick = async () => {

    if (!steamId) {
        alert("Zadej Steam ID!");
        return;
    }

    const player = await getPlayerSummary(steamId);
    if (player) {
        setUsername(player.personaname);
        setRealName(player.realname || '');
        setAvatar(player.avatarfull);
        setProfileUrl(player.profileurl);
        setCountry(player.loccountrycode || 'Neznámá');

        if (player.gameextrainfo) {
            setStatus("Ve hře");
            setCurrentGame(player.gameextrainfo);
            setLastOnline('');
        } 
        else if (player.personastate === 1) 
        {
            setStatus("Online");
            setCurrentGame('');
            setLastOnline('');
        } 
    
        else if (player.personastate === 0) 
        {
            setStatus("Offline");
            setCurrentGame('');
            setLastOnline(formatLastOnline(player.lastlogoff));
        } 
    
        else 
        {
            setStatus("Neznámý");
            setCurrentGame('');
            setLastOnline('');
        }
    } 
    
    else {
        setUsername('');
        setRealName('');
        setAvatar('');
        setProfileUrl('');
        setStatus('');
        setLastOnline('');
        setCountry('');
        setCurrentGame('');
    }

    const data = await getRecentlyPlayedGames(steamId);
    if (data?.games?.length > 0) {
      setGames(data.games);
    } else {
      alert("Nepodařilo se načíst data - špatně zadané ID nebo uživatel má soukromý profil.");
      setGames([]);
    }
  };

    const formatLastOnline = (unixTime) => 
    {
        const last = new Date(unixTime * 1000);
        const now = new Date();
        const diff = Math.floor((now - last) / 1000);

        if (diff < 60) return `před pár sekundami`;
        if (diff < 3600) return `před ${Math.floor(diff / 60)} minutami`;
        if (diff < 86400) return `před ${Math.floor(diff / 3600)} hodinami`;
        return `před ${Math.floor(diff / 86400)} dny`;
    };

return (
    <>
        <Corenavbar />
        <div className="steam">
        <h1 className="title-steam">Steam Playlog: Gaming Activity Tracker</h1>

        <input
            type="text"
            className="input-steam"
            placeholder="Zadej své Steam ID…"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
        />

        <button className="btn-steam" onClick={handleClick}>Zobrazit hry</button>

        {username && 
        (
            <div className="user-info">
                <img src={avatar} alt="Avatar" className="avatar" />
                <h3>{username}</h3>
                {realName && <p>Skutečné jméno: {realName}</p>}
                <p>Status: {status}</p>
                {currentGame && <p>Aktuálně hraje: {currentGame}</p>}
                {lastOnline && <p>Naposledy online: {lastOnline}</p>}
                <p>Země: {country}</p>
                <p>
                    <a href={profileUrl} target="_blank" rel="noreferrer">Otevřít Steam profil</a>
                </p>
            </div>
        )}

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