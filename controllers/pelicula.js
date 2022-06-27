const { Op } = require('sequelize');
const Personaje = require('../models/personaje');

exports.getCharacters = async (_, res, next) => {
  try {
    const characters = await Personaje.findAll();
    res.status(200).json({ characters });
  } catch (err) {
    next(err);
  }
};

exports.postCharacter = async (req, res, next) => {
  try {
    const { nombre, edad, peso, historia } = req.body;
    const imagen = req.file.path.replace('data', '');
    if (!imagen) {
      const err = new Error('No se subio imagen');
      err.status = 422;
      throw err;
    }
    console.log(nombre, edad, peso, historia);
    const personaje = await Personaje.create({ imagen, nombre, edad, peso, historia });
    res.status(201).json({ message: 'Se creo el personaje!', personaje });
  } catch (err) {
    err.status = err.status ?? 500;
    next(err);
  }
};

exports.deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const personaje = await Personaje.findByPk(id);
    if (!personaje) {
      const err = new Error('Personaje no encontrado!');
      err.status = 401;
      throw err;
    }
    await personaje.destroy();
    res.status(200).json({ message: 'Personaje Eliminado!' });
  } catch (err) {
    next(err);
  }
};

exports.findCharacter = async (req, res, next) => {
  try {
    const { query } = req.params;
    const characters = await Personaje.findAll({ where: { nombre: { [Op.like]: `%${query}%` } } });
    if (characters.length === 0) {
      const err = new Error('No hubo resultados!');
      err.status = 404;
      throw err;
    }
    res.status(200).json({ characters });
  } catch (err) {
    next(err);
  }
};
