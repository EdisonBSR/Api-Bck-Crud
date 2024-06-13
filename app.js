const express = require("express");
const studentRouter = require("./routes/students.js");
const groupRouter = require("./routes/groups.js");
const gradeRouter = require("./routes/grades.js");
const db = require("./models/index.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(studentRouter);
app.use(groupRouter);
app.use(gradeRouter);
app.listen(3000, function () {
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Conexion sequelize completada");
  });
});
module.exports = app;
