const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SalaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }, // Nombre de la sala, por ejemplo: "Sala de Cirugía", "Sala de Emergencias", etc.
    ubicacion: {
        type: String,
        required: true,
        trim: true
    }, // Ubicación de la sala dentro del hospital, por ejemplo: "Piso 1", "Piso 2", etc.
    capacidad: {
        type: Number,
        required: true,
        min: 1 // La capacidad debe ser al menos 1
    }, // Capacidad máxima de la sala, es decir, cuántas camas puede tener
    tipo: {
        type: String,
        enum: ['cirugía', 'emergencia', 'cuidados intensivos', 'general'],
        default: 'general'
    }, // Tipo de sala, por ejemplo: "Cirugía", "Emergencia", "Cuidados Intensivos", etc.
    },
    {
        timestamps: true // Agrega campos de fecha de creación y actualización
    }
);

module.exports = mongoose.model('Sala', SalaSchema);
