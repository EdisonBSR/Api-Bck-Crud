"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    static associate(models) {
      group.hasMany(models.student, {
        // onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: {
          name: "idGroup",
          allowNull: false,
        },
      });
      group.belongsTo(models.grade, {
        // onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: {
          name: "idGrade",
          allowNull: false,
        },
      });
    }
  }
  group.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      groupCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordinator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "group",
    }
  );
  return group;
};
