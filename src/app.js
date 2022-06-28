const express = require("express");
const userRouter = require("./user/userRouter");

const app = express();

console.log(process.env.NODE_ENV);

app.use(express.json());

app.use("/api/1.0/users", userRouter);

module.exports = app;
