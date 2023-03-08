import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../App'
import { showLoading, showToast } from '../redux/appConfigSlice'
import { fetchAllBlogs } from '../redux/feedSlice'
import { axiosClient } from '../Utils/axiosClient'

const AddBlog = () => {
    const ImgRef = useRef(null)
    const dispatch = useDispatch()
   const [title,setTitle]=useState('')
   const [description,setDescription]=useState('')
   const [image,setImage] =useState('')


   const handleAddBlog=async(e)=>{
        e.preventDefault();
        dispatch(showLoading(true))
        try {
            const res = await axiosClient.post('/blog/createblog',{
                title,description,blogImage:image
            })
            if(res.data.status === 'ok'){
            dispatch(showToast({ type: TOAST_SUCCESS, message: res.data.message.message }))
            dispatch(fetchAllBlogs())
            }else{
                dispatch(showToast({ type: TOAST_FAILURE, message: res.data.message }))
            }

         dispatch(showLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(showLoading(false))
        }

   }



   const imageOnChange = (e)=>{
    ImgRef.current.className="d-block"
    ImgRef.current.src = URL.createObjectURL(e.target.files[0])
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setImage(fileReader.result)
      }
    }
   }
   

const ImageStyle={
    width: '245px',
    height: '162px',
    borderRadius: '10px',
    display: 'block',
    overflow:"hidden",
    marginBottom:'5px'
}
  return (
    <div>
       <form method='post' onSubmit={handleAddBlog}>

       <div className="mb-1">
          <label htmlFor="image" className="form-label">image</label>
          <img ref={ImgRef} className="d-none"  src="" alt="" style={ImageStyle} />
          <input type="file"  onChange={imageOnChange} className="form-control" accept='image/*' id="image" aria-describedby="emailHelp" />
        </div>
        <div className="mb-1">
          <label htmlFor="title" className="form-label">title</label>
          <input type="text" value={title} name='title'  onChange={(e)=>setTitle(e.target.value)} className="form-control" id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-1">
          <label htmlFor="description" className="form-label">description</label>
          <textarea className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)}  id="exampleFormControlTextarea1" rows="5"></textarea>
        </div>
       
        <button type='submit' className="btn btn-primary mt-2" onClick={handleAddBlog}>Add blog</button>
        </form>
    </div>
  )
}

export default AddBlog
