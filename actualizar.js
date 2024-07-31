function subirCondicionC9() {
    let datos = [2, 1, 2, 1, 4, 4, 2, 2, 1, 4, 2, 2, 2, 4, 2, 1, 1, 1, 2, 4, 2, 2, 1, 1, 2, 4, 2, 2, 4, 1, 4, 1, 2, 2, 4, 4, 1, 1]
    let estados = document.querySelectorAll('select[name="nota"]');
    if (datos.length != estados.length) {
        alert('Error en la cantidad de alumnos >> Alumnos: ' + datos.length + 'Condiciones: ' + estados.length);
    } else {
        estados.forEach((estado, index) => estado.selectedIndex = datos[index]);
    }
}

function subirNotaC9() {
    let datos = [8, 1, 5, 1, 10, 8, 7, 8, 1, 10, 8, 8, 8, 10, 8, 1, 1, 1, 8, 10, 8, 8, 1, 1, 8, 10, 8, 8, 10, 1, 10, 1, 7, 8, 9, 10, 1, 1]
    let notas = document.querySelectorAll('input[name="nota"]');
    if (datos.length != notas.length) {
        alert('Error en la cantidad de alumnos >> Alumnos: ' + datos.length + 'Notas: ' + notas.length);
    } else {
        notas.forEach((nota, index) => nota.value = datos[index]);
    }
}