const apiKey = '30d38b26954359266708f92e1317dac0';

function App() {
    const [ciudad, setciudad] = React.useState('Mar del Plata');
    const [weather, setWeather] = React.useState(null);

    const getWeather = (ciudad) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}&lang=es`)
            .then(response => response.json())
            .then(data => {
                const datoclima = {
                    ciudad: data.name,
                    temperatura: data.main.temp,
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    humidity: data.main.humidity,
                    icon: data.weather[0].icon
                };
                setWeather(datoclima);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    };

    React.useEffect(() => {
        getWeather(ciudad);
    }, [ciudad]);

    return (
        <div>
            <NavBar setciudad={setciudad} />
            <SearchBar setciudad={setciudad} />
            {weather && <WeatherCard {...weather} />}
        </div>
    );
}

function NavBar({ setciudad }) {
    return (
        <nav className="nav">
            <ul>
                <li><h3>App Clima</h3></li>
            </ul>
            <ul>
                <li><a href="#" className="ciudad" onClick={() => setciudad('Tucuman')}>Tucuman</a></li>
                <li><a href="#" className="ciudad" onClick={() => setciudad('Salta')}>Salta</a></li>
                <li><a href="#" className="ciudad" onClick={() => setciudad('Buenos Aires')}>Buenos Aires</a></li>
            </ul>
        </nav>
    );
}

function SearchBar({ setciudad }) {
    const [inputValue, setInputValue] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue) {
            setciudad(inputValue);
        }
    };

    return (
        <div className="buscar">
            <form onSubmit={handleSubmit}>
                <input
                    className="Buscador"
                    type="buscar"
                    name="buscar"
                    placeholder="BUSCA TU CIUDAD"
                    aria-label="BUSCA TU CIUDAD"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </form>
        </div>
    );
}

function WeatherCard({ ciudad, temperatura, minTemp, maxTemp, humidity, icon }) {
    return (
        <article className="tiempo">
            <header className="ciudadess">{ciudad}</header>
            <footer className="footer">
            <h2>Temperatura: {temperatura.toFixed(2)}°C</h2>
            <p>Mínima: {minTemp.toFixed(2)}°C / Máxima: {maxTemp.toFixed(2)}°C</p>
            <p>Humedad: {humidity}%</p>
            </footer>
            
            
        </article>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);