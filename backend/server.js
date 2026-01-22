const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <--- 1. Agregamos CORS para que React pueda conectarse
const Proyecto = require('./Models/Proyecto'); // <--- 2. Importamos tu modelo (ajusta si es "Models" o "models")
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite conexiones externas
app.use(express.json()); // Permite que el servidor entienda archivos JSON

// Conexión a MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('Conectado de forma SEGURA a MongoDB Atlas ✅'))
    .catch((error) => console.error('Error al conectar ❌:', error));

// === RUTAS (ENDPOINTS) PARA TU TAREA ===

// 1. Ruta para CREAR un proyecto (POST)
app.post('/api/proyectos', async (req, res) => {
    try {
        const nuevoProyecto = new Proyecto(req.body);
        await nuevoProyecto.save();
        res.status(201).json(nuevoProyecto);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear proyecto", error });
    }
});

// 2. Ruta para LEER todos los proyectos (GET)
app.get('/api/proyectos', async (req, res) => {
    try {
        const proyectos = await Proyecto.find();
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener proyectos", error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});