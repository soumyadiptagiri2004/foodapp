const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async(req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;
        //validation
        if (!userName || !email || !password || !address || !phone || !answer) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }
        // check user
        const exisiting = await userModels.findOne({ email });
        if (exisiting) {
            return res.status(409).send({
                success: false,
                message: "Email Already Registerd please Login",
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)
            //create new user
        const user = await userModels.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
        });
        res.status(201).send({
            success: true,
            messaage: "Successfully Registered",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            messaage: "Error in Register API",
            error
        });
    }
};
//Login
const loginController = async(req, res) => {
    try {
        const { email, password } = req.body
            //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide email or password"
            })
        }
        //check user
        const user = await userModels.findOne({ email })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }
        //check user password | compare password

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            });
        }
        //token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error In login API",
            error
        })
    }
};
module.exports = { registerController, loginController };