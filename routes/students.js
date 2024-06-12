const express = require("express");
const student = require("../model/student.js");
const router = express.Router();
// Ruta para obtener un estudiante por su dni
router.get("/student/:dni", async (req, res) => {
  const { dni } = req.params;
  try {
    const foundStudent = await student.findByPk(dni);
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
  const foundStudent = await student.findAll();
  console.log(foundStudent);
  if (!foundStudent || foundStudent.length === 0) {
    return res.send("No existen estudiantes");
  } else {
    return res.json(foundStudent);
  }
});
router.post("/student", async (req, res) => {
  const data = req.body;
  try {
    const newStudent = await student.create(data);
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
    const foundStudent = await student.findOne({ where: { dni } });
    console.log(foundStudent);
    if (foundStudent === null) {
      return res.send("Debe existir el estudiante para poder actualizarlo");
    } else {
      const updateStudent = await student.update(data, {
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
    const deleted = await student.destroy({
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
