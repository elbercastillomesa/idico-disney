const { DataTypes } = require('sequelize');

const sequelize = require('../config.db');

const MoviesOrSeries = sequelize.define('MoviesOrSeries', {
  image: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creationDate: {
    type: DataTypes.DATE,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
});

MoviesOrSeries.sync().then(
  () => {
    console.log('MoviesOrSeries table is available.');
  }
).catch(
  (error) => {
    console.error('Unable to access table : ', error.message);
  }
)

module.exports = MoviesOrSeries;