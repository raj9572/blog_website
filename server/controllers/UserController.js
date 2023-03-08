const UserModel = require("../models/UserModel");
const { success, Error } = require("../Utils/responseWrapper");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary').v2


// ! Create a User 
const createUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.send(success(400, "all filed are required"))
        }

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.send(success(400, "you are already signup"))
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        await UserModel.create({
            name, email,
            password: hashPassword
        })

        return res.send(success(201, "you are successfully signuped"))

    } catch (error) {
        console.log(error);
        res.send(Error(500, "internal server error"))
    }

}



// ! Login a User 
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.send(Error(400, "all filed are required"))
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.send(Error(400, "You are not a valid user Credential"))
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.send(Error(400, "your email and password are invalid"))
        }

        // const data = {_id:user._id}
        const accessToken = generateAccessToken({ _id: user._id })
        const refreshToken = generateRefreshToken({ _id: user._id })



        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        })

        return res.send(success(200, { accessToken, message: "your are successfully login" }))

    } catch (error) {
        console.log(error);
        res.send(Error(500, "internal server error"))
    }

}





// ! getUserProfile a User
const getMyProfileController = async (req, res) => {

    try {
        const user = await UserModel.findById(req.user._id).select("-password")
        if (!user) {
            return res.send(Error(400, "user not found"))
        }
        return res.send(success(200, user))

    } catch (error) {
        console.log(error);
        return res.send(Error(500, "auth error"))
    }

}


const getUserProfileController = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userData = await UserModel.findById(userId).select("-password").populate({
            path: 'blogs',
            populate: {
                path: 'user'
            }
        })
        return res.send(success(200, userData))

    } catch (error) {
        console.log(error);
        return res.send(Error(500, "auth error"))
    }


}


const updateProfileController = async (req, res) => {
    try {
        const { bio, name, avatar } = req.body

        const user = await UserModel.findById(req.user._id)
        if (bio) { user.bio = bio }
        if (name) { user.name = name }
        if (avatar) {
            const cloudImg = await cloudinary.uploader.upload(avatar, {
                folder: "blogAvatar"
            })
            user.avatar = {
                publicId: cloudImg.public_id,
                url: cloudImg.secure_url
            }

        }

        await user.save()

        res.send(success(200, "profile has been updated"))

    } catch (error) {

    }
}

const refreshAccessTokenController = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies.jwt) {
        // return res.status(401).send("Refresh token in cookie is required")
        return res.send(Error(401, 'Refresh token in cookie is required'))
    }
    const refreshToken = cookies.jwt

    try {
        const token = jwt.verify(refreshToken, process.env.REFRESE_TOKEN_PRIVATE_KEY)
        const _id = token._id
        const accessToken = generateAccessToken({ _id })
        // return res.status(201).json({ accessToken })
        return res.send(success(201, accessToken))
    } catch (err) {
        // return res.status(401).send("Invalid access key")
        return res.send(Error(401, 'Invalid access key'))
    }

}



const generateAccessToken = (data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: '10s'
    })
    return token
}

const generateRefreshToken = (data) => {
    const token = jwt.sign(data, process.env.REFRESE_TOKEN_PRIVATE_KEY, {
        expiresIn: '1y'
    })
    return token
}


const logoutController =async (req,res)=>{
        try {
            res.clearCookie('jwt', {
                httpOnly: true,
                secure: true
            })
            return res.send(success(200, ' logged out successfully'))
        } catch (error) {
            console.log(error)
            return res.send(Error(500,error.message))
        }
}


module.exports = {
    createUserController,
    loginUserController,
    getMyProfileController,
    getUserProfileController,
    updateProfileController,
    refreshAccessTokenController,
    logoutController
}