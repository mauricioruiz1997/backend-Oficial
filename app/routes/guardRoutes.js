const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth');
const verificarRol = require('../middlewares/roles');

router.get('/tabs-Admin', verificarToken, verificarRol('admin'), (req, res) => {
  res.json({ mensaje: 'Bienvenido al panel de administración' });
});

router.get('/tabs', verificarToken, verificarRol('user'), (req, res) => {
  res.json({ mensaje: 'Bienvenido al panel de usuario' });
});

module.exports = router;
