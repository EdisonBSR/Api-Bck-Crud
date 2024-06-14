const express = require("express");
const validator = require("validator");
const db = require("../models/index.js");
const { where } = require("sequelize");
const router = express.Router();
router.get("/grade/:id", async function (req, res) {
  const id =
    typeof req.params.id == "string"
      ? req.params.id.trim()
      : req.params.id.toString().trim();

  if (validator.isInt(id)) {
    const foundGrade = await db.grade.findByPk(id);
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
  const id =
    typeof req.body.id == "string"
      ? req.body.id.trim()
      : req.body.id.toString().trim();
  const gradeCode =
    typeof req.body.gradeCode == "string"
      ? req.body.gradeCode.trim()
      : req.body.gradeCode.toString().trim();
  console.log(validator.isAlpha(gradeCode));
  if (validator.isInt(id) && parseInt(id) >= 0 && parseInt(id) <= 11) {
    if (validator.isAlpha(gradeCode)) {
      const [newGrade, succes] = await db.grade.findOrCreate({
        where: { id },
        defaults: {
          id,
          gradeCode,
        },
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
      return res.send("Se espera que ingrese un nombre de grado");
    }
  } else {
    return res
      .status(400)
      .send(
        "Se espera que digite un numero de 0 hasta 11, correspondiente al grado"
      );
  }
});
router.put("/grade/:id", async function (req, res) {
  const id =
    typeof req.params.id == "string"
      ? req.params.id.trim()
      : req.params.id.toString().trim();
  const gradeCode =
    typeof req.body.gradeCode == "string"
      ? req.body.gradeCode.trim()
      : req.body.gradeCode.toString().trim();
  if (validator.isAlpha(gradeCode) && validator.isInt(id)) {
    const foundGrade = await db.grade.findByPk(id);
    if (foundGrade === null) {
      return res
        .send("Debe existir el curso para poder actualizarlo")
        .status(404);
    } else {
      foundGrade.set({
        gradeCode,
      });
      foundGrade.save();
      // console.log(foundGrade);
      res.json(foundGrade);
    }
  } else {
    return res.send(
      "Se espera que ingrese solo letras o un dato numero para el grado "
    );
  }
});
router.delete("/grade/:id", async function (req, res) {
  try {
    const id =
      typeof req.params.id == "string"
        ? req.params.id.trim()
        : req.params.id.toString().trim();
    const deletedGrade = await db.grade.destroy({ where: { id } });
    console.log(deletedGrade);
    if (deletedGrade == 0) {
      return res
        .status(404)
        .send("No se encontro un grado que existente para eliminar");
    } else {
      return res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;
