const API_KEY = '30d38b26954359266708f92e1317dac0'

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const predefinedCities = ["Tucuman", "Salta", "Buenos Aires"];

    useEffect(() => {
        if (city) {
            fetchWeather(city);
        }
    }, [city]);

    const fetchWeather = async (cityName) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=es`);
        const data = await response.json();
        setWeather(data);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleCitySubmit = (event) => {
        event.preventDefault();
        fetchWeather(city);
    }

    return (
        <div>
            <h1>App Clima</h1>
            <nav>
                {predefinedCities.map((city) => (
                    <button key={city} onClick={() => setCity(city)}>{city}</button>
                ))}
            </nav>
            <form onSubmit={handleCitySubmit}>
                <input type="text" value={city} onChange={handleCityChange} placeholder="Buscar ciudad" />
                <button type="submit">Buscar</button>
            </form>
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperatura actual: {weather.main.temp}°C</p>
                    <p>Temperatura mínima: {weather.main.temp_min}°C</p>
                    <p>Temperatura máxima: {weather.main.temp_max}°C</p>
                    <p>Humedad: {weather.main.humidity}%</p>
                    <WeatherIcon icon={weather.weather[0].icon} />
                    <p>{weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

function WeatherIcon({ icon }) {
    const iconMap = {
        '01d': 'clear-day.svg',
        '01n': 'clear-night.svg',
        '02d': 'partly-cloudy-day.svg',
        '02n': 'partly-cloudy-night.svg',
        '03d': 'cloudy.svg',
        '03n': 'cloudy.svg',
        '04d': 'overcast.svg',
        '04n': 'overcast.svg',
        '09d': 'drizzle.svg',
        '09n': 'drizzle.svg',
        '10d': 'rain.svg',
        '10n': 'rain.svg',
        '11d': 'thunderstorms.svg',
        '11n': 'thunderstorms.svg',
        '13d': 'snow.svg',
        '13n': 'snow.svg',
        '50d': 'mist.svg',
        '50n': 'mist.svg',
    };

    const iconUrl = `/icons/${iconMap[icon]}`;

    return <img src={iconUrl} alt="Weather Icon" />;
}
