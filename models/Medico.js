const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MedicoSchema = new Schema({
  apellido: String,
  nombre: String,
  cuil: {
    type: String,
    unique: true,
    trim: true
  }, // valor unico prestar atencion error si se carga 2 registros con el mismo cuil
  titulo: String, // titulo del medico, por ejemplo: "Médico Cirujano", "Médico Pediatra", etc.
  matricula: String,
  servicio: String, // servicio al que pertenece el medico, por ejemplo: "Cirugia General", "Neurología", etc.
  funcion: String  // funcion del medico en el hospital, por ejemplo: "Cirujano", "Pediatra", etc.
},
);

module.exports = mongoose.model('Medico', MedicoSchema);
