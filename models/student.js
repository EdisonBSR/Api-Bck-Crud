"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      student.belongsTo(models.group);
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
    },
    {
      sequelize,
      modelName: "student",
    }
  );
  return student;
};
