const express = require("express");
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require("../controllers/categoryControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

//create cat
router.post("/create", authMiddlewares, createCatController);
//GET ALL CAT
router.get("/getAll", getAllCatController);
//update cat
router.put("/update/:id", authMiddlewares, updateCatController);
//delete  cat
router.delete("/delete/:id", authMiddlewares, deleteCatController);

module.exports = router;