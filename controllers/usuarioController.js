const User = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { update } = require('./medicoController');

var userController = {

    // Registrar un usuario
    registerUser: async (req, res) => {
        const { nombreUsuario, contraseña, email, nombre, isActive, rol } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(contraseña, salt);

            const newUser = new User({ nombreUsuario, contraseña: hashedPassword, email, nombre, isActive, rol });

            console.log(newUser);
            await newUser.save();

            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    },
    loginUser: async (req, res) => {
        const { nombreUsuario, contraseña } = req.body;
        try {
            const user = await User.findOne({ nombreUsuario });
            //console.log(user);

            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

            const isMatch = await bcrypt.compare(contraseña, user.contraseña);
            if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });
            const token = jwt.sign({ id: user._id, nombre: user.nombre, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '10h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    },
    getAll: async (req, res) => {
        try {
            const items = await User
                .find()
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const item = await User.findById(req.params.id)
            if (item == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const deletedItem = await User.findByIdAndDelete(req.params.id);
            if (deletedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json({ message: 'Item eliminado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const { nombreUsuario, contraseña, email, nombre, isActive, rol } = req.body;
            let hashedPassword;

            // Si se proporciona una nueva contraseña, hashearla
            if (contraseña && contraseña.trim() !== '') {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(contraseña, salt);
            }

            // Crear el objeto de actualización
            const updatedData = {
                nombreUsuario,
                email,
                nombre,
                isActive,
                rol
            };

            // Solo agregar la contraseña si se proporcionó una nueva
            if (hashedPassword) {
                updatedData.contraseña = hashedPassword; // Asegúrate que este campo coincida con tu modelo
            }

            // Actualizar el usuario con validación de campos
            const updateOptions = {
                new: true,
                runValidators: true // Para que valide los campos según el esquema
            };

            const updatedItem = await User.findByIdAndUpdate(
                req.params.id,
                updatedData,
                updateOptions
            );

            if (!updatedItem) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.json({
                message: 'Usuario actualizado correctamente',
                user: updatedItem
            });
        } catch (err) {
            console.error('Error al actualizar usuario:', err);
            res.status(500).json({
                message: 'Error al actualizar el usuario',
                error: err.message
            });
        }
    }
};

module.exports = userController;