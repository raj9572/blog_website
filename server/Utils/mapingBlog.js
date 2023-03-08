const ta = require('time-ago')

 const mapingBlog = (item)=>{
  
    return {
        _id:item._id,
        title:item.title,
        description:item.description,
        blogImage:item?.blogImage,
        user:{
            _id:item?.user?._id,
            name:item?.user?.name,
            avatar:item?.user?.avatar
        },
        timeago:ta.ago(item.createdAt)

    }
    

  

}

module.exports=mapingBlog