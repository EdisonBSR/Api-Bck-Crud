const express = require("express");
const studentRouter = require("./routes/students.js");
const groupRouter = require("./routes/groups.js");
const gradeRouter = require("./routes/grades.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(studentRouter);
app.use(groupRouter);
app.use(gradeRouter);
module.exports = app;
