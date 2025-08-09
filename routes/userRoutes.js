const express = require("express");
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require("../controllers/userController");
const authMiddlewares = require("../middlewares/authMiddlewares");
const authMiddleware = require("../middlewares/authMiddlewares");
const router = express.Router();

//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

//update profile
router.put("/updateUser", authMiddlewares, updateUserController);

//password update
router.post("/updatePassword", authMiddlewares, updatePasswordController)
    //RESET password
router.post("/resetPassword", authMiddlewares, resetPasswordController);
//delete user
router.delete("/deleteUser/:id", authMiddlewares, deleteProfileController);
//export
module.exports = router;