const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Povolit CORS
app.use(express.json());

// API klíč pro Steam
const API_KEY = '1EF3D42AC009B6597E5E1235B6E8666A';

// Proxy pro profil
app.get('/api/playerSummary', async (req, res) => {
  const { steamid } = req.query;

  try {
    const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`, {
      params: {
        key: API_KEY,
        steamids: steamid,
        format: 'json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Chyba při získávání dat o profilu');
  }
});

// Proxy pro nedávno hrané hry
app.get('/api/recentlyPlayedGames', async (req, res) => {
  const { steamid, count } = req.query;

  try {
    const response = await axios.get(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/`, {
      params: {
        key: API_KEY,
        steamid: steamid,
        format: 'json',
        count: count || 12
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Chyba při získávání dat o hrách');
  }
});

// Spustit server
app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});