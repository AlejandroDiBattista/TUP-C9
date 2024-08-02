function cambiarCondicionC9() {
    let datos = [2, 1, 2, 1, 4, 2, 2, 2, 1, 4, 2, 2, 2, 4, 2, 1, 1, 1, 2, 4, 2, 2, 1, 1, 2, 4, 2, 2, 4, 1, 4, 1, 2, 2, 4, 4, 1, 1]
    let estados = document.querySelectorAll('select[name="nota"]');
    estados.forEach((estado, index) => estado.selectedIndex = datos[index]);
}

function cambiarNotaC9() {
    let datos = [0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 10, 0, 10, 0, 0, 0, 9, 10, 0, 0]
    let notas = document.querySelectorAll('input[name="nota"]');
    notas.forEach((nota, index) => nota.value = datos[index]);
}
