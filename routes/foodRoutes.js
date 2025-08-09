const express = require("express");
const {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
} = require("../controllers/foodControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");
const adminMiddlewares = require("../middlewares/adminMiddlewares");
const router = express.Router();

//create foods
router.post("/create", authMiddlewares, createFoodController);
//get all food
router.get("/getAll", getAllFoodsController);
//get single foods
router.get("/get/:id", getSingleFoodController);
//get food by resturent
router.get("/getByResturent/:id", getFoodByResturantController);
//update food
router.put("/update/:id", authMiddlewares, updateFoodController);
//delete food
router.delete("/delete/:id", authMiddlewares, deleteFoodController);
//place order
router.post("/placeorder", authMiddlewares, placeOrderController);
//order status
router.post("/orderStatus/:id", adminMiddlewares, authMiddlewares, orderStatusController);
module.exports = router;