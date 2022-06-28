const router = require("express").Router();
const UserService = require("./UserService");

router.post("/", async (req, res) => {
  console.log("Hello");
  const user = req.body;
  if (!user.username) {
    return res.status(400).send({
      validationErrors: {
        username: "username cannot be null",
      },
    });
  }
  await UserService.save(req.body);

  return res.status(200).send({ message: "User created" });
});

module.exports = router;
