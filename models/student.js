"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    static associate(models) {
      student.belongsTo(models.group, { foreignKey: "idGroup" });
    }
  }
  student.init(
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
      sequelize,
      modelName: "student",
    }
  );
  return student;
};
