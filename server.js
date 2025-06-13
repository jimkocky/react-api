const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const API_KEY = '1EF3D42AC009B6597E5E1235B6E8666A';

app.get('/api/player-summary', async (req, res) => {
    const { steamid } = req.query;
    if (!steamid) {
        return res.status(400).json({ error: 'Missing steamid parameter' });
    }

    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching data from Steam API' });
    }
});

app.get('/api/recently-played-games', async (req, res) => {
    const { steamid, count = 12 } = req.query;
    if (!steamid) {
        return res.status(400).json({ error: 'Missing steamid parameter' });
    }

    const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json&count=${count}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching data from Steam API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
