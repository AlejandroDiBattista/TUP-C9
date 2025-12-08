const TarjetaPresentacion = ({datos}) => {
    return (
        <div>
            <h1>Datos Personales</h1>
            <div id="datos-personales">
                <div id="datos">
                    <span id="nombre-apellido"><b>{datos.nombre} {datos.apellido}</b></span> <br/>
                    <span><b>Email</b>: {datos.email}</span> <br/>
                    <span><b>Legajo</b>: {datos.legajo}</span>  <br/>
                    <span><b>Telefono</b>: {datos.telefono}</span>
                </div>
            </div>
        </div>
    );
};