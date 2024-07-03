import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});

let usuarios = [];

app.post('/register', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({error: 'Faltan datos'});
    }
    const uExiste = usuarios.find(user => user.username === username)

    if (uExiste) {
        return res.status(409).json({error: 'Usuario ya existe'});
    }

    usuarios.push({username, password});

    res.status(201).json({message: 'Usuario creado'});
})

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({error: 'Usuario o contraseña no ingresado'});
    }
    const uExiste = usuarios.find(user => user.username === username)

    if (!uExiste || uExiste.password == !password){
        return res.status(400).json({message:'Usuario o contraseña incorrecto'})
    }

    const token = generateRandomToken()
    uExiste.token = token;

    res.cookie('token', token)
    return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
})

app.get('/logout', uAtenticado, (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ message: 'Sesión cerrada con exito'})
})

app.get('/info', uAtenticado, (req, res) => {
    res.status(200).json({ message:'Información confidencial'})
})

function generateRandomToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function uAtenticado(req, res, next){
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ message: 'Usuario no autorizado'})
    }
    next()
}