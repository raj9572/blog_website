
 const success = (statusCode,message)=>{
    return{
        status:'ok',
        statusCode,
        message
    }

}

 const Error = (statusCode,message)=>{
    return{
        status:'error',
        statusCode,
        message
    }

}

module.exports={
    success,Error
}