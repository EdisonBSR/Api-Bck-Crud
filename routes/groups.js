const express = require("express");
const { group, grade } = require("../model/index.js");

const router = express.Router();
router.get("/group/:id", async function (req, res) {
  const id = req.params.id;
  const foundGroup = await group.findOne({ where: { groupCode: id } });
  if (foundGroup === null) {
    res.send("El grupo no existe");
  } else res.json(foundGroup);
});
router.get("/group", async function (req, res) {
  const foundGroup = await group.findAll();
  //si el arra foundGroup no tiene nada no responde segun lo esperado
  if (!foundGroup || foundGroup.length === 0) {
    res.send("No existen grupos");
  } else res.json(foundGroup);
});
router.post("/group", async function (req, res) {
  let { groupCode, nameCoordinator, gradeId } = req.body;
  //Se queda en un error al no tener fk valida, validar que el grado exista
  try {
    if (!isNaN(groupCode) && !isNaN(gradeId) && nameCoordinator != "") {
      const id = gradeId.toString();
      const foundGrade = await grade.findOne({ where: { name: id } });
      //ESTA TOMANDO EL 1 COMO VALIDO PERO NO ESTA
      //CONSOLE LOG
      console.log(foundGrade);
      if (foundGrade === null) {
        return res.send("El grado ingresado no existe");
      } else {
        groupCode = groupCode.toString();
        console.log("Ingreso");
        const [newGroup, succes] = await group.findOrCreate({
          where: { groupCode, nameCoordinator, gradeId },
        });
        console.log("estado de findOrCreate");
        console.log(succes);
        if (succes) {
          console.log(succes);
          return res.sendStatus(200);
        } else {
          return res.send("El grupo ya existe");
        }
      }
    } else {
      return res.send(
        "Se espera que digite un numero de grupo, el nombre del director de grupo y el grado al que pertenece"
      );
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.put("/group/:id", async function (req, res) {
  const id = req.params.id;

  const DATA = req.body;
  console.log(DATA);
  try {
    const foundGroup = await group.findOne({ where: { groupCode: id } });
    if (foundGroup === null) {
      return res.send("El grupo no existe");
    }

    const updatedGroup = await foundGroup.update(DATA);
    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/group/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const deletedGroup = await group.destroy({ where: { groupCode: id } });
    if (!deletedGroup) {
      return res.send("El grupo no existe");
    }
    res.send("Grupo eliminado exitosamente");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
