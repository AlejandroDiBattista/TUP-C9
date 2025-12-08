const { useState, useEffect } = React;

const API_KEY = '88c4aa726d6bc4cddb5d2787bd191a6e';

function App() {
  const [city, setCity] = useState('Barcelona');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const cityInput = event.target.elements.city.value;
    setCity(cityInput);
  };

  const handleCityClick = (city) => {
    setCity(city);
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return 'public/icons/soleado.svg'; // Icono de sol
      case 'Clouds':
        return 'public/icons/nublado.svg'; // Icono de nubes
      case 'Rain':
        return 'public/icons/lluvia.svg'; // Icono de lluvia
      case 'Snow':
        return 'public/icons/nieve.svg'; // Icono de nieve
      case 'Thunderstorm':
        return 'public/icons/tormentaelectrica.svg'; // Icono de tormenta eléctrica
      default:
        return 'public/icons/soleado.svg'; // Icono por defecto
    }
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li><strong>Clima</strong></li>
        </ul>
        <ul>
          <li><a href="#" onClick={() => handleCityClick('Tucuman')}>Tucuman</a></li>
          <li><a href="#" onClick={() => handleCityClick('Salta')}>Salta</a></li>
          <li><a href="#" onClick={() => handleCityClick('Buenos Aires')}>Buenos Aires</a></li>
        </ul>
      </nav>

      <main>
        <form onSubmit={handleSearch}>
          <input
            type="search"
            name="city"
            placeholder="Buscar"
            aria-label="Buscar"
          />
        </form>
        
        <article>
          {weather && (
            <section id="weatherSection">
              <header>
                <h2>{weather.name}</h2>
              </header>
              <img src={getWeatherIcon(weather.weather[0].main)} alt="icon-weather" />
              <footer>
                <h3>Temperatura: {weather.main.temp}°C</h3>
                <p>Mínima: {weather.main.temp_min}°C / Máxima: {weather.main.temp_max}°C</p>
                <p>Humedad: {weather.main.humidity}%</p>
              </footer>
            </section>
          )}
        </article>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
