const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');


exports.getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await Usuario.paginate({}, { page, limit, select: '-password' });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, tel, rol, matricula, grupo } = req.body;
        const files = req.files;

        const userExists = await Usuario.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        const imagenes = files.map(file => ({
            url: `http://localhost:3001/uploads/${file.filename}`
        }));

            const newUser = new Usuario({
            name,
            email,
            password,
            tel,
            rol,
            matricula,
            grupo,
            imagenes
            });     

        await newUser.save();


        res.status(201).json({ message: 'Usuario registrado correctamente', usuario: newUser });


    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
};



exports.updateUser = async (req, res) => {
  try {
    const { name, email, tel, matricula, grupo } = req.body;

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (email) fieldsToUpdate.email = email;
    if (tel) fieldsToUpdate.tel = tel;
    if (matricula) fieldsToUpdate.matricula = matricula;
    if (grupo) fieldsToUpdate.grupo = grupo;

    const user = await Usuario.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado correctamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await Usuario.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
};


