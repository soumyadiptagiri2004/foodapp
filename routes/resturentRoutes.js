const express = require("express");
const { createResturantControllers, getAllResturantController, getResturantByIdController, deleteResturantController } = require("../controllers/resturentControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");
const router = express.Router();

//create resturent || post
router.post("/create", authMiddlewares, createResturantControllers);
//get all resturent
router.get("/getAll", getAllResturantController);
//get resturent by id || get
router.get("/get/:id", getResturantByIdController);
//delete resturent || delete
router.delete("/delete/:id", authMiddlewares, deleteResturantController);
module.exports = router;