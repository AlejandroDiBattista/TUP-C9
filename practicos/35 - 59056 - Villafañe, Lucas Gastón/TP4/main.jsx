const { useState, useEffect } = React;

function getCiudadParametro(nombreCiudad) {
    const mapeoCiudades = {
        'Tucuman': 'San Miguel de Tucumán',
        'Salta': 'Salta',
        'Buenos Aires': 'Ciudad Autonoma de Buenos Aires'
    };
    return mapeoCiudades[nombreCiudad] || nombreCiudad;
}

async function fetchDatosClima(ciudadParametro, claveApi) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadParametro}&appid=${claveApi}&units=metric&lang=es`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos;
}

function Aplicacion() {
    const [ciudad, establecerCiudad] = useState('');
    const [datosClima, establecerDatosClima] = useState('');
    const [iconoClima, establecerIconoClima] = useState('');
    const claveApi = 'f3681c4ce3cb50738d6ceada123aec95';

    const manejarBusqueda = async (nombreCiudad) => {
        const ciudadParametro = getCiudadParametro(nombreCiudad);
        const datos = await fetchDatosClima(ciudadParametro, claveApi);

        if (datos.cod !== 200) {
            console.error('Error en la solicitud:', datos.message);
            return;
        }

        establecerDatosClima(datos);
        establecerIconoClima(`./icons/${datos.weather[0].icon}.svg`);
    };

    return (
        <div className="Clima">
            <nav>
                <ul>
                    <li><h1>Clima</h1></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={() => manejarBusqueda('Tucuman')}>Tucuman</a></li>
                    <li><a href="#" onClick={() => manejarBusqueda('Salta')}>Salta</a></li>
                    <li><a href="#" onClick={() => manejarBusqueda('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <form role="search" onSubmit={(e) => { e.preventDefault(); manejarBusqueda(ciudad); }}>
                <input
                    type="text"
                    name="buscar"
                    placeholder="Buscar"
                    aria-label="Search"
                    autoComplete="off"
                    required
                    value={ciudad}
                    onChange={(e) => establecerCiudad(e.target.value)}
                />
            </form>
            {datosClima && datosClima.cod === 200 && (
                <article className="tarjeta">
                    <header>
                        <h3>{datosClima.name}</h3>
                    </header>
                    <div className="contenido-clima">
                        <img src={iconoClima} alt="Imagen del clima" />
                    </div>
                    <footer>
                        <h4>Temperatura: {datosClima.main.temp} °C</h4>
                        <p>Minima: {datosClima.main.temp_min} °C / Maxima: {datosClima.main.temp_max} °C</p>
                        <p>Humedad: {datosClima.main.humidity}</p>
                    </footer>
                </article>
            )}
        </div>
    );
}