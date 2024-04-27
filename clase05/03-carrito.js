// Ejemplo de carrito de compras

// Definir un array de productos con la siguiente estructura
let productos = [
    {id: 1, nombre: 'Coca Cola', precio: 90, cantidad: 3},
    {id: 2, nombre: 'Pepsi',     precio: 80, cantidad: 2},
    {id: 3, nombre: 'Sprite',    precio: 90, cantidad: 1},
    {id: 4, nombre: 'Fanta',     precio: 60, cantidad: 4},
    {id: 5, nombre: 'Manaos',    precio: 70, cantidad: 5},
]

// Definir un array de objetos que representen un carrito de compras (con 2 productos para el ejemplo)
let carrito = [
    {id: 1, cantidad: 2},   // 2 coca cola
    {id: 2, cantidad: 1},   // 1 pepsi
]

// Definir una funcion que reciba un carrito y un producto y agregue el producto al carrito
function agregar(carrito, producto){
    let encontrado = carrito.find(item => item.id == producto.id) // Busca el producto en el carrito
    if(encontrado){     // Si lo encuentra, incrementa la cantidad
        encontrado.cantidad++
    } else {            // Si no lo encuentra, lo agrega al carrito
        carrito.push( {id: producto.id, cantidad: 1})
    }
    producto.cantidad-- // Decrementa la cantidad del producto
}

// Definir una funcion que reciba un id y retorne el producto con dicho id
function traer(id){
    return productos.find(p => p.id == id)
}

// Calcula el total
function total(carrito){
    let suma = 0
    for(let item of carrito){
        let producto = traer(item.id)
        suma += producto.precio * item.cantidad
    }
    return suma
}

// Simulación de compra

console.log("Productos:",productos)
console.log("Carrito:", carrito)
console.log("Total", total(carrito))

// Agregar un producto al carrito 3 veces y mostrar el carrito y el total
agregar(carrito, productos[2])
agregar(carrito, productos[2])
agregar(carrito, productos[2])

console.log("Carrito", carrito)
console.log("Total", total(carrito))

// Compara los productos por nombre (sin distinguir mayusculas de minusculas)
let compararNombre = (a, b) => a.nombre.localeCompare(b.nombre, 'es', {sensitivity: 'base'})

console.log("Listado de producto ordenado por nombre")
productos.sort(compararNombre)

console.log("Productos ordenados por nombre:", productos)

carrito.sort( (a, b) => compararNombre(traer(a.id), traer(b.id)))
console.log("Carrito ordenado por nombre")
console.log(carrito)
