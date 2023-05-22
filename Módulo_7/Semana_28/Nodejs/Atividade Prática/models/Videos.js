const Sequelize = require('sequelize');
const database = require('../db/db');

const Video = database.define('video', {
 id_filme: {
 type: Sequelize.INTEGER,
 autoIncrement: true,
 allowNull: false,
 primaryKey: true
 },
 titulo:{
 type: Sequelize.STRING,
 allowNull: false,
 },
 categoria: {
 type: Sequelize.STRING,
 allowNull: false
 },
 genero: {
 type: Sequelize.STRING,
 allowNull: false
 },
 sinopse:{
 type: Sequelize.STRING
 },
 link:{
 type: Sequelize.STRING,
 allowNull:false
 }
}, {database,modelname:'video',tableName: 'videos'})

module.exports = Video;