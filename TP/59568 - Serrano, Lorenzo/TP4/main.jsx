const apiKey = 'd178304d8070f7c945c1f04cb5db3b4b';

function App() {
    const [Ciudad, setCiudad] = React.useState('Barcelona');
    const [weather, setWeather] = React.useState(null);

    const getWeather = (Ciudad) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Ciudad}&units=metric&appid=${apiKey}&lang=es`)
            .then(response => response.json())
            .then(data => {
                const weatherData = {
                    Ciudad: data.name,
                    Temperatura: data.main.temp,
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    humidity: data.main.humidity,
                    icon: data.weather[0].icon
                };
                setWeather(weatherData);
            })
            .catch(error => console.error('Error al obtener datos meteorológicos:', error));
    };

    React.useEffect(() => {
        getWeather(Ciudad);
    }, [Ciudad]);

    return (
        <div>
            <NavBar setCiudad={setCiudad} />
            <SearchBar setCiudad={setCiudad} />
            {weather && <WeatherCard {...weather} />}
        </div>
    );
}

function NavBar({ setCiudad }) {
    return (
        <nav className="nav">
            <ul>
                <li><h3>Clima</h3></li>
            </ul>
            <ul>
                <li><a href="#" className="ciudades" onClick={() => setCiudad('Tucuman')}>Tucuman</a></li>
                <li><a href="#" className="ciudades" onClick={() => setCiudad('Salta')}>Salta</a></li>
                <li><a href="#" className="ciudades" onClick={() => setCiudad('Buenos Aires')}>Buenos Aires</a></li>
            </ul>
        </nav>
    );
}

function SearchBar({ setCiudad }) {
    const [inputValue, setInputValue] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue) {
            setCiudad(inputValue);
        }
    };

    return (
        <div className="search">
            <form onSubmit={handleSubmit}>
                <input
                    className="entrada-de-busqueda"
                    type="search"
                    name="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </form>
        </div>
    );
}

function WeatherCard({ Ciudad, Temperatura, minTemp, maxTemp, humidity, icon }) {
    return (
        <article className="tiempo">
            <header className="titulo">{Ciudad}</header>
            <img className="imagen" src={`openweathermap/${icon}.svg`} alt="Weather icon" />
            <footer className="footer">
            <h2>Temperatura: {Temperatura.toFixed(2)}°C</h2>
            <p>Mínima: {minTemp.toFixed(2)}°C / Máxima: {maxTemp.toFixed(2)}°C</p>
            <p>Humedad: {humidity}%</p>
            </footer>
            
            
        </article>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
