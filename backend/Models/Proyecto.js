const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    fechaCreacion: { type: Date, default: Date.now },
    completado: { type: Boolean, default: false }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);