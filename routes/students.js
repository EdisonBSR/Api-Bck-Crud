const express = require("express");
const db = require("../models/index.js");
const validator = require("validator");
const router = express.Router();
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
  const foundStudent = await db.student.findAll();
  // console.log(foundStudent.length);
  if (foundStudent.length === 0) {
    return res.send("No existen estudiantes");
  } else {
    return res.json(foundStudent);
  }
});
router.post("/student", async (req, res) => {
  const { ...data } = req.body;
  let msg = "";
  let idGroup = "";
  let dataStudent = {};
  let dni = "";
  Object.entries(data).forEach(([key, value]) => {
    if (key == "dni") {
      value = typeof value == "string" ? value : value.toString();
      if (validator.isInt(value)) {
        dataStudent[key] = value;
        dni = value;
      } else {
        return (msg +=
          "No ha ingresado un numero de documento valido, ingrese solo numeros de enteros (0,1,2,3..). ");
      }
    } else if (key == "firsName" || key == "lastName") {
      if (validator.isAlpha(key)) {
        dataStudent[key] = value;
      } else {
        return (msg +=
          "El nombre o apellido contiene caracteres especiales, ingrese el nombre solo usando letras");
      }
    } else if (key == "phone") {
      value = typeof value == "string" ? value : value.toString();
      if (
        validator.isMobilePhone(value) &&
        validator.isLength(value, { min: 10, max: 10 })
      ) {
        dataStudent[key] = value;
      } else {
        return (msg +=
          "El numero ingresado no es valido o son mas de 10 numeros");
      }
    } else if (key == "email") {
      value = typeof value == "string" ? value : value.toString();
      if (validator.isEmail(value)) {
        dataStudent[key] = value;
      } else {
        return (msg += "No ha ingresado un correo electronico valido");
      }
    } else if (key == "idGroup") {
      value = typeof value == "string" ? value : value.toString();
      idGroup = value;
      dataStudent[key] = value;
    }
  });
  if (msg != "") {
    return res.send(msg);
  }
  try {
    const founStudent = await db.student.findByPk(dni);
    // console.log(founStudent);
    if (founStudent == null) {
      const foundGroup = await db.group.findByPk(idGroup);
      if (foundGroup == null) {
        return res.send("El grupo al cual se piensa asignar no existe");
      } else {
        const newStudent = await db.student.create(dataStudent);
        return res.status(201).json(newStudent);
      }
    } else {
      res.send(`El estudiante con el numero de documento: ${dni}. ya existe`);
    }
  } catch (error) {
    console.error(error);
    res.send("No se pudo crear el estudiante");
  }
});
router.put("/student/:dni", async (req, res) => {
  const dni =
    typeof req.params.dni == "string"
      ? req.params.dni
      : req.params.dni.toString();
  let dataStudent = {};
  let msg = "";
  // console.log(dni);
  if (validator.isInt(dni)) {
    const { ...data } = req.body;
    Object.entries(data).forEach(([key, value]) => {
      if (key == "dni") {
        value = typeof value == "string" ? value : value.toString();
        if (validator.isInt(value)) {
          dataStudent[key] = value;
        } else {
          return (msg +=
            "No ha ingresado un numero de documento valido, ingrese solo numeros de enteros (0,1,2,3..). ");
        }
      } else if (key == "firsName" || key == "lastName") {
        if (validator.isAlpha(key)) {
          dataStudent[key] = value;
        } else {
          return (msg +=
            "El nombre o apellido contiene caracteres especiales, ingrese el nombre solo usando letras");
        }
      } else if (key == "phone") {
        value = typeof value == "string" ? value : value.toString();
        if (validator.isMobilePhone(value, [es - CO, [{ max: 10 }]])) {
          dataStudent[key] = value;
        } else {
          return (msg +=
            "El numero ingresado no es valido o son mas de 10 numeros");
        }
      } else if (key == "email") {
        value = typeof value == "string" ? value : value.toString();
        if (validator.isEmail(value)) {
          dataStudent[key] = value;
        } else {
          return (msg += "No ha ingresado un correo electronico valido");
        }
      }
    });
    if (msg != "") {
      return res.send(msg);
    }
    try {
      const foundStudent = await db.student.findByPk(dni);
      // console.log(foundStudent);
      if (foundStudent === null) {
        return res.send("Debe existir el estudiante para poder actualizarlo");
      } else {
        const updateStudent = await foundStudent.update(dataStudent);
        return res.send(updateStudent);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el estudiante." });
    }
  } else {
    return res.send("No se encontro estudiante");
  }
});

router.delete("/student/:dni", async (req, res) => {
  const dni =
    typeof req.params.dni == "string"
      ? req.params.dni
      : req.params.dni.toString();
  if (validator.isInt(dni)) {
    try {
      const deletedStudent = await db.student.destroy({
        where: { dni: dni },
      });
      // console.log(deletedStudent);
      if (deletedStudent == 1) {
        return res.sendStatus(204);
      } else {
        return res.send("No se encontro al estudiante");
      }
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    return res.send("No ha ingresado un dni valido");
  }
});
module.exports = router;
