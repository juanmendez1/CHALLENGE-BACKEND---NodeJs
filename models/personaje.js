const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Personaje = sequelize.define('Personajes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  peso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  historia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Personaje;
