const router = require("express").Router();
const UserService = require("./UserService");

router.post("/", async (req, res) => {
  await UserService.save(req.body);

  return res.status(200).send({ message: "User created" });
});

module.exports = router;
