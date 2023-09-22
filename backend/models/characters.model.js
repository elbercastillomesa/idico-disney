const { DataTypes } = require('sequelize');
//const sequelize = require('../config/database');
const sequelize = require('../config.db');

const Characters = sequelize.define('Characters', {
  image: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2),
  },
  history: {
    type: DataTypes.TEXT,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
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