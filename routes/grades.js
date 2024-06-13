const express = require("express");
const validator = require("validator");
const db = require("../models/index.js");
const router = express.Router();
router.get("/grade/:id", async function (req, res) {
  let gradeCode = req.params.id;
  gradeCode = typeof id == "string" ? gradeCode : gradeCode.toString();
  if (validator.isInt(gradeCode)) {
    const foundGrade = await db.grade.findByPk(gradeCode);
    if (foundGrade === null) {
      return res.send("El grado no existe");
    } else {
      return res.json(foundGrade);
    }
  } else {
    return res.send({ msg: "El valor ingresado no es valido" });
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
  const gradeCode =
    typeof req.body.gradeCode == "string"
      ? req.body.gradeCode
      : req.body.gradeCode.toString();
  if (validator.isInt(gradeCode) && num >= 0 && num <= 11) {
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
    return res.status(400).send("Se espera que digite un numero menor de 11");
  }
});
router.put("/grade/:id", async function (req, res) {
  const id =
    typeof req.params.id == "string" ? req.params.id : req.params.id.toString();
  const gradeCode =
    typeof req.body.gradeCode == "string"
      ? req.body.gradeCode
      : req.body.gradeCode.toString();
  if (validator.isInt(gradeCode) && validator.isInt(id)) {
    const foundGrade = await db.grade.findByPk(id);
    if (foundGrade === null) {
      return res
        .send("Debe existir el curso para poder actualizarlo")
        .status(404);
    } else {
      await foundGrade.destroy();
      console.log(gradeCode);
      const updateGrade = await db.grade.create({ gradeCode: gradeCode });
      return res.json(updateGrade);
    }
  } else {
    return res.send("Se espera los los datos sean numeros");
  }
});
router.delete("/grade/:id", async function (req, res) {
  try {
    const id =
      typeof req.params.id == "string"
        ? req.params.id
        : req.params.id.toString();
    console.log(typeof id);
    const foundGrade = await db.grade.findByPk(id);
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
