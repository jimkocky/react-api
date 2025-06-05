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
    const [games, setGames] = useState([]);

const handleClick = async () => {

    if (!steamId) {
        alert("Zadej Steam ID!");
        return;
    }

    const player = await getPlayerSummary(steamId);
    if (player) 
    {
        setUsername(player.personaname);
        setRealName(player.realname || '');
        setAvatar(player.avatarfull);
        setProfileUrl(player.profileurl);
        setCountry(player.loccountrycode || 'Neznámá');

        if (player.gameextrainfo) 
        {
            setStatus(`Ve hře ${player.gameextrainfo}`);
            setLastOnline('');
        }
    
        else if (player.personastate === 1) 
        {
            setStatus("Online");
            setLastOnline('');
        } 

        else if (player.personastate === 0) 
        {
            setStatus("Offline");
            setLastOnline(formatLastOnline(player.lastlogoff));
        } 

        else 
        {
            setStatus("Neznámý");
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
    }

    const data = await getRecentlyPlayedGames(steamId);
    if (data?.games?.length > 0) {
        setGames(data.games);
    } 
    else {
        alert("Nepodařilo se načíst data - špatně zadané ID nebo uživatel má soukromý profil.");
        setGames([]);
    }
};

const formatLastOnline = (unixTime) => {
    const last = new Date(unixTime * 1000);
    const now = new Date();
    const diff = Math.floor((now - last) / 1000);

    if (diff < 60) return `před pár sekundami`;
    if (diff < 3600) return `před ${Math.floor(diff / 60)} minutami`;
    if (diff < 86400) return `před ${Math.floor(diff / 3600)} hodinami`;
    
    return `před ${Math.floor(diff / 86400)} dny`;
};

const getStatusClass = (status) => {
    if (status.startsWith("Ve hře")) return "status-ingame";
    if (status === "Online") return "status-online";
    if (status === "Offline") return "status-offline";
    return "status-unknown";
};

return (

<>
<Corenavbar />
    <div class="home">

        <div class="home-header">
            <h1 class="title-home">Steam Playlog</h1>
            <h2 class="subtitle">Přehled herní aktivity</h2>
            <input type="text" class="input-id" placeholder="Zadej Steam ID…" value={steamId} onChange={(e) => setSteamId(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}/>
        </div>      

        {username && (
            <div class="user-info">
                <img src={avatar} alt="Avatar" class="avatar" />
                <h3>{username}</h3>
                {realName && <p>{realName}</p>}
                {status && <p class={`status ${getStatusClass(status)}`}>{status}</p>}
                {lastOnline && <p>Naposledy online před {lastOnline}</p>}
                <p>{country}</p>
                <a href={profileUrl} target="_blank" rel="noreferrer">Otevřít Steam profil</a>
            </div>
        )}

        {games.length > 0 && (
            <ul class="game-list">
                {games.map((game) => (
                <li key={game.appid} className="game-item">
                    <div class="game-item">
                        <div class="game-row">
                            <img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt={game.name} class="game-icon"/>
                            <div class="game-details">
                                <h3>{game.name}</h3>
                                <p>Nahráno hodin: {Math.round((game.playtime_forever || 0) / 60)} hodin</p>
                                <p>Za poslední 2 týdny: {Math.round((game.playtime_2weeks || 0) / 60)} hodin</p>
                            </div>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        )}
    </div>
</>
);
}