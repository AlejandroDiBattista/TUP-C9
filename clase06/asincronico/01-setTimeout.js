const log = (texto) => {
    console.log(texto, new Date().toLocaleTimeString());
}

const dentro = () => {
    log("2. Dentro del timeout");
}

// Programa principal
log("1. Antes del timeout");
setTimeout(dentro, 2000);
// setInterval(dentro, 1000);
log("3. Después del timeout");