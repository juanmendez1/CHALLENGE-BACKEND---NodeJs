const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usuario = await Usuario.create({ username, password });
    res
      .status(201)
      .json({ message: 'Usuario creado con exito', status: 201, username: usuario.username });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usuario = await Usuario.findOne({ where: { username, password } });
    if (!usuario) {
      const err = new Error('Credeciales invalidas!');
      err.status = 401;
      throw err;
    }
    const token = jwt.sign({ username, id: usuario.id }, 'ultrasecreto', {
      expiresIn: '1h',
    });
    res.status(200).json({ token, username });
  } catch (err) {
    next(err);
  }
};
