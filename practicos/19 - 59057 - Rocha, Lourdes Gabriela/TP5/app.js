import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let people = [
    {id: 1, firstName: 'Carlos', lastName: 'Hernandez', age: 30, deleted: false, updatedAt: 1},
    {id: 2, firstName: 'Ana', lastName: 'Martinez', age: 25, deleted: false, updatedAt: 2},
    {id: 3, firstName: 'Miguel', lastName: 'Sanchez', age: 35, deleted: false, updatedAt: 3},
    {id: 4, firstName: 'Elena', lastName: 'Diaz', age: 28, deleted: false, updatedAt: 4},
    {id: 5, firstName: 'Javier', lastName: 'Lopez', age: 40, deleted: false, updatedAt: 5}
];

let nextId = people.length + 1;

app.get('/people', (req, res) => {
    const activePeople = people.filter(p => !p.deleted);
    res.json(activePeople);
});

app.put('/people', (req, res) => {
    const newPerson = req.body;

    if (newPerson.id) {
        const index = people.findIndex(p => p.id === newPerson.id);

        if (index === -1) {
            return res.status(404).send();
        }

        people[index] = { ...people[index], ...newPerson };

        if (newPerson.deleted) {
            people[index].deleted = true;
        }

        return res.status(200).json(people[index]);

    } else {
        newPerson.id = nextId++;
        newPerson.deleted = false;
        newPerson.updatedAt = 1;

        people.push(newPerson);

        return res.status(201).json(newPerson);
    }
});

export default app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
