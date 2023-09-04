const { DataTypes } = require('sequelize');
//const sequelize = require('../config/database');
const sequelize = require('../config.db');

const Characters = sequelize.define('Characters', {
  Image: {
    type: DataTypes.STRING,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Age: {
    type: DataTypes.INTEGER,
  },
  Weight: {
    type: DataTypes.DECIMAL(5, 2),
  },
  History: {
    type: DataTypes.TEXT,
  },
});

Characters.sync().then(
  () => {
    console.log('Characters table is available.');
  }
).catch(
  (error) => {
    console.error('Unable to access table : ', error.message);
  }
)

module.exports = Characters;