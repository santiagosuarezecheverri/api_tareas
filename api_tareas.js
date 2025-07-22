const express = require('express');
const app = express();

app.use(express.json());

let tareas = [
    { id: 1, titulo: "Aprender Express", completado: false },
    { id: 2, titulo: "Hacer ejercicio", completado: true }
];

app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.post('/tareas', (req, res) => {
    const nuevaTarea = req.body;
    nuevaTarea.id = tareas.length + 1;
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

app.put('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        Object.assign(tarea, req.body);
        res.json(tarea);
    } else {
        res.status(404).json({ error: "Tarea no encontrada" });
    }
});

app.delete('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tareas = tareas.filter(t => t.id !== id);
    res.json({ mensaje: "Tarea eliminada" });
});

app.listen(3000, () => {
    console.log('API REST escuchando en http://localhost:3000');
});
