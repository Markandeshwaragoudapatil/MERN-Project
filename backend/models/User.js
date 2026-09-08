const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },

    passwordHash: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;