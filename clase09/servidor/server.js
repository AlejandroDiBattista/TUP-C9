import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hola Mundo! Mi primer servidor');
});
    
app.get('/saludar/:nombre', (req, res) => {
    console.log("Nombre", req.params.nombre);
    res.send('Hola! ¿Cómo estás ' + req.params.nombre + '?' );
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
    console.log("http://localhost:5000/")
})
