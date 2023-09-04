const { DataTypes } = require('sequelize');

const sequelize = require('../config.db');

const Genre = sequelize.define('Genre', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
});

Genre.sync().then(
  () => {
    console.log('Genre table is available.');
  }
).catch(
  (error) => {
    console.error('Unable to access table : ', error.message);
  }
)

module.exports = Genre;