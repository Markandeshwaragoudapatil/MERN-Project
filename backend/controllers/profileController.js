const {getProfile}=require("../services/profileService");

const getUserProfile=async (req,res)=>{
    const user=await getProfile(req.userId);
    res.status(200).json({
        name:user.name
    })
}
module.exports={getUserProfile};