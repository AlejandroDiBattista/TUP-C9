const apiKey = '674ab25d21bb40315ee163eb3ed1910d';

function WeatherApp() {
    const [city, setCity] = React.useState('Salta');
    const [weather, setWeather] = React.useState(null);

    const fetchWeather = (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=es`)
            .then(response => response.json())
            .then(data => {
                const weatherData = {
                    cityName: data.name,
                    temp: data.main.temp,
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    humidity: data.main.humidity,
                    icon: data.weather[0].icon
                };
                setWeather(weatherData);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    };

    React.useEffect(() => {
        fetchWeather(city);
    }, [city]);

    return (
        <div>
            <Navigation setCity={setCity} />
            <SearchBar setCity={setCity} />
            {weather && <WeatherCard {...weather} />}
        </div>
    );
}

function Navigation({ setCity }) {
    return (
        <nav className="navigation">
            <h3>Clima</h3>
            <ul>
                <li><a href="#" className="city-link" onClick={() => setCity('Tucuman')}>Tucuman</a></li>
                <li><a href="#" className="city-link" onClick={() => setCity('Salta')}>Salta</a></li>
                <li><a href="#" className="city-link" onClick={() => setCity('Buenos Aires')}>Buenos Aires</a></li>
            </ul>
        </nav>
    );
}

function SearchBar({ setCity }) {
    const [inputValue, setInputValue] = React.useState('');

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (inputValue) {
            setCity(inputValue);
        }
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearchSubmit}>
                <input
                    className="search-input"
                    type="search"
                    name="search"
                    placeholder="Buscar"
                    aria-label="Search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </form>
        </div>
    );
}

function WeatherCard({ cityName, temp, minTemp, maxTemp, humidity, icon }) {
    return (
        <article className="weather-card">
            <header className="city-name">{cityName}</header>
            <img className="weather-icon" src={`openweathermap/${icon}.svg`} alt="Weather icon" />
            <footer className="weather-details">
                <h2>Temperatura: {temp.toFixed(2)}°C</h2>
                <p>Min: {minTemp.toFixed(2)}°C / Max: {maxTemp.toFixed(2)}°C</p>
                <p>Humedad: {humidity}%</p>
            </footer>
        </article>
    );
}

const rootElement = ReactDOM.createRoot(document.getElementById('root'));
rootElement.render(<WeatherApp />);
