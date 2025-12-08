window.CiudadCard = ({ datosCiudad }) => {
    if (!datosCiudad || datosCiudad.length === 0) {
        return <h2 style={{ textAlign: "center" }}>No se encontró la ciudad buscada</h2>;
    }

    return (
        <article className="ciudad-card">
            <header><h2 className="ciudad-nombre">{datosCiudad.name}</h2></header>
            <img
                src={`./openweathermap/${datosCiudad.weather[0].icon}.svg`}
                alt="Icono del clima"
                style={{
                    backgroundColor: datosCiudad.weather[0].icon.includes('d') ? 'lightblue' : '#21233d',
                }}
            />
            <footer className="clima-info">
                <h3>Temperatura: {datosCiudad.main.temp}°C</h3>
                <p>Máxima: {datosCiudad.main.temp_max}°C / Mínima: {datosCiudad.main.temp_min}°C</p>
                <p>Humedad: {datosCiudad.main.humidity}%</p>
            </footer>
        </article>
    );
};
