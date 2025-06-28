const express = require('express');
const userController = require('../controllers/usuarioController');

const router = express.Router();

// Rutas de autenticación
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/user/:id', userController.getOne);
router.delete('/user/:id', userController.delete);
router.get('/users', userController.getAll);




module.exports = router;
