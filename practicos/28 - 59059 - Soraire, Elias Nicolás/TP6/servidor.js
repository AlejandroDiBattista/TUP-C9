const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const puerto = 3001;

app.use(bodyParser.json());
app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true
}));

let usuarios = [];

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/registro', (req, res) => { 
    const { nombreUsuario, contrasena } = req.body;
    if (usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario)) {
        return res.status(400).json({mensaje: 'El usuario ya existe'});
    }
    usuarios.push({nombreUsuario, contrasena});
    return res.status(200).json({mensaje: 'Usuario registrado exitosamente'});
});

app.post('/api/inicio-sesion', (req, res) => {  
    const { nombreUsuario, contrasena } = req.body;
    const usuario = usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario && usuario.contrasena === contrasena);
    if (!usuario) {
        return res.status(401).json({mensaje: 'Credenciales incorrectas'});
    }
    req.session.usuario = usuario;
    res.json({mensaje: 'Inicio de sesión exitoso', usuario});
});

app.post('/api/cierre-sesion', (req, res) => {  
    req.session.destroy();
    res.json({mensaje: 'Cierre de sesión exitoso'});
});

app.get('/api/info', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({mensaje: 'No autorizado'});
    }
    res.json({ usuario: req.session.usuario });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});