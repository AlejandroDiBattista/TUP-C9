window.utilidades = {
    obtenerClima: async (ciudad, setCargando, setDatosClima, setUltimaCiudadBuscada, setCiudadNoEncontrada = null) => {
        try {
            const respuesta = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es&units=metric`);
            if (respuesta.ok) {
                let datosCiudad = await respuesta.json();
                datosCiudad = Array.isArray(datosCiudad) ? datosCiudad : [datosCiudad];
                setDatosClima(datosCiudad);
                setUltimaCiudadBuscada(datosCiudad);
                if (setCiudadNoEncontrada) {
                    setCiudadNoEncontrada(false);
                }
            } else if (respuesta.status === 404) {
                setDatosClima([]);
                if (setCiudadNoEncontrada) {
                    setCiudadNoEncontrada(true);
                }
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
        const debouncedFunc = function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                debounceTimer = null;
                func.apply(context, args);
            }, delay);
        };
        debouncedFunc.cancel = () => {
            clearTimeout(debounceTimer);
        };
        return debouncedFunc;
    }
};

