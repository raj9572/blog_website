const mongoose = require('mongoose')
const { Schema,model } = mongoose;
const { isEmail } = require('validator')
const userSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate: [ isEmail, 'invalid email' ]
  },
  password:{
    type:String,
    required:true
  },
  bio:{
    type:String,
  },
  avatar:{
    publicId: String,
    url: String
  },
  blogs:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    }
  ]
  
},{timestamps:true});

module.exports= model('user',userSchema)