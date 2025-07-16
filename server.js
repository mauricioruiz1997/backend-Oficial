// Carga variables de entorno desde .env
require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;

if (!DB_URL || !PORT) {
  console.error('❌ Error: DB_URL o PORT no están definidos en el entorno.');
  process.exit(1);
}

mongoose.connect(DB_URL)
  .then(() => {
    console.log('✅ Conectado a MongoDB');

    app.listen(PORT, '0.0.0.0', () => {
      const host = process.env.NODE_ENV === 'production' ? 'Railway' : 'localhost';
      console.log(`🚀 Servidor corriendo en ${host} en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1); 
  });
