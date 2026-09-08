const Session=require("../models/Session");
const deleteSession=async (sessionId)=>{
    return await Session.findOneAndDelete({key:sessionId});
}
module.exports={deleteSession}