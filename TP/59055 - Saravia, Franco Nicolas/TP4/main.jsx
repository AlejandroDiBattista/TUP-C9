
const App = () => {
    const obtenerClima = async (ciudad) => {
        const claveApi = '01347cead23028b71cb78cd0fea9d533';
        let ciudadParametro = '';
    
        switch (ciudad) {
            case 'Tucumán':
                ciudadParametro = 'San Miguel de Tucumán';
                break;
            case 'Salta':
                ciudadParametro = 'Salta, Argentina';
                break;
            case 'Buenos Aires':
                ciudadParametro = 'Ciudad Autónoma de Buenos Aires';
                break;
            default:
                ciudadParametro = ciudad;
                break;
        }
    
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadParametro}&appid=${claveApi}&units=metric&lang=es`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
    
        if (datos.cod === 200) {
            setDatosClima(datos);
            setIconoClima(`./icons/${datos.weather[0].icon}.svg`);
        } else {
            console.error('Error en la solicitud:', datos.message);
        }
    };
    const [ciudad, setCiudad] = useState('');
    const [datosClima, setDatosClima] = useState(null);
    const [iconoClima, setIconoClima] = useState('');

    const manejarBusqueda = (e) => {
        e.preventDefault();
        obtenerClima(ciudad, setDatosClima, setIconoClima);
    };

    return (
        <div>
            <h1>Buscar Clima</h1>
            <form onSubmit={manejarBusqueda}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ingresa una ciudad"
                />
                <button type="submit">Buscar</button>
            </form>
            {datosClima && (
                <div>
                    <h2>{datosClima.name}</h2>
                    <p>{datosClima.weather[0].description}</p>
                    <p>Temperatura: {datosClima.main.temp}°C</p>
                    <img src={iconoClima} alt="Icono del clima" />
                </div>
            )}
        </div>
    );
};

