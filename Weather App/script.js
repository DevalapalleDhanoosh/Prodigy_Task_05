const url = 'https://api.weatherapi.com/v1/current.json';
const apiKey = '418abf8431fd417897d140923251702'; // Ensure this key is valid

document.getElementById('city-input-btn').addEventListener('click', () => {
    const cityName = document.getElementById('city-input').value;
    if (cityName) {
        fetchWeather(cityName);
    }
});

async function fetchWeather(cityName) {
    try {
        const response = await fetch(`${url}?key=${apiKey}&q=${cityName}&aqi=no`);
        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('weather-info').style.display = 'none';
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.location.name;
    document.getElementById('date').textContent = new Date().toLocaleString();
    document.getElementById('temperature').textContent = `${data.current.temp_c}°C`;
    document.getElementById('description').textContent = data.current.condition.text;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    document.getElementById('weather-icon').src = data.current.condition.icon;
    document.getElementById('weather-info').style.display = 'block';
    document.getElementById('error-message').style.display = 'none'; // Hide error message if successful
}