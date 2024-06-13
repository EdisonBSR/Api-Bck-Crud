"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
