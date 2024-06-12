const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.js");
const grade = sequelize.define(
  "grade",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = grade;
