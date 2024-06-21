import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));


app.listen(3000, () => {
  console.log(`El servidor está corriendo en el puerto http://localhost:3000`);
});

const JWT_SECRET='clave_megasecreta'
let users = [];


app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña' });
  }

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'El nombre de usuario ya existe' });
  }

  users.push({ username, password });
  res.status(201).json({ message: 'Usuario creado exitosamente' });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña' });
  }

  const user = users.find(user => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: true });
  res.status(200).json({ message: 'Inicio de sesión exitoso', token });
});


app.get('/logout',authenticateUser, (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
});

app.get('/info', authenticateUser, (req, res) => {
  const { username } = req.user;
  res.status(200).json({ message: `Bienvenido a la página de información, ${username}` });
});


function authenticateUser(req, res, next) {
  let token = req.cookies.token;

  if (!token && req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

