const { DataTypes } = require('sequelize');

const sequelize = require('../config.db');

const CharacterMovieOrSeries = sequelize.define('CharacterMovieOrSeries', {});

CharacterMovieOrSeries.sync().then(
  () => {
    console.log('CharacterMovieOrSeries table is available.');
  }
).catch(
  (error) => {
    console.error('Unable to access table : ', error.message);
  }
)

module.exports = CharacterMovieOrSeries;