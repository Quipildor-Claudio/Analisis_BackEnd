require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');

const medicoRoutes = require('./routes/medicoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const camaRoutes = require('./routes/camaRoutes');
const salaRoutes = require('./routes/salaRoutes');
const authRoutes = require('./routes/authRoutes');

//const authMiddleware = require('./middleware/middleware');


// Conexión a la base de datos
connectDB();

// Configurar el rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 solicitudes por IP
    message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente después de 15 minutos.',
});
const app = express();


// Aplicar el rate limiter a todas las solicitudes
app.use(limiter);


// Set up CORS
app.use(cors({
    origin: true, // "true" will copy the domain of the request back
    // to the reply. If you need more control than this
    // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
    // authenticated via either a session cookie
    // or Authorization header. Otherwise the
    // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
    // pre-flight OPTIONS requests
}));
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', pacienteRoutes);
app.use('/api', medicoRoutes);
app.use('/api', camaRoutes);
app.use('/api', salaRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));