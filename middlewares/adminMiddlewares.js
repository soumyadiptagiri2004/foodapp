const userModels = require("../models/userModels");
module.exports = async(req, res, next) => {
    try {
        const user = await userModels.findById(req.body.id);
        if (user == "admin") {
            return res.status(403).send({
                success: false,
                message: "Only Admin ACess ",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(403).send({
            success: false,
            message: "Un-AUthorized ACCESS",
            error,
        });
    }
};