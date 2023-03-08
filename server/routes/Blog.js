const express = require('express')
const { createBlogController, getAllBlogController,getSpecificBlogController, blogCommentController } = require('../controllers/BlogController')
const fetchUser = require('../middleware/auth')
const router = express.Router()


router.post('/createblog',fetchUser,createBlogController)
router.post('/getallblog',fetchUser,getAllBlogController)
router.post('/getspecificblog',fetchUser,getSpecificBlogController)
router.post('/blogcomment/:blogId',fetchUser,blogCommentController)


module.exports=router