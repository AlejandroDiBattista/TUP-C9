const claveApi = 'e1578b1bb60380349206aaaafc54d07f';

function Aplicacion() {
    const [ciudad, setCiudad] = React.useState('Barcelona');
    const [clima, setClima] = React.useState(null);

    const obtenerClima = (ciudad) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${claveApi}&lang=es`)
            .then(response => response.json())
            .then(data => {
                const datosClimaticos = {
                    ciudad: data.name,
                    temperatura: data.main.temp,
                    tempMin: data.main.temp_min,
                    tempMax: data.main.temp_max,
                    humedad: data.main.humidity,
                    icono: data.weather[0].icon
                };
                setClima(datosClimaticos);
            })
            .catch(error => console.error('Error al obtener los datos climáticos:', error));
    };

    React.useEffect(() => {
        obtenerClima(ciudad);
    }, [ciudad]);

    return (
        <div>
            <BarraNavegacion setCiudad={setCiudad} />
            <BarraBusqueda setCiudad={setCiudad} />
            {clima && <TarjetaClimatica {...clima} />}
        </div>
    );
}

function BarraNavegacion({ setCiudad }) {
    return (
        <nav className="nav">
            <ul>
                <li><h3>Clima</h3></li>
            </ul>
            <ul>
                <li><a href="#" className="ciudades" onClick={() => setCiudad('Tucuman')}>Tucumán</a></li>
                <li><a href="#" className="ciudades" onClick={() => setCiudad('Salta')}>Salta</a></li>
                <li><a href="#" className="ciudades" onClick={() => setCiudad('Buenos Aires')}>Buenos Aires</a></li>
            </ul>
        </nav>
    );
}

function BarraBusqueda({ setCiudad }) {
    const [valorInput, setValorInput] = React.useState('');

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        if (valorInput) {
            setCiudad(valorInput);
        }
    };

    return (
        <div className="search">
            <form onSubmit={manejarEnvio}>
                <input
                    className="search-input"
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

function TarjetaClimatica({ ciudad, temperatura, tempMin, tempMax, humedad, icono }) {
    return (
        <article className="tiempo">
            <header className="nombre-ciudad">{ciudad}</header>
            <img className="tiempo2" src={`openweathermap/${icono}.svg`} alt="Ícono del clima" />
            <footer className="footer">
                <h2>Temperatura: {temperatura.toFixed(2)}°C</h2>
                <p>Mínima: {tempMin.toFixed(2)}°C / Máxima: {tempMax.toFixed(2)}°C</p>
                <p>Humedad: {humedad}%</p>
            </footer>
        </article>
    );
}

const raiz = ReactDOM.createRoot(document.getElementById('root'));
raiz.render(<Aplicacion />);
