window.Utilidades = {
    obtenerClima: async (ciudad, setCargando, setDatosClima, setCiudadNoEncontrada) => {
        setCargando(true);
        try {
            const respuesta = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es&units=metric`);
            if (respuesta.ok) {
                const datosCiudad = await respuesta.json();
                localStorage.setItem(ciudad, JSON.stringify(datosCiudad));
                setDatosClima([datosCiudad]);
                setCiudadNoEncontrada(false);
            } else if (respuesta.status === 404) {
                setCiudadNoEncontrada(true);
            } else {
                console.error(`Error HTTP: ${respuesta.status}`);
            }
        } catch (error) {
            console.error(`Error de red o inesperado: ${error}`);
        }
        setCargando(false);
    },

    debounce: (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                debounceTimer = null;
                func.apply(context, args);
            }, delay);
        };
    }
};
