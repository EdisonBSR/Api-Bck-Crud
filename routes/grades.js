const express = require("express");
const grade = require("../model/grade.js");
const router = express.Router();
router.get("/grade/:id", async function (req, res) {
  //Validar que si es un dato que pueda ser un numero valido
  const id = req.params.id;
  const foundGrade = await grade.findOne({ where: { name: id } });
  if (!foundGrade || foundGrade.length === 0) {
    res.send("El grado no existe");
  } else res.json(foundGrade);
});
router.get("/grade", async function (req, res) {
  const foundGrade = await grade.findAll();
  if (foundGrade === null) {
    res.send("No existen grados");
  } else res.json(foundGrade);
});
router.post("/grade", async function (req, res) {
  const num = parseInt(req.body.name);
  console.log(!isNaN(num));
  if (!isNaN(num) && num >= 0 && num <= 11) {
    const name = num.toString();
    console.log("Ingreso");
    const [newGrade, succes] = await grade.findOrCreate({
      where: { name },
    });
    if (succes) {
      res.sendStatus(204);
    } else res.send("El grado ya existe");
  } else {
    res.send("Se espera que digite un numero");
  }
});
router.put("/grade", async function (req, res) {
  let { id, name } = req.body;
  const idNumber = parseInt(id);
  const nameNumber = parseInt(name);

  if (!isNaN(id) && !isNaN(nameNumber)) {
    id = idNumber;
    const foundGrade = await grade.findOne({ where: { id } });
    if (foundGrade === null) {
      res.send("Debe existir el curso para poder actualizarlo");
    } else {
      const name = nameNumber.toString();
      await foundGrade.update({ name });
      res.json(foundGrade);
    }
  }

  //Validar que si se actualiza debe ser por un grado que aun no este
});
router.delete("/grade/:id", async function (req, res) {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    const foundGrade = await grade.findOne({ where: { id } });
    if (foundGrade === null) {
      res.send("No se encontro un grado que existente para eliminar");
    } else {
      await grade.destroy({
        where: {
          id,
        },
      });
      res.sendStatus(204);
    }
  } else {
    res.send("El id del grado no existe");
  }
});

module.exports = router;
