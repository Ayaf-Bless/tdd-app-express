const Sequilize = require("sequelize");
const path = require("path");

const sequilize = new Sequilize("hoaxify", "ayaf", "1122", {
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database.sqlite"),
  logging: false,
});

module.exports = sequilize;
