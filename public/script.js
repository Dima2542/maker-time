
async function fetchWeather(city) {
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();
    if (data.error) {
      document.getElementById('location').innerText = data.error;
      document.getElementById('temp').innerText = '';
      document.getElementById('condition').innerText = '';
      document.getElementById('wind').innerText = '';
      return;
    }
    document.getElementById('location').innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temp').innerText = `Температура: ${data.current.temp_c} °C`;
    document.getElementById('condition').innerText = `Стан: ${data.current.condition.text}`;
    document.getElementById('wind').innerText = `Втер: ${data.current.wind_kph} км/ч`;
  }
 
  document.getElementById('selectWeather').addEventListener('click', () => {
    const city = document.getElementById('citySelect').value;
    fetchWeather(city);
  });