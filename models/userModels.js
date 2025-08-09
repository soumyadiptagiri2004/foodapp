const mongoose = require("mongoose")

// schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "user name is required"],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    usertype: {
        type: String,
        required: [true, 'user type is required'],
        default: 'clinet',
        enum: ['clinet', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Duser&psig=AOvVaw3stNxz0bHhJq6xXthoztz2&ust=1729144575885000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjwtfObkokDFQAAAAAdAAAAABAQ'
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
    },
}, { timestamps: true });


//export
module.exports = mongoose.model('User', userSchema);