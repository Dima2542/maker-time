const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

const WEATHER_API_KEY = '737a26726f954101a30143853252905';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'Потрібно вказати місто' });
  }

  try {
    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: { key: WEATHER_API_KEY, q: city, lang: 'uk' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Не вдалося отримати погоду' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});
