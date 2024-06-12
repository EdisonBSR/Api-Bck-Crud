const sequelize = require("../database/db.js");
const DataTypes = require("sequelize");
const student = sequelize.define(
  "student",
  {
    dni: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    firsName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);
module.exports = student;
