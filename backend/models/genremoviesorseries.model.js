const { DataTypes } = require('sequelize');

const sequelize = require('../config.db');

// Import table relationships
const Genre = require('./genre.model');
const MoviesOrSeries = require('./moviesorseries.model');

const GenreMovieOrSeries = sequelize.define('GenreMovieOrSeries', {
  genreID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  movieOrSeriesID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
});

GenreMovieOrSeries.belongsTo(Genre, { foreignKey: 'id' });
GenreMovieOrSeries.belongsTo(MoviesOrSeries, { foreignKey: 'id' });

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