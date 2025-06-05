const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.get('/weather', async (req, res) => {
    const city = req.query.city || 'London';
    const apiKey = '737a26726f954101a30143853252905'; 
    const baseUrl = 'http://api.weatherapi.com/v1/current.json';
    try {
        const response = await axios.get(baseUrl, {
            params: {
                key: apiKey,
                q: city,
                aqi: 'no'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Не вдалося отримати дані про погоду для цього міста.' });
    }
});
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});