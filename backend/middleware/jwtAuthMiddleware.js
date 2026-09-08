const jwt=require('jsonwebtoken');
const AppError = require('../utils/AppError');

const authenticateJWT =(req,res,next)=>{
    const token=req.cookies.token;
    
    if(token===undefined){
        return res.status(401).json({
            message:'Token required, Please login'
        })
    }
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=payload.userId;
    }catch(error){
        throw new AppError("Invalid Token",401)
    }
    next()
    
}
module.exports={authenticateJWT}