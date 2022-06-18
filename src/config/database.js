const Sequilize = require("sequelize");

const sequilize = new Sequilize("hoaxify", "ayaf", "1122", {
  dialect: "sqlite",
  Storage: "./database.sqlite",
});

module.exports = sequilize;
