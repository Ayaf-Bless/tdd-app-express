const express = require("express");
const userRouter = require("./user/userRouter");

const app = express();

app.use(express.json());

app.use("/api/1.0/users", userRouter);

module.exports = app;
