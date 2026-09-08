const {getSession} = require("../services/loginService");
const { deleteSession } = require("../services/logoutService");
const authenticate=async (req,res,next)=>{
    const sessionId=req.cookies.sessionId;
    if(sessionId===undefined){
        return res.status(401).json(
            {message:"Session ID is required"}
        )
    }
    const session=await getSession(sessionId);
    if(!session){
        return res.status(401).json(
            {message:"Not authenticated, Please login"}
        )
    }
    if(session.expiresAt<new Date()){
        await deleteSession(sessionId);
        res.clearCookie("sessionId");
        return res.status(401).json(
            {message:"Session expired, Please login again"}
        )
    }   
    req.session=session;
    next();    
};

module.exports={authenticate}
