const mongoose = require('mongoose')
const { Schema,model } = mongoose;

const commentSchema = new Schema({
 
    commentText:{
        type:String,
        required:true
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
},);

module.exports= model('comment',commentSchema)