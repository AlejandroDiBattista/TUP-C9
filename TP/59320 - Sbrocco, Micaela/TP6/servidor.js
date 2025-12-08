import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


let usuarios = [];


function verificarUsuario(req, res, next) {
    let token = req.cookies.token;
    let usuario = usuarios.find(u => u.token === token);
    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send('Operación no autorizada')
    }
}



app.get('/usuarios', (req, res) => {

    res.json(usuarios);
});

app.post('/registrar', (req, res) => {
    let { user, password } = req.body


    if (usuarios.find(u => u.user === user)) {
        res.status(409).send('Este usuario ya existe');
        return;
    }
    usuarios.push({ user, password })
    res.send('Se ha registrado con éxito')
});

app.post('/login', (req, res) => {
    let { user, password } = req.body;
    let usuario = usuarios.find(u => u.user === user && u.password === password)
    if (usuario) {
        let token = Math.random().toString().substring(2)
        usuario.token = token;
        res.cookie('token', token, { httpOnly: true })
           .send('Bienvenido: ' + usuario.user)
    } else {
        res.status(401).send('Usuario o contraseña incorrectos');
    }
});

app.post('/logout', verificarUsuario, (req, res) => {
    req.usuario.token = ""
    
    res.clearCookie('token').send('Sesión cerrada')
});

app.get('/info', verificarUsuario, (req, res) => {
    res.send('Información secreta: ' + req.usuario.user + ' Contraseña: ' + req.usuario.password + ' Token: ' + req.usuario.token)
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000')
});
