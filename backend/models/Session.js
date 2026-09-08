const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    key: {
        type: String,
        required: true,
        unique: true
    },

    expiresAt: {
        type: Date,
        required: true,
        index:true,
        expires:0
    }

});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;