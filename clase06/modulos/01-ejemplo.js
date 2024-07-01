
function sumar(a, b) {
    temporal();
    return a + b;
}

function restar(a, b) {
    temporal();
    return a - b;
}

function temporal() {
    console.log('Temporal');
}

export { sumar, restar  };