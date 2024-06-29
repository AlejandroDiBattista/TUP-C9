import React, { useState, useEffect } from 'react';

const API_KEY = 'e548fd24659d5b0e72c9ca1371bee9f5';

function App() {
    const [climaData, setClimaData] = useState(null);
    const [consulta, setConsulta] = useState('');
    const [ciudadNoEncontrada, setCiudadNoEncontrada] = useState(false);

    useEffect(() => {
        obtenerClima('Tucuman'); 
    }, []);

    const obtenerClima = async (ciudad) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es&units=metric`);
            const data = await response.json();
            if (response.ok) {
                setClimaData(data);
                setCiudadNoEncontrada(false);
                setConsulta(''); 
            } else {
                setCiudadNoEncontrada(true);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const manejarClickCiudad = (ciudad) => {
        obtenerClima(ciudad);
    };

    const manejarCambioConsulta = (event) => {
        setConsulta(event.target.value);
    };

    const manejarSubmitConsulta = (event) => {
        event.preventDefault();
        obtenerClima(consulta);
    };

    const manejarKeyPress = (event) => {
        if (event.key === 'Enter') {
            obtenerClima(consulta);
        }
    };

    return (
        <>
            <h1>App Clima</h1>
            <nav>
                <ul>
                    <li><strong>Clima</strong></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={() => { manejarClickCiudad('Tucuman'); setConsulta(''); }}>Tucumán</a></li>
                    <li><a href="#" onClick={() => { manejarClickCiudad('Salta'); setConsulta(''); }}>Salta</a></li>
                    <li><a href="#" onClick={() => { manejarClickCiudad('Buenos Aires'); setConsulta(''); }}>Buenos Aires</a></li>
                </ul>
            </nav>

            <form onSubmit={manejarSubmitConsulta}>
                <input
                    type="search" name="search" value={consulta} onChange={manejarCambioConsulta} onKeyPress={manejarKeyPress} placeholder="Buscar ciudad" aria-label="Buscar ciudad"
                />
            </form>

            {ciudadNoEncontrada && <p>Ciudad no encontrada</p>}

            {climaData && !ciudadNoEncontrada && (
                <article>
                    <header style={{ backgroundColor: 'White' }}>{climaData.name}</header>

                    <div className="marco">
                        <img src={`iconos/${climaData.weather[0].icon}.svg`} alt={climaData.weather[0].description} height="48" />
                    </div>

                    <footer style={{ backgroundColor: 'White' }}>
                        <p className="Temp">Temperatura: {climaData.main.temp}°C</p>
                        <p>Máxima: {climaData.main.temp_max}°C / Mínima: {climaData.main.temp_min}°C</p>
                        <p>Humedad: {climaData.main.humidity}%</p>
                    </footer>
                </article>
            )}
        </>
    );
}

export default App;
