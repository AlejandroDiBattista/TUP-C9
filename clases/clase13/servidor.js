import express from 'express'
import morgan from 'morgan'
import CookieParser from 'cookie-parser'

const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(CookieParser())

let usuarios = []

function verificarUsuario(req, res, next) {
    // let token = req.get('Authorization')
    let token = req.cookies.token

    let usuario = usuarios.find(u => u.token === token)
    if (usuario) {
        req.usuario = usuario
        next()
    } else {
        res.status(401)
        res.send('Operacion no autorizada')
    }
}


app.get('/usuarios', (req, res) => {
    // NO SE HACE NUNCA (solo para la clase)
    res.json(usuarios)
})

app.post('/registrar', (req, res) => {
    let { user, password } = req.body   // Extraido datos
    let usuario = usuarios.find(u => u.user === user)
    if(usuario) {
        res.status(409) // Conflict
        res.send('Usuario ya existe')
        return
    }
    usuarios.push({ user, password })   // Guardar datos
    res.send('Registro exitoso')        // Respuesta
}) 

app.post('/login', (req, res) => {
    let { user, password } = req.body   // Extraido datos
    let usuario = usuarios.find(u => u.user === user
                                && u.password === password)
    if (usuario) {
        let token = Math.random().toString().substring(2)
        console.log("TOKEN: " + token)
        usuario.token = token
        // res.set('Authorization', token)
        
        res.cookie('token', token)
        res.send('Bienvenido: ' + usuario.user)
    } else {
        res.status(401) // Unauthorized
        res.send('Usuario o contraseña incorrectos')
    }
})

app.post('/logout', verificarUsuario, (req, res) => {
    let usuario = req.usuario
    usuario.token = ""
    res.send('Sesión cerrada')
})
    
app.get('/info', verificarUsuario, (req, res) => {
    let usuario = req.usuario
    res.send('😯 Información secreta: ' + usuario.user)
})


app.get('/saludar', (req, res) => {
    res.set("token", "123456")
    res.cookie('saludo', 'Hola')
    res.send('Hola')
})

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000')
})

