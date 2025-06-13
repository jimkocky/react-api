const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001; // Můžeš změnit na libovolný port

// Tady vlož svůj Steam API klíč
const API_KEY = '1EF3D42AC009B6597E5E1235B6E8666A';

app.get('/getPlayerSummary', async (req, res) => {
    const steamid = req.query.steamid;
    if (!steamid) {
        return res.status(400).json({ error: 'Steam ID je povinné!' });
    }

    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}&format=json`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Chyba při načítání dat z API' });
    }
});

app.get('/getRecentlyPlayedGames', async (req, res) => {
    const steamid = req.query.steamid;
    const count = req.query.count || 12; // Počet her, který chceme získat
    if (!steamid) {
        return res.status(400).json({ error: 'Steam ID je povinné!' });
    }

    const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json&count=${count}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Chyba při načítání dat z API' });
    }
});

// Spuštění serveru
app.listen(port, () => {
    console.log(`Proxy server běží na http://localhost:${port}`);
});
