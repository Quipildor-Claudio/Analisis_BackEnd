const express = require('express');
const pacienteController = require('../controllers/pacienteController');

const router = express.Router();

// Ruta para obtener todos los pacientes
router.get('/pacientes/', pacienteController.getAll);

// Ruta para obtener un paciente por ID
router.get('/paciente/:id', pacienteController.getOne);

// Ruta para obtener un paciente por DNI
router.get('/paciente/dni/:dni', pacienteController.getByDni);

// Ruta para crear un nuevo paciente
router.post('/paciente/', pacienteController.save);

// Ruta para actualizar un paciente por ID
router.put('/paciente/:id', pacienteController.update);

// Ruta para eliminar un paciente por ID
router.delete('/paciente/:id', pacienteController.delete);

router.get('/searchpaciente', pacienteController.searchPaciente);


// Ruta para obtener pacientes por nombre
module.exports = router;