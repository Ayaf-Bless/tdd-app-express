const express = require("express");

const app = express();

app.post("/api/1.0/users", (req, res) => {
  return res.status(200).send();
});

module.exports = app;
