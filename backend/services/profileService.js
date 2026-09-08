const User = require("../models/User");
const argon2 = require("argon2");

const getProfile = async (userId) => {
    return await User.findById(userId);
};
const addUser=async (user)=>{
    return await User.create({
        name:user.name,
        username:user.username,
        passwordHash:await argon2.hash(user.password)
    })
}
const checkUser=async(user)=>{
    const existingUser=await User.findOne({username:user.username});
    if(existingUser){
        const isPasswordValid=await argon2.verify(existingUser.passwordHash,user.password);
        if(isPasswordValid){
            return existingUser;
        }
    }
    return null;
};
module.exports = { 
    getProfile,
    addUser,
    checkUser
 };