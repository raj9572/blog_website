require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 6000
const connectToMongo = require('./db')
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const cookieParser = require('cookie-parser')


// middleware
app.use(express.json({limit:'50mb'}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))


// cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });



// router setUp
app.use('/user', require('./routes/User'))
app.use('/blog', require('./routes/Blog'))


app.listen(port, () => {
    connectToMongo()
    console.log(`Example app listening on port ${port}`)
})