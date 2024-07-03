import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev')); // Loggea cada request en consola
app.use(cookieParser()); // Para leer cookies
app.use(express.json()); // Para leer JSONs
app.use(express.static('public')); // Para servir archivos estáticos

// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});

let usuarios = [];

// Middleware para verificar el usuario basado en el token de la cookie
function verificarUsuario(req, res, next) {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).send('No se proporcionó token de autenticación.');
    }
    const usuario = usuarios.find(u => u.token === token);
    if (!usuario) {
        return res.status(401).send('Token de autenticación inválido.');
    }
    req.usuario = usuario;
    next();
}

app.post('/registrar', (req, res) => {
    let { user, password } = req.body; // Extraído datos
    // Verificar si el usuario ya existe
    let usuarioExistente = usuarios.some(u => u.user === user);
    if (usuarioExistente) {
        res.send('El usuario ya es existente');
    } else {
        usuarios.push({ user, password, token: null }); // Guardar datos
        res.send('Registro exitoso'); // Respuesta
    }
});

app.post('/login', (req, res) => {
    let { user, password } = req.body; // Extraído datos
    let usuario = usuarios.find(u => u.user === user && u.password === password);
    if (usuario) {
        let token = Math.random().toString().substring(2);
        usuario.token = token;
        res.cookie('token', token, { httpOnly: true });
        res.send('Bienvenido: ' + usuario.user);
    } else {
        res.status(401).send('Usuario o contraseña incorrectos');
    }
});

app.post('/logout', verificarUsuario, (req, res) => {
    let usuario = req.usuario;
    usuario.token = null; // Eliminar el token del usuario
    res.clearCookie('token'); // Borrar la cookie con el token
    res.send('Sesión cerrada con éxito.');
});

app.get('/info', verificarUsuario, (req, res) => {
    let usuario = req.usuario;
    res.send(`Información: agaunte river`);
});
