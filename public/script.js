const apiKey = '737a26726f954101a30143853252905';  

const citySelect = document.getElementById('citySelect');
const cityInput = document.getElementById('cityInput');
const btnSelect = document.getElementById('btnSelect');
const btnSearch = document.getElementById('btnSearch');
const errorDiv = document.getElementById('error');
const weatherDisplay = document.getElementById('weatherDisplay');

const locationEl = document.getElementById('location');
const tempEl = document.getElementById('temp');
const conditionEl = document.getElementById('condition');
const windEl = document.getElementById('wind');
const cloudEl = document.getElementById('cloud');
const forecastEl = document.getElementById('forecast');

btnSelect.addEventListener('click', () => {
  const city = citySelect.value;
  fetchWeather(city);
});

btnSearch.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError('Будь ласка, введіть назву міста');
    return;
  }
  fetchWeather(city);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnSearch.click();
  }
});

function showError(message) {
  errorDiv.textContent = message;
  weatherDisplay.style.display = 'none';
}

function clearError() {
  errorDiv.textContent = '';
}

async function fetchWeather(city) {
  clearError();
  weatherDisplay.style.display = 'none';

  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=3&lang=uk`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Місто не знайдено');

    const data = await res.json();

    showWeather(data);
    setDynamicBackground(data.current.condition.text);
  } catch (error) {
    showError(error.message);
  }
}

function showWeather(data) {
  weatherDisplay.style.display = 'block';

  locationEl.textContent = `${data.location.name}, ${data.location.country}`;
  tempEl.textContent = `Температура: ${data.current.temp_c} °C`;
  conditionEl.textContent = `Стан: ${data.current.condition.text}`;
  windEl.textContent = `Вітер: ${data.current.wind_kph} км/год`;
  cloudEl.textContent = `Хмарність: ${data.current.cloud} %`;

  // Прогноз на 3 дні
  // forecastEl.innerHTML = '';
  // data.forecast.forecastday.forEach(day => {
  //   const date = new Date(day.date).toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' });
  //   const html = `
  //     <div class="forecast-day">
  //       <strong>${date}</strong><br/>
  //       Стан: ${day.day.condition.text}<br/>
  //       Макс: ${day.day.maxtemp_c} °C, Мін: ${day.day.mintemp_c} °C<br/>
  //       Вітер: ${day.day.maxwind_kph} км/год<br/>
  //       Хмарність: ${day.day.daily_chance_of_cloud}%<br/>
  //       Опади: ${day.day.daily_chance_of_rain}%<br/>
  //     </div>
  //   `;
  //   forecastEl.insertAdjacentHTML('beforeend', html);
  // });
}

function setDynamicBackground(condition) {
  const c = condition.toLowerCase();

  if (c.includes('ясно') || c.includes('sunny') || c.includes('clear')) {
    document.body.style.background = 'linear-gradient(to bottom, #fceabb, #f8b500)'; 
  } else if (c.includes('хмарно') || c.includes('cloudy') || c.includes('overcast')) {
    document.body.style.background = 'linear-gradient(to bottom, #d7d2cc, #304352)'; 
  } else if (c.includes('дощ') || c.includes('rain')) {
    document.body.style.background = 'linear-gradient(to bottom, #4e54c8, #8f94fb)'; 
  } else if (c.includes('гроза') || c.includes('thunder')) {
    document.body.style.background = 'linear-gradient(to bottom, #232526, #1c1c1c)';
  } else if (c.includes('сніг') || c.includes('snow')) {
    document.body.style.background = 'linear-gradient(to bottom, #e6e9f0, #eef1f5)'; 
  } else {

    document.body.style.background = 'linear-gradient(to bottom, #87ceeb, #f0f8ff)';
  }
}
