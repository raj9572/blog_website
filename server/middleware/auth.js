const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const { Error } = require('../Utils/responseWrapper')


const fetchUser = async(req,res,next)=>{
    try {
        if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            // return res.status(401).send("Authorization header is require")
            return res.send(Error(401, 'Authorization header is require'))
        }
        const accessToken = req.headers.authorization.split(" ")[1]

        const data = jwt.verify(accessToken,process.env.JWT_SECRET_KEY)
        req.user=data
        const user = await UserModel.findById(req.user._id)
        if (!user) {
            return res.send(Error(404, 'User not found'))
        }
     
        next();
        
    } catch (error) {
        return res.send(Error(401,"Invalid access key in middleware"))
    }

}

module.exports=fetchUser