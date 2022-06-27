const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Genero = sequelize.define('Generos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Genero;
