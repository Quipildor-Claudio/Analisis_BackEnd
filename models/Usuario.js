const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, unique: true, required: true },
    contraseña: { type: String, required: true },
    nombre: { type: String, required: true },
    email: {
        type: String,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: false, // Set default value to true or false as per your requirement
    },
    rol: {
        type: String,
        enum: ["Administrador", "Medico", "Residente"], // Define roles as per your application needs
        default: "Medico", // Default role can be set to 'user' or any other role you prefer
    },


},
{ timestamps: true }
);
const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;
