const API_KEY = '093adf4cfad7ed6349be0f6efe53c574'

const { obtenerClima, debounce } = window.utilidades;
const { CiudadCard, Nav } = window;

const Clima = () => {
    const [datosClima, setDatosClima] = useState(null);
    const [ultimaCiudadBuscada, setUltimaCiudadBuscada] = useState(null);
    const [ciudadBuscada, setCiudadBuscada] = useState('');
    const [cargando, setCargando] = useState(false);
    const [ciudadNoEncontrada, setCiudadNoEncontrada] = useState(false);

    const handleDebouncedInput = useCallback(debounce((ciudad) => {
        if (ciudad.length >= 3) {
            obtenerClima(ciudad, setCargando, setDatosClima, setUltimaCiudadBuscada, setCiudadNoEncontrada);
        }
    }, 2000), []);
    
    const handleInputChange = (e) => {
        const ciudad = e.target.value;
        setCiudadBuscada(ciudad);
        setCargando(true);
        if (ciudad.length === 0) {
            setDatosClima(ultimaCiudadBuscada);
            setCargando(false);
            setCiudadNoEncontrada(false);
        } else {
            handleDebouncedInput(ciudad.trim());
        }
    };
    

    const handleClickCiudad = async (ciudad) => {
        setCiudadNoEncontrada(false);
        await obtenerClima(ciudad, setCargando, setDatosClima, setUltimaCiudadBuscada);
        setCiudadBuscada('');
    };

    const handleApretarTecla = async (e) => {
        if (e.key === 'Enter') {
            await obtenerClima(ciudadBuscada, setCargando, setDatosClima, setUltimaCiudadBuscada);
            setCiudadBuscada('');
        }
    };

    const geolocalizacion = async () => {
        setCargando(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const respuesta = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=es&units=metric`);
            const datosCiudad = await respuesta.json();
            setDatosClima([datosCiudad]);
            setUltimaCiudadBuscada([datosCiudad]);
            setCargando(false);
        }, () => {
            setDatosClima([]);
            setCargando(false);
        });
    };

    useEffect(() => {
        geolocalizacion();
    }, []);

    return (
        <section className="app" style={{ height: cargando || ciudadNoEncontrada || (datosClima && datosClima.length === 0) ? "100vh" : "auto" }}>
            <Nav handleClickCiudad={handleClickCiudad} />
            <input
                type="search"
                name="search"
                placeholder="Buscar ciudad"
                aria-label="Search"
                value={ciudadBuscada}
                onChange={handleInputChange}
                onKeyDown={handleApretarTecla}
            />

            {cargando ? (
                <article aria-busy="true" style={{ color: "gray" }}>Cargando...</article>
            ) : ciudadNoEncontrada || (datosClima && datosClima.length === 0) ? (
                <h2 style={{ textAlign: "center" }}>No se encontró la ciudad buscada</h2>
            ) : (
                datosClima && datosClima.map((datosCiudad) => (
                    <CiudadCard key={datosCiudad.id} datosCiudad={datosCiudad} />
                ))
            )}
        </section>
    );
};

window.Clima = Clima;














