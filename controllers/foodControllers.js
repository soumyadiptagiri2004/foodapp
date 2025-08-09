const foodModels = require("../models/foodModels");
const orderModels = require("../models/orderModels");
const createFoodController = async(req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabel,
            resturant,
            rating,
        } = req.body;

        if (!title || !description || !price || !resturant) {
            return res.status(500).send({
                success: false,
                message: "Please Provide all fields",
            });
        }
        const newFood = new foodModels({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabel,
            resturant,
            rating,
        });

        await newFood.save();
        res.status(201).send({
            success: true,
            message: "New Food Item Created",
            newFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create food api",
            error,
        });
    }
};
// GET ALLL FOODS
const getAllFoodsController = async(req, res) => {
    try {
        const foods = await foodModels.find({});
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "no food items was found",
            });
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get ALL Foods API",
            error,
        });
    }
};
// GET SINGLE FOOD
const getSingleFoodController = async(req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "please provide id",
            });
        }
        const food = await foodModels.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with htis id",
            });
        }
        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In get SIngle Food API",
            error,
        });
    }
};

// GET FOOD BY RESTURANT
const getFoodByResturantController = async(req, res) => {
    try {
        const resturentId = req.params.id;
        if (!resturentId) {
            return res.status(404).send({
                success: false,
                message: "please provide id",
            });
        }
        const food = await foodModels.find({ resturent: resturentId });
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with htis id",
            });
        }
        res.status(200).send({
            success: true,
            message: "food base  on resturent",
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In get SIngle Food API",
            error,
        });
    }
};
// UPDATE FOOD ITEM
const updateFoodController = async(req, res) => {
    try {
        const foodID = req.params.id;
        if (!foodID) {
            return res.status(404).send({
                success: false,
                message: "no food id was found",
            });
        }
        const food = await foodModels.findById(foodID);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found",
            });
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturnat,
            rating,
        } = req.body;
        const updatedFood = await foodModels.findByIdAndUpdate(
            foodID, {
                title,
                description,
                price,
                imageUrl,
                foodTags,
                catgeory,
                code,
                isAvailabe,
                resturnat,
                rating,
            }, { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Food Item Was Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr In Update Food API",
            error,
        });
    }
};
const deleteFoodController = async(req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "provide food id",
            });
        }
        const food = await foodModels.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with id",
            });
        }
        await foodModels.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food Item Deleted ",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror In Delete Food APi",
            error,
        });
    }
};
// PLACE ORDER
const placeOrderController = async(req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(500).send({
                success: false,
                message: "please food cart or payemnt method",
            });
        }
        let total = 0;
        //cal
        cart.map((i) => {
            total += i.price;
        });

        const newOrder = new orderModels({
            foods: cart,
            payment: total,
            buyer: req.body.id,
        });
        await newOrder.save();
        res.status(201).send({
            success: true,
            message: "Order Placed successfully",
            newOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr In Place Order API",
            error,
        });
    }
};
// CHANGE ORDER STATUS
const orderStatusController = async(req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide valid order id",
            });
        }
        const { status } = req.body;
        const order = await orderModels.findByIdAndUpdate(
            orderId, { status }, { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Order Status Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Order Status API",
            error,
        });
    }
};

module.exports = {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
};