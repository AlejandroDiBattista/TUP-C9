
import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import './App.css';

const API_KEY = '213b37f874cbb0f31df20a643eaa8e80';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}&lang=es`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  const handleCityClick = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  return (
    <div className="App">
      <h1>Clima Actual</h1>
      <div className="city-links">
        <button onClick={() => handleCityClick('Tucuman')}>Tucumán</button>
        <button onClick={() => handleCityClick('Salta')}>Salta</button>
        <button onClick={() => handleCityClick('Buenos Aires')}>Buenos Aires</button>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;
