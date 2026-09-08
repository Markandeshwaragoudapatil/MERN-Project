const { checkUser } = require("../services/profileService");
const {createToken}=require("../utils/jwt")

const loginUser=async (req,res)=>{
    const {username,password}=req.body;

    const session={
        username:username,
        password:password
    }

    const user=await checkUser(session);

    if(user){
        const token=createToken(user)
  
        res.cookie("token",token,{
            httpOnly:true,
            secure:true
        }); 
        return res.status(200).json({
            message:"User logged in succesfully"
        }); 
    }
    else{
        return res.status(402).json({
            message:"Please register before login"
        })
    } 
    

};

module.exports={loginUser}