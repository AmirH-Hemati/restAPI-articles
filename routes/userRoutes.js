const express = require("express");
const { signup, login } = require("../controllers/authControllers");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// router.route("/").get().post();

// router.route("/:id").get().delete().patch();
module.exports = router;
