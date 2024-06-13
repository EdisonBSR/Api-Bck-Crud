"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    static associate(models) {
      group.hasMany(models.student, { foreignKey: "idGroup" });
      group.belongsTo(models.grade, { foreignKey: "idGrade" });
    }
  }
  group.init(
    {
      groupCode: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
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
