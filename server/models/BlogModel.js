const mongoose = require('mongoose')
const { Schema,model } = mongoose;


const blogSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  blogImage:{
    publicId: String,
    url: String
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  
  comments:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
  ]
  
},{timestamps:true});

module.exports = model('blog',blogSchema)