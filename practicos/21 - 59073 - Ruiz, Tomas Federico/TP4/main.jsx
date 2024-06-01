const claveApi = '674ab25d21bb40315ee163eb3ed1910d';

function App() {
    const [ciudad, setCiudad] = React.useState('Barcelona');
    const [clima, setClima] = React.useState(null);

    const sacarClima = (ciudad) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${claveApi}&lang=es`)
            .then(response => response.json())
            .then(data => {
                const climaDatos = {
                    ciudad: data.name,
                    temperatura: data.main.temp,
                    tempMin: data.main.temp_min,
                    tempMax: data.main.temp_max,
                    humedad: data.main.humidity,
                    icono: data.weather[0].icon
                };
                setClima(climaDatos);
            })
            .catch(error => console.error('Error al obtener datos meteorológicos:', error));
    };

    React.useEffect(() => {
        sacarClima(ciudad);
    }, [ciudad]);

    return (
        <div>
            <BarraCiudades setCiudad={setCiudad} />
            <BarraBusqueda setCiudad={setCiudad} />
            {clima && <CardClima {...clima} />}
        </div>
    );
}

function BarraCiudades({ setCiudad }) {
    return (
        <nav className="nav">
            <ul>
                <li><h3>Clima</h3></li>
            </ul>
            <ul>
                <li><a href="#" className="ciudad" onClick={() => setCiudad('Tucuman')}>Tucuman</a></li>
                <li><a href="#" className="ciudad" onClick={() => setCiudad('Salta')}>Salta</a></li>
                <li><a href="#" className="ciudad" onClick={() => setCiudad('Buenos Aires')}>Buenos Aires</a></li>
            </ul>
        </nav>
    );
}

function BarraBusqueda({ setCiudad }) {
    const [valorInput, setValorInput] = React.useState('');

    const manejarEnvio = (event) => {
        event.preventDefault();
        if (valorInput) {
            setCiudad(valorInput);
        }
    };

    return (
        <div className="buscar">
            <form onSubmit={manejarEnvio}>
                <input
                    className="buscar-input"
                    type="search"
                    name="search"
                    placeholder="Buscar"
                    aria-label="Buscar"
                    value={valorInput}
                    onChange={(e) => setValorInput(e.target.value)}
                />
            </form>
        </div>
    );
}

function CardClima({ ciudad, temperatura, tempMin, tempMax, humedad, icono }) {
    return (
        <article className="tiempo">
            <header className="nombre">{ciudad}</header>
            <img className="imagen" src={`openweathermap/${icono}.svg`} alt="Icono del clima" />
            <footer className="footer">
                <h2>Temperatura: {temperatura.toFixed(2)}°C</h2>
                <p>Mínima: {tempMin.toFixed(2)}°C / Máxima: {tempMax.toFixed(2)}°C</p>
                <p>Humedad: {humedad}%</p>
            </footer>
        </article>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
