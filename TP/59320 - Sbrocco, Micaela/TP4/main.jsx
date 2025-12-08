const { useEffect, useState } = React;
const { createRoot } = ReactDOM;

const API_KEY = '30d38b26954359266708f92e1317dac0';

function App() {
    const [dataClima, setDataClima] = useState(null);
    const [ciudad, setCiudad] = useState("Tucuman");
    const [ciudadBusqueda, setCiudadBusqueda] = useState('');

    useEffect(() => {
        const fetchClima = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }
                const data = await response.json();
                setDataClima(data);
            } catch (error) {
                console.error("Error con el Fetch", error);
            }
        };
        fetchClima();
    }, [ciudad]);

    const handleCambioCiudad = (ciudadSeleccionada) => {
        setCiudad(ciudadSeleccionada);
    };

    const handleBuscarCiudad = () => {
        setCiudad(ciudadBusqueda);
    };

    const handleInputCambioCiudad = (event) => {
        setCiudadBusqueda(event.target.value);
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleBuscarCiudad();
        }
    };

    const iconFileName = dataClima && dataClima.weather && dataClima.weather.length > 0 ? `${dataClima.weather[0]?.icon}.svg` : null;
    const rutaIcono = iconFileName ? `openweathermap/${iconFileName}` : null;

    return (
        <div className="tarjeta">
            <div className="cabecera">
            <h1>Clima</h1>
            <div className="botones">
                <a href="#" onClick={() => handleCambioCiudad('Tucuman')}>Tucumán</a>
                <a href="#" onClick={() => handleCambioCiudad('Salta')} >Salta</a>
                <a href="#" onClick={() => handleCambioCiudad('Buenos Aires')} >Buenos Aires</a>
            </div>
            </div>
            <br/>
            <input type="search" placeholder="Buscar" name="search" aria-label="Search"  value={ciudadBusqueda} onChange={handleInputCambioCiudad} onKeyDown={handleEnter} />
            {dataClima && (
                <div>
                    <article>
                        <header>
                            <h1 className="nombreCiudad">{dataClima.name}</h1>
                        </header>
                        <div className="fondoImg">
                        <img src={rutaIcono} alt="Icono del clima" />
                        </div>
                        <footer>
                            <h1>{dataClima.main.temp}°C</h1>
                            <p>Mínima: {dataClima.main.temp_min}°C / Máxima: {dataClima.main.temp_max}°C</p>
                            <p>Humedad: {dataClima.main.humidity}%</p>
                        </footer>
                    </article>
                </div>
            )}
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
