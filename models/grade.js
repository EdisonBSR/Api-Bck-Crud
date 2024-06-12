"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      grade.hasOne(models.group);
    }
  }
  grade.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      gradeCode: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "grade",
    }
  );
  return grade;
};
