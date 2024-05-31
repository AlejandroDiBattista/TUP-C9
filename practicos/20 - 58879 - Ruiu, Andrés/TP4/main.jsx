const API_KEY = '093adf4cfad7ed6349be0f6efe53c574'

const { obtenerClima, debounce } = window.Utilidades;
const { CiudadCard, Nav } = window;

const Clima = () => {
    const [datosClima, setDatosClima] = useState(null);
    const [ultimaCiudadBuscada, setUltimaCiudadBuscada] = useState(null);
    const [ciudadBuscada, setCiudadBuscada] = useState('');
    const [cargando, setCargando] = useState(false);
    const [ciudadNoEncontrada, setCiudadNoEncontrada] = useState(false);

    const handleDebouncedInput = debounce(async (e) => {
        const ciudad = e.target.value;
        if (ciudad.length < 3) {
            if (ciudad.length === 0) {
                setDatosClima(ultimaCiudadBuscada);
            }
            return;
        }
        const datosGuardados = localStorage.getItem(ciudad);
        if (datosGuardados) {
            const datosCiudad = JSON.parse(datosGuardados);
            setDatosClima([datosCiudad]);
            setUltimaCiudadBuscada([datosCiudad]);
            setCiudadNoEncontrada(false);
            setCargando(false);
        } else {
            await obtenerClima(ciudad, setCargando, setDatosClima, setUltimaCiudadBuscada);
        }
    }, 3000);
    

    const handleApretarTecla = async (e) => {
        if (e.key === 'Enter') {
            await obtenerClima(ciudadBuscada, setCargando, setDatosClima, setCiudadNoEncontrada);
        }
    };

    const handleClickCiudad = async (ciudad) => {
        await obtenerClima(ciudad, setCargando, setDatosClima, setCiudadNoEncontrada);
    };

    const handleChangeCiudad = (e) => {
        const ciudad = e.target.value;
        setCiudadBuscada(ciudad);
        setCargando(true);
        if (ciudad.length === 0) {
            setDatosClima(ultimaCiudadBuscada);
            setCargando(false);
        } else {
            handleDebouncedInput(e);
        }
    };
    

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const respuesta = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=es&units=metric`);
            const datosCiudad = await respuesta.json();
            setDatosClima([datosCiudad]);
        }, () => {
            setDatosClima([]);
        });
    }, []);

    return (
        <section className="app" style={{ height: cargando || ciudadNoEncontrada ? "100vh" : "auto" }}>
            <Nav handleClickCiudad={handleClickCiudad} />
            <input
                type="search"
                name="search"
                placeholder="Buscar ciudad"
                aria-label="Search"
                value={ciudadBuscada}
                onChange={handleChangeCiudad}
                onKeyDown={handleApretarTecla}
            />

            {cargando ? (
                <article aria-busy="true">Cargando...</article>
            ) : ciudadNoEncontrada ? (
                <h2 style={{ textAlign: "center" }}>No se encontró la ciudad buscada</h2>
            ) : (
                datosClima && datosClima.map((datosCiudad) => (
                    <CiudadCard key={datosCiudad.name} datosCiudad={datosCiudad} />
                ))
            )}
        </section>
    );
};

window.Clima = Clima;














