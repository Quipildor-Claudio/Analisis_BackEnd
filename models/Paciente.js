const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PacienteSchema = new Schema({
  dni: {
    type: String,
    unique: true,
    trim: true
  },// valor unico prestar atencion error si se carga 2 registros con el mismo dni
  nombre: { type: String, default: '' },
  apellido: { type: String, default: '' },
  edad: { type: String, default: '' },
  fecha_nac: { type: Date, default: Date.now },
  sexo: { type: String, default: '' },
  hclinica: { type: String, default: '' },
    isActive: {
        type: Boolean,
        default: true, // Set default value to true or false as per your requirement
    },
  diagnosticos: [{
    tipo: {
      type: String,
      default: ''
    },
    descripcion: { type: String, default: '' },
    fecha: { type: Date, default: Date.now }
  }],
  fechaIngreso: { type: Date, default: null },
  fechaSalida: { type: Date, default: null },

}, 
{ timestamps: true }
);


module.exports = mongoose.model('Paciente', PacienteSchema);