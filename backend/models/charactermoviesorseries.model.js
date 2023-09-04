const { DataTypes } = require('sequelize');

const sequelize = require('../config.db');

// Import table relationships
const Characters = require('./characters.model');
const MoviesOrSeries = require('./moviesorseries.model');

const CharacterMovieOrSeries = sequelize.define('CharacterMovieOrSeries', {
  characterID: {
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

CharacterMovieOrSeries.belongsTo(Characters, { foreignKey: 'id' });
CharacterMovieOrSeries.belongsTo(MoviesOrSeries, { foreignKey: 'id' });

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