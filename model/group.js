const sequelize = require("../database/db.js");
const DataTypes = require("sequelize");
const student = require("./student.js");
const grade = require("./grade.js");
const group = sequelize.define(
  "group",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    groupCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coordinator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
group.hasMany(student, {
  // onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
group.belongsTo(grade, { onUpdate: "CASCADE" });
module.exports = group;
