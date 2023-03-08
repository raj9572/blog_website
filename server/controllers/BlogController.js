const BlogModel = require("../models/BlogModel");
const CommentModel = require("../models/CommentModel");
const UserModel = require("../models/UserModel");
const  mapingBlog  = require("../Utils/mapingBlog");
const { success, Error } = require("../Utils/responseWrapper");
const cloudinary = require('cloudinary').v2



const createBlogController = async (req, res) => {
    try {
        const { title, description, blogImage } = req.body
        const userId = req.user._id

        if (!title || !description || !blogImage) {
            return res.send(Error(400, "All field are required"))
        }


        const cloudImg = await cloudinary.uploader.upload(blogImage, {
            folder: "blogImage2"
        })


        const userData = await UserModel.findById(userId)

        const blog = await BlogModel.create({
            title, description, user: userId,
            blogImage: {
                publicId: cloudImg.public_id,
                url: cloudImg.url
            }

        })
        userData.blogs.push(blog._id)

        await userData.save()

        return res.send(success(201, { blog, message: "blog is created successfully" }))
    } catch (error) {
        console.log(error);
        return res.send(Error(500, error.message))
    }


}
const getAllBlogController = async (req, res) => {

    try {
        let fullBlogs = await BlogModel.find({}).populate("user")
        // return res.send(fullBlogs[7])
        const  allBlogs = fullBlogs.map(blog => mapingBlog(blog)).reverse()
        return res.send(success(200, { allBlogs }))
    } catch (error) {
        console.log(error);
        // return res.send(Error(500, error.message))
    }



}
const getSpecificBlogController = async (req, res) => {

    try {
        const blogId = req.body.blogId;
        const blog = await BlogModel.findById(blogId).populate([{
            path: 'user',
            model: 'user'
        }, {
            path: 'comments',
            model: 'comment',
            populate: {
                path: 'userId'
            }
        }])

        if (!blog) {
            return res.send(Error(404, "blog not found"))
        }

        return res.send(success(200, blog))

    } catch (error) {
        console.log(error);
        return res.send(Error(500, error.message))
    }


}

const blogCommentController = async (req, res) => {
    try {
        const { commentText } = req.body
        const blogId = req.params.blogId

        if (!commentText) {
            return res.send(Error(400, "please text in comment"))
        }

        const blog = await BlogModel.findById(blogId)

        const comment = await CommentModel.create({
            commentText,
            blogId,
            userId: req.user._id
        })

        blog.comments.push(comment._id)
        await blog.save()

        return res.send(success(200, "you are commented on post"))


    } catch (error) {
        console.log(error);
        return res.send(Error(500, error.message))
    }

}


module.exports = {
    createBlogController,
    getAllBlogController,
    getSpecificBlogController,
    blogCommentController
}