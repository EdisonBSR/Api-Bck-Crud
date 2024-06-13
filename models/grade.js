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
      grade.hasOne(models.group, { foreignKey: "idGrade" });
    }
  }
  grade.init(
    {
      gradeCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "grade",
    }
  );
  return grade;
};
