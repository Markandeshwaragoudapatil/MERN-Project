const { getProfile } = require("../services/profileService");

const authorizeAdmin=async (req,res,next)=>{

    const user=await getProfile(req.userId);
    if(user.role==='admin'){
        next();
    }else{
        res.status(403).json({
            message:"You are not allowed to do this operation"
        })
    }
}
module.exports=authorizeAdmin;