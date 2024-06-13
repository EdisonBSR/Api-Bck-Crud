const express = require("express");
const validator = require("validator");
const db = require("../models/index.js");
const router = express.Router();
router.get("/grade/:id", async function (req, res) {
  const id = req.params.id;
  if (validator.isInt(id) || validator.isInt(id.toString())) {
    console.log(typeof id == "string");
    typeof id == "string" ? "" : (id = id.toString);
    console.log(typeof id);
    const foundGrade = await db.grade.findOne({ where: { gradeCode: id } });
    if (foundGrade === null) {
      return res.send("El grado no existe");
    } else {
      return res.json(foundGrade);
    }
  } else {
    return res.send({ msg: "El id no es id valido" });
  }
});
router.get("/grade", async function (req, res) {
  const foundGrade = await db.grade.findAll();
  if (!foundGrade || foundGrade.length == 0) {
    res.send("No existen grados");
  } else res.json(foundGrade);
});
router.post("/grade", async function (req, res) {
  const num = parseInt(req.body.gradeCode);
  if (
    validator.isInt(num.toString()) ||
    (validator.isInt(num) && num >= 0 && num <= 11)
  ) {
    const gradeCode = typeof num == "string" ? num : num.toString();
    console.log(gradeCode);
    console.log("Ingreso");
    const [newGrade, succes] = await db.grade.findOrCreate({
      where: { gradeCode },
    });
    console.log(succes);
    if (succes) {
      console.log("Si ingreso a succes en if");
      return res.sendStatus(201);
    } else {
      console.log("ingreso al else");
      return res.send("El grado ya existe");
    }
  } else {
    return res.status(400).send("Se espera que digite un numero");
  }
});
router.put("/grade/:id", async function (req, res) {
  const gradeCode = req.body.gradeCode.toString();
  if (validator.isInt(req.params.id.toString()) && validator.isInt(gradeCode)) {
    const id = parseInt(req.params.id);
    const foundGrade = await db.grade.findOne({ where: { id } });
    if (foundGrade === null) {
      return res
        .send("Debe existir el curso para poder actualizarlo")
        .status(404);
    } else {
      await foundGrade.update({ gradeCode });
      res.json(foundGrade);
    }
  }
});
router.delete("/grade/:id", async function (req, res) {
  try {
    const id =
      typeof req.params.id == "string"
        ? req.params.id
        : req.params.id.toString();
    console.log(typeof id);
    const foundGrade = await db.grade.findOne({ where: { gradeCode: id } });
    console.log(foundGrade == null);
    if (foundGrade === null) {
      return res
        .send("No se encontro un grado que existente para eliminar")
        .status(404);
    } else {
      await foundGrade.destroy();
      return res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

module.exports = router;
