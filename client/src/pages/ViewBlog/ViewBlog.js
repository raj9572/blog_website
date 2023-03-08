import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App'
import avatar from '../../assests/avatar.png'
import { showLoading, showToast } from '../../redux/appConfigSlice'
import { fetchUserBlog } from '../../redux/feedSlice'
import { axiosClient } from '../../Utils/axiosClient'
import sampleblogImg from '../../assests/sampleblogImg.jpg'
import './ViewBlog.css'
const ViewBlog = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userblog = useSelector(state => state.feedSlice.userblog)
    const [comment,setComment] = useState('')
    const [run ,setRun] = useState('')

    const handleAddComment = async()=>{
       try {
        dispatch(showLoading(true))
        const res = await axiosClient.post(`/blog/blogcomment/${params.blogId}`,{
            commentText:comment
        })
        if(res.data.status === 'ok'){
            dispatch(showToast({type:TOAST_SUCCESS,message:res.data.message}))
            setRun("it's running")
        }
        else{
            dispatch(showToast({type:TOAST_FAILURE,message:res.data.message}))
        }

       } catch (error) {
        
       }
       finally{
        dispatch(showLoading(false))
        setComment('')
       }


    }

    useEffect(() => {
        dispatch(fetchUserBlog({ blogId: params.blogId }))
    }, [run])
    return (
        <div className='View_blog'>
            <div className=" view_container">
            <div className="view_img">
                <img src={userblog?.blogImage?.url || sampleblogImg} alt="" />
            </div>
            <div className="view_body" style={{overflowWrap:'break-word'}}>
                <h3>{userblog?.title}</h3>
                <h5 className=''>{userblog?.description}</h5>
                <p><strong>CreatedBy : </strong>{userblog?.user?.name}</p>
                <p><strong>updated At : </strong>{userblog?.updatedAt}</p>
            </div>
            <div className="view_comments">
                <h4>Comments ({userblog?.comments?.length})</h4>
                <input className='w-75 p-2  border rounded-2 outline-none' onChange={(e)=>setComment(e.target.value)} type="text" placeholder='Enter you comments' />
                <button className="btn btn-primary p-2" style={{marginTop:'-5px'}} onClick={handleAddComment}>comment</button>
                {userblog?.comments?.map(comment=>(
            <div key={comment._id} className='my-2'>
                <img src={comment?.userId?.avatar?.url || avatar} alt="" style={{borderRadius:'50%',width:'50px'}} onClick={()=>navigate(`/profile/${comment?.userId?._id}`)} />
                 <span className='user_comment mx-2'>{comment?.commentText} </span>
                <p>{comment.userId.name}</p>
            </div>
                ))}
            </div>
            </div>
        </div>
    )
}

export default ViewBlog
