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
    
    }, // Ubicación de la sala dentro del hospital, por ejemplo: "Piso 1", "Piso 2", etc.
   
    tipo: {
        type: String,
        enum: ['cirugía', 'emergencia', 'cuidados intensivos', 'general'],
        default: 'general'
    }, // Tipo de sala, por ejemplo: "Cirugía", "Emergencia", "Cuidados Intensivos", etc.
    camas: [{
        type: Schema.Types.ObjectId,
        ref: 'Cama' // Referencia al modelo Cama
    }] // Array de referencias a camas asociadas a esta sala

    },
    {
        timestamps: true // Agrega campos de fecha de creación y actualización
    }
);

module.exports = mongoose.model('Sala', SalaSchema);
