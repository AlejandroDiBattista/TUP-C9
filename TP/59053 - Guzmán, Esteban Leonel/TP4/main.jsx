const { useState, useEffect } = React;

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'c83856048b2feb271b81fcd606704e0b'; // Reemplaza 'TU_API_KEY' con tu propia API key de OpenWeatherMap

  const fetchWeather = async (selectedCity) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error al obtener los datos meteorológicos. Inténtalo de nuevo más tarde.');
    }
  };

  const handleSearch = () => {
    fetchWeather(city);
  };

  const handleCityClick = (selectedCity) => {
    setCity(selectedCity);
    fetchWeather(selectedCity);
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return 'public/icons/soleado.svg'; // Sun icon
      case 'Clouds':
        return 'public/icons/nublado.svg'; // Cloud icon
      case 'Rain':
        return 'public/icons/lluvia.svg'; // Rain icon
      case 'Snow':
        return 'public/icons/nevando.svg'; // Snow icon
      case 'Thunderstorm':
        return 'public/icons/tormentaelectrica.svg'; // Thunderstorm icon
      default:
        return 'public/icons/soleado.svg'; // Default icon
    }
  };

  return (
    
    
    <div className="container">
      
      <nav className="nav">
        <ul>
          <li><strong>Clima</strong></li>
        </ul>
        <ul>
          <li><a href="#" onClick={() => handleCityClick('Tucuman')}>Tucumán</a></li>
          <li><a href="#" onClick={() => handleCityClick('Salta')}>Salta</a></li>
          <li><a href="#" onClick={() => handleCityClick('Buenos Aires')}>Buenos Aires</a></li>
        </ul>
      </nav>
      <div className="search">
        <input className="input"
          type="search"
          name="search"
          placeholder="Buscar..."
          aria-label="Search"
          value={city}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

      </div>
     <div >
    
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="card">
         <header>
          <h2>{weatherData.name}</h2>
          </header>
    
        
          <div className="icon">
          <img  src={getWeatherIcon(weatherData.weather[0].main)} alt="icon-weather" />
          </div>
    
          <footer>
          <h3>Temperatura: {weatherData.main.temp}°C</h3>
          <p>Mínima: {weatherData.main.temp_min}°C / Máxima: {weatherData.main.temp_max}°C</p>
          <p>Humedad: {weatherData.main.humidity}%</p>
          </footer>
        </div>
      )}
    </div>
    </div>
  
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
