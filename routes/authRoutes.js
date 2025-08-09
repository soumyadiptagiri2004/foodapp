const express = require("express");
const { registerController, loginController } = require("../controllers/authControllers");

//router object
const router = express.Router();

//routes GET | POST | UPDATE | DELETE
router.post("/register", registerController);

//login || post
router.post("/login", loginController);

//export
module.exports = router;