"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class grade extends Model {
    static associate(models) {
      grade.hasOne(models.group, {
        // onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: {
          name: "idGrade",
          allowNull: false,
        },
      });
    }
  }
  grade.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      gradeCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "grade",
    }
  );
  return grade;
};
