import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(morgan('dev')); // Log requests to the console
app.use(cookieParser()); // Read cookies
app.use(bodyParser.urlencoded({ extended: false })); // Parse form data
app.use(bodyParser.json()); // Parse JSON data
app.use(express.static('public')); // Serve static files

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// In-memory user storage (for simplicity, replace with a database in production)
const users = {};

// Routes
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users[username] = { password };
    res.json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.user = username;
    res.json({ message: 'Logged in successfully' });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

app.get('/info', (req, res) => {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Not logged in' });
        }
        res.json({ message: `Hello, ${req.session.user}` });
    });

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
