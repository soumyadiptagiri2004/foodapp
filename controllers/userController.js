const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs")
    //get user info
const getUserController = async(req, res) => {
    try {
        //find user
        const user = await userModels.findById({ _id: req.body.id })
            //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }
        //hide password
        user.password = undefined
        res.status(200).send({
            success: true,
            message: "User get successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get user api",
            error,
        });
    }
};
//update user
const updateUserController = async(req, res) => {
    try {
        //find user
        const user = await userModels.findById({ _id: req.body.id })
            //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                meesage: "User not found"
            });
        }
        //update
        const { userName, address, phone } = req.body
        if (userName) user.userName = userName
        if (address) user.address = adress
        if (phone) user.phone = phone
            //save user
        await user.save()
        res.status(200).send({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update user API",
            error,
        });
    }
};
//update password
const updatePasswordController = async(req, res) => {
    try {
        //find user
        const user = await userModels.findById({ _id: req.body.id });
        //valdiation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        // get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Old or New PasswOrd",
            });
        }
        //check user password  | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password",
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Password Update API",
            error,
        });
    }
}

const resetPasswordController = async(req, res) => {
    try {
        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(404).send({
                success: false,
                message: "Please provide all fields",
            });
        }
        const user = await userModels.findOne({ email, answer })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "Not found",
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Password reset api",
            error,
        });
    }
};

//delete profile account
const deleteProfileController = async(req, res) => {
    try {
        await userModels.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr In Delete Profile API",
            error,
        });
    }
}

module.exports = { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController };