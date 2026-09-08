const crypto = require("crypto");
const Session=require("../models/Session");
const getSession=async(sessionId)=>{
    return await Session.findOne({key:sessionId})
}
const addSession=async (user)=>{
    return await Session.create({
        userId:user._id,
        key:crypto.randomBytes(32).toString("hex"),
        expiresAt:new Date(Date.now()+5*60*1000)
    })
}
module.exports={
    getSession,
    addSession
}