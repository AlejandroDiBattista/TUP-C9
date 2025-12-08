const { useState } = React;

function App() {
    const [ciudad, setCiudad] = useState('');
    const [clima, setClima] = useState(null);
    const [climaIcono, setClimaIcono] = useState('');

    const busqueda = async (nombreCiudad) => {
        const apiKey = 'f7d7e3aeadcbae5cb484483a02b1a0cd';
        let nombreCiudadParametro = '';

        switch (nombreCiudad) {
            case 'Tucumán': nombreCiudadParametro = 'San Miguel de Tucumán';
                break;
            case 'Salta': nombreCiudadParametro = 'Salta, Argentina';
                break;
            case 'Buenos Aires': nombreCiudadParametro = 'Ciudad Autónoma de Buenos Aires';
                break;
            default: nombreCiudadParametro = nombreCiudad;
                break;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudadParametro}&appid=${apiKey}&units=metric&lang=es`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if(datos.cod === 200){
            setClima(datos);
            setClimaIcono(`./iconos/${datos.weather[0].icon}.svg`);
        }
        else{
            console.error('Error en la busqueda: ', datos.message);
        }
    }

    return(
        <div className="clima">
            <nav>
                <ul>
                    <li><h1 className="titulo">CLIMA</h1></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={() => busqueda('Tucumán')}>Tucumán</a></li>
                    <li><a href="#" onClick={() => busqueda('Salta')}>Salta</a></li>
                    <li><a href="#" onClick={() => busqueda('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <form role="search" onSubmit={(e) => {e.preventDefault(); busqueda(ciudad);}}>
                <input
                    name="buscador"
                    type="search"
                    placeholder="Buscar"
                    autoComplete="off"
                    required
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                />
                <input type="submit" value="Buscar"/>
            </form>
            {clima && clima.cod === 200 && (
                <article data-theme="light" className="card">
                    <header>
                        <h3>{clima.name}, {clima.sys.country}</h3>
                    </header>
                    <div className="contenido-clima">
                        <img src={climaIcono} alt="Clima Icono" />
                    </div>
                    <footer>
                        <h4>Temperatura Actual: {clima.main.temp} °C</h4>
                        <p>Clima: {clima.weather[0].description}</p>
                        <hr />
                        <p>Humedad: {clima.main.humidity}%</p>
                    </footer>
                </article>
            )}
        </div>
    )
}
