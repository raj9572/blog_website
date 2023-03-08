// getting-started.js
const mongoose = require('mongoose');


const connectToMongo = async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/blog-app', {
        useNewUrlParser: true,
         useUnifiedTopology: true,
        });
        console.log('mongodb is connected successfully.......')

}


module.exports=connectToMongo