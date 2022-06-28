const Sequilize = require("sequelize");
const config = require("config");

const database = config.get("database");

const sequilize = new Sequilize(
  database.name,
  database.username,
  database.password,
  {
    dialect: database.dialect,
    storage: database.storage,
    logging: database.logging,
  }
);

module.exports = sequilize;
