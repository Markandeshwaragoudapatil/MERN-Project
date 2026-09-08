const jwt=require('jsonwebtoken')

const createToken=(user)=>{
    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'5m'}
    )
    return token
}

module.exports={
    createToken
}
