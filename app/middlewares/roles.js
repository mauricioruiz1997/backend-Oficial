

function verificarRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) return res.status(403).json({ mensaje: 'Usuario no autenticado' });

    const { rol } = req.usuario;

    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado. Rol no autorizado.' });
    }

    next();
  };
}

module.exports = verificarRol;
