const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const allowedOrigins = [ 
  'capacitor://localhost',
  'http://localhost',
  'http://localhost:8100',
  'https://frontend-materials-dispenser.vercel.app',
  'https://frontend-md-ytjd.vercel.app',
  'https://frontend-oficial-alpha.vercel.app',
  'https://frontend-oficial-h83m88c1b-emmanuels-projects-ad5ae683.vercel.app',
  'https://frontend-oficial-emmanuels-projects-ad5ae683.vercel.app',
  'https://frontend-oficial-ly3pcikbh-emmanuels-projects-ad5ae683.vercel.app',
  'https://frontend-oficial-ad2xmwxg9-emmanuels-projects-ad5ae683.vercel.app',
  'https://frontend-oficial-8g706hsjc-emmanuels-projects-ad5ae683.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS Origin:', origin); // PARA DEPURACIÓN
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false, // manejar preflight correctamente
  optionsSuccessStatus: 204  // para asegurar compatibilidad con algunos navegadores
};

// Middleware CORS
app.use(cors(corsOptions));

// Middleware para que los preflight OPTIONS respondan correctamente
app.options('*', cors(corsOptions));

// Body parsers
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

// Archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
const authRoutes = require('./app/routes/authRoutes');
const usuarioRoutes = require('./app/routes/usuarioRoutes');
const itemsRoutes = require('./app/routes/items');
const historialRoutes = require('./app/routes/historialRoutes');
const inventarioRoutes = require('./app/routes/inventarioRoutes');
const uploadRoutes = require('./app/routes/uploadRoutes');
const rutasProtegidas = require('./app/routes/guardRoutes');

app.use('/api/uploads', uploadRoutes);
app.use('/api', rutasProtegidas);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/historial', historialRoutes);

module.exports = app;
