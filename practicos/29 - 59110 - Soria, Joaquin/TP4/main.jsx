const API_KEY = 'c99846becd4e349efda880f266433235';
function App() {
    const [clima, setClima] = useState([]);
    const [ciudad, setCiudad] = useState('Barcelona');
    const obtener = async (ciudad) => {
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`);
        const datos = await respuesta.json();
        setClima([datos]);
    }
    const handleClickCity = (ciudad) => {
        setCiudad(ciudad);
        obtener(ciudad);
    }
    const handleSearch = (event) => {
        obtener(event.target.value);
    }
    useEffect(() => {
        obtener(ciudad);
    }, []);
    return (
        <>
            <nav>
                <ul>
                    <li><h1>Clima</h1></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={() => handleClickCity('Tucuman')}>Tucuman</a></li>
                    <li><a href="#" onClick={() => handleClickCity('Salta')}>Salta</a></li>
                    <li><a href="#" onClick={() => handleClickCity('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <input
                type="search"
                name="search"
                placeholder="Buscar"
                aria-label="Search"
                onChange={handleSearch}
            />
            {clima && clima.map((datos, indice) => (
                datos && datos.main ? (
                    <article key={indice}>
                        <header>
                            {datos.name}
                        </header>
                        <img style={{ backgroundColor: datos.weather[0].icon.includes('d') ? 'lightblue' : '#21233d' }} src={`./openweathermap/${datos.weather[0].icon}.svg`} />
                        <footer>
                            <h3>Temperatura: {datos.main.temp}</h3>
                            <p>Maxima: {datos.main.temp_max} / Minima: {datos.main.temp_min}</p>
                            <p>Humedad: {datos.main.humidity}</p>
                        </footer>
                    </article>
                ) : null
            ))}
        </>
    )
}
