const { Schema, model } = require('mongoose');

const camaSchema = new Schema({
    numero: { type: String, required: true },
    piso: { type: Number, required: true },
    estado: {
        type: String,
        enum: ['disponible', 'ocupada', 'en espera'],
        default: 'disponible'
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        default: null
    },
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        default: null
    },
    observacion: { type: String, default: null }
},
{ timestamps: true }
);

module.exports = model('Cama', camaSchema);