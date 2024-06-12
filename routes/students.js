const express = require("express");
const db = require("../models/index.js");
const validator = require("validator");
const router = express.Router();
// Ruta para obtener un estudiante por su dni
router.get("/student/:dni", async (req, res) => {
  const { dni } = req.params;
  try {
    const foundStudent = await db.student.findByPk(dni);
    if (!foundStudent) {
      return res.send("Estudiante no encontrado.");
    }
    res.json(foundStudent);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});
router.get("/student", async (req, res) => {
  //

  // console.log(validator.isInt("3507777973", [{ max: 10 }]));
  //
  const foundStudent = await db.student.findAll();
  console.log(foundStudent);
  if (!foundStudent || foundStudent.length === 0) {
    return res.send("No existen estudiantes");
  } else {
    return res.json(foundStudent);
  }
});
router.post("/student", async (req, res) => {
  const data = req.body;
  // isInt(req.body.phone, [{ max: 99 }]);
  if (validator.isEmail(req.body.email)) {
    console.log("si es correo");
    validator.isInt("3507777973", [{ max: 10 }]);
  }
  try {
    const newStudent = await db.student.create(data);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.send("No se pudo crear el estudiante");
  }
});
router.put("/student/:dni", async (req, res) => {
  const dni = req.params.dni;
  const data = req.body;
  try {
    const foundStudent = await db.student.findOne({ where: { dni } });
    console.log(foundStudent);
    if (foundStudent === null) {
      return res.send("Debe existir el estudiante para poder actualizarlo");
    } else {
      const updateStudent = await db.student.update(data, {
        where: { dni: dni },
      });
      return res.send(updateStudent);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el estudiante." });
  }
});

router.delete("/student/:dni", async (req, res) => {
  const { dni } = req.params;
  try {
    const deleted = await db.student.destroy({
      where: { dni: dni },
    });
    console.log(!deleted);
    if (deleted) {
      return res.sendStatus(204);
    } else {
      return res.send("No se encontro al estudiante");
    }
  } catch (error) {
    res.sendStatus(500);
  }
});
module.exports = router;
