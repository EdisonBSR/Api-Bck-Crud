const express = require("express");
const db = require("../models/index.js");
const router = express.Router();
const validator = require("validator");
router.get("/group/:id", async function (req, res) {
  const id =
    typeof req.params.id == "string" ? req.params.id : req.params.id.toString();
  if (validator.isInt(id)) {
    const foundGroup = await db.group.findByPk(id);
    if (foundGroup === null) {
      return res.send("El grupo no existe");
    } else return res.json(foundGroup);
  } else {
    return res.send("El id no es un numero ");
  }
});
router.get("/group", async function (req, res) {
  const foundGroup = await db.group.findAll();
  //si el arra foundGroup no tiene nada no responde segun lo esperado
  if (!foundGroup || foundGroup.length === 0) {
    res.send("No existen grupos");
  } else res.json(foundGroup);
});
router.post("/group", async function (req, res) {
  let { groupCode, coordinator, idGrade } = req.body;
  groupCode = typeof groupCode == "string" ? groupCode : groupCode.toString();
  coordinator =
    typeof coordinator == "string" ? coordinator : coordinator.toString();
  idGrade = typeof idGrade == "string" ? idGrade : idGrade.toString();

  try {
    if (
      validator.isInt(groupCode) &&
      validator.isInt(idGrade) &&
      validator.isAlpha(coordinator)
    ) {
      const foundGrade = await db.grade.findByPk(idGrade);
      console.log(foundGrade);
      if (foundGrade === null) {
        return res.send("El grado ingresado no existe");
      } else {
        const [newGroup, succes] = await db.group.findOrCreate({
          where: { groupCode, coordinator, idGrade },
        });
        console.log("estado de findOrCreate: ", succes);
        if (succes) {
          console.log(succes);
          return res.sendStatus(200);
        } else {
          return res.send("El grupo ya fue asignado a un grado");
        }
      }
    } else {
      return res.send(
        "Se espera que digite un numero de grupo, el nombre del director de grupo y el grado al que pertenece que tambien un numero"
      );
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.put("/group/:id", async function (req, res) {
  const id =
    typeof req.params.id == "string" ? req.params.id : req.params.id.toString();
  const { ...DATA } = req.body;
  let foundGroup;
  let updateData = {};
  let n = 0;
  let msg = "";

  Object.entries(DATA).forEach(([key, value]) => {
    n++;
    console.log(n);
    if (key == "groupCode") {
      if (typeof value == "string") {
        if (validator.isInt(value)) {
          updateData[key] = value;
        } else {
          msg += "El codigo de grupo no es un numero. ";
          return;
        }
      } else {
        if (validator.isInt(value.toString())) {
          updateData[key] = value.toString();
        } else {
          msg += "El codigo de grupo no es un numero. ";
          return;
        }
      }
    } else if (key == "coordinator") {
      if (validator.isAlpha(value)) {
        updateData[key] = value;
      } else {
        msg += "El nombre de cordinador solo debe contener letras. ";
        return;
      }
    } else if (key == "idGrade") {
      if (typeof value == "string") {
        if (validator.isInt(value)) {
          updateData[key] = value;
        } else {
          msg += "El codigo de grado no es un numero. ";
          return;
        }
      } else {
        if (validator.isInt(value.toString())) {
          updateData[key] = value;
        } else {
          msg = "El codigo de grado no es un numero. ";
          return;
        }
      }
    }
  });
  console.log(updateData);
  if (msg != "") {
    return res.send(msg);
  }
  try {
    if (validator.isInt(id)) {
      foundGroup = await db.group.findByPk(id);
    } else {
      return res.send("El grado no es un numero");
    }
    if (foundGroup === null) {
      return res.send("El grupo no existe");
    }
    const updatedGroup = await foundGroup.update(updateData);
    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/group/:id", async function (req, res) {
  const id =
    typeof req.params.id == "string" ? req.params.id : req.params.id.toString();
  try {
    if (validator.isInt(id)) {
      const foundGroup = await db.group.findByPk(id);
      // console.log(foundGroup == null);
      if (foundGroup == null) {
        return res.send("El grupo no existe");
      } else {
        await foundGroup.destroy();
        return res.send("Grupo eliminado exitosamente");
      }
    } else res.send("No se ha ingresado un valor valido");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
