const { DataTypes } = require('sequelize');

const sequelize = require('../config.db');

const GenreMovieOrSeries = sequelize.define('GenreMovieOrSeries', {});

GenreMovieOrSeries.sync().then(
    () => {
      console.log('GenreMovieOrSeries table is available.');
    }
  ).catch(
    (error) => {
      console.error('Unable to access table : ', error.message);
    }
  )
  
  module.exports = GenreMovieOrSeries;