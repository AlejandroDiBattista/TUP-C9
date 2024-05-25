
const log = (texto) => {
    console.log(texto, new Date().toLocaleTimeString());
}
const url = 'https://jsonplaceholder.typicode.com/todos/1'

async function main(){
    log("1. Antes del fetch");
    let respuesta = await fetch(url)
    let json = await respuesta.json()
    log("2. Dentro del fetch", json)
    log("3. Después del fetch");
}
// Programa principal
console.clear()
log("0. Antes de main")
main()
log("4. Después de main")
