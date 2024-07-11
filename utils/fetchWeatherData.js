const axios = require('axios');

async function fetchWeatherData(location) {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;  // Ensure your API key is stored in environment variables
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Constructing the weather data object
        const weatherData = {
            name: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            windSpeed: data.wind.speed
        };

        return weatherData;  // Returning the fetched weather data
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        throw error;  // Re-throw the error to be handled by the caller
    }
}

module.exports = fetchWeatherData;
