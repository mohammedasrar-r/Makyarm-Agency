const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    role:['freelancer','User','Admin']
});

module.exports = mongoose.model("User", userSchema);