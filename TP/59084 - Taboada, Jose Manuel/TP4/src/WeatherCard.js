
import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { name, main, weather } = weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <p>Temperatura actual: {main.temp} °C</p>
      <p>Temperatura mínima: {main.temp_min} °C</p>
      <p>Temperatura máxima: {main.temp_max} °C</p>
      <p>Humedad: {main.humidity} %</p>
    </div>
  );
};

export default WeatherCard;
