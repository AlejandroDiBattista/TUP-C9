const url = 'https://jsonplaceholder.typicode.com/todos/1'
const log = (texto) => {
    console.log(texto, new Date().toLocaleTimeString());
}

const convertirJson = response => 
    response.json()

const mostrarJson = json => {
    log("2. Dentro del fetch")
    log(json)
}

log("1. Antes del fetch");
fetch(url)
      .then(convertirJson)
      .then(mostrarJson)
       .catch(error => console.log('Error:', error))
log("3. Después del fetch");

let promesa = new Promise((resolve, reject) => {
    // Codigo
    // const resultado = true 
    // if (resultado) {
    //     resolve('La operación fue exitosa')
    // } else {
    //     reject('Hubo un error')
    // }
    try {
        // Codigo
        resolve('La operación fue exitosa')
    } catch (error) {
        reject('Hubo un error')
    }
})

promesa.then((mensaje) => {
    console.log('Mensaje:', mensaje)
}).catch((error) => {
    console.log('Error:', error)
})



