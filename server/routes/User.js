const express = require('express')
const { createUserController, loginUserController,logoutController,refreshAccessTokenController,updateProfileController,getUserProfileController, getMyProfileController } = require('../controllers/UserController')
const fetchUser = require('../middleware/auth')
const router = express.Router()


router.post('/signup',createUserController)
router.post('/login',loginUserController)
router.get('/getmyprofile',fetchUser,getMyProfileController)
router.get('/getmyprofile',fetchUser,getMyProfileController)
router.post('/getuserprofile',fetchUser,getUserProfileController)
router.post('/updateProfile',fetchUser,updateProfileController)
router.get('/refresh', refreshAccessTokenController)
router.post('/logout', logoutController)

module.exports=router