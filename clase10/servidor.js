import express from 'express';

const app = express();

app.get('/saludo', (req, res) => {
    res.json(
        {nombre: "Juan", apellido: "Perez"}
    );
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
    console.log("http://localhost:5000/")
})

