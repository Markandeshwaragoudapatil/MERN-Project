const { addSession } = require("../services/loginService");
const { addUser } = require("../services/profileService");
const {createToken}=require("../utils/jwt")

const registerUser = async (req, res) => {
    const { name, username, password } = req.body;
    const newUser = await addUser({ name, username, password });
    const token=createToken(newUser)
    res.cookie("token",token,{
        httpOnly:true,
        secure:true
    });
    return res.status(201).json({
        message: "User registered and logged in successfully",
        user: newUser.name
    });
};

module.exports = { registerUser };