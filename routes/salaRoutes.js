const express = require('express');
const salaController = require('../controllers/salaController');

const router = express.Router();

// Get all salas
router.get('/salas/', salaController.getSalas);

// Get a single sala by ID
router.get('/sala/:id', salaController.getSalaById);

// Create a new sala
router.post('/sala/', salaController.createSala);

// Update a sala by ID
router.put('/sala/:id', salaController.updateSala);

// Delete a sala by ID
router.delete('/sala/:id', salaController.deleteSala);

module.exports = router;