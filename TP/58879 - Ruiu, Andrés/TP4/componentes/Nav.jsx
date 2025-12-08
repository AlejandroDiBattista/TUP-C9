window.Nav = ({ handleClickCiudad }) => (
    <nav>
        <ul>
            <li><h1>Clima</h1></li>
        </ul>
        <ul>
            <li><a href="#" onClick={() => handleClickCiudad('Tucuman')}>Tucumán</a></li>
            <li><a href="#" onClick={() => handleClickCiudad('Salta')}>Salta</a></li>
            <li><a href="#" onClick={() => handleClickCiudad('Buenos Aires')}>Buenos Aires</a></li>
        </ul>
    </nav>
);
