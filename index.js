const app = require("./app.js");
const sequelize = require("./database/db.js");
const { student, group, grade } = require("./model/index.js");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const port = process.env.PORT || 3000;
  try {
    await sequelize.sync({
      force: false,
      models: [student, grade, group],
    });
    console.log("sequelize sync funcionó correctamente");
    app.listen(port);
    console.log("Servidor express iniciado en puerto 3000");
  } catch (error) {
    console.log("Error al conectar:", error);
  }
}

main();
