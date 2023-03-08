import React, { useRef, useState } from 'react'
import './UpdateProfile.css'
import avatar from '../../assests/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { axiosClient } from '../../Utils/axiosClient'
import { getMyProfile, showLoading, showToast } from '../../redux/appConfigSlice'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App'
const UpdateProfile = () => {
    const ImgRef = useRef(null)
    const [profileImg, setProfileImg] = useState()
    const dispatch = useDispatch()
    const [name, setName] = useState()
    const [bio, setBio] = useState()
    const myProfile = useSelector(state=>state.appConfigSlice.myProfile)

    const handleUpdateProfile =async ()=>{
        try {
           dispatch( showLoading(true))
            const res = await  axiosClient.post('/user/updateprofile',{
                name,bio,avatar:profileImg
        })
        console.log(res.data)
        if(res.data.status === 'ok'){
            dispatch(showToast({type:TOAST_SUCCESS,message: res.data.message}))
            dispatch(getMyProfile())
            dispatch( showLoading(false))
        }else{
            dispatch(showToast({type:TOAST_FAILURE,message: res.data.message}))
            dispatch( showLoading(false))
        }
        } catch (error) {
            console.log(error)
            dispatch( showLoading(false))
        }
    }


    const handleImageChange = (e)=>{
        ImgRef.current.src = URL.createObjectURL(e.target.files[0])
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setProfileImg(fileReader.result)
      }
    }
    }
  return (
    <div className='UpdateProfile'>

        <div className="container update-container">
            <div className="left_side">
                <label htmlFor="changeProfile"><img src={myProfile?.avatar?.url || avatar} ref={ImgRef} alt="" style={{borderRadius:'50%',width:'60px'}}/> <br /> chage Profile</label>
                <input className='profileInput' onChange={handleImageChange} type="file" id='changeProfile' accept='image/*' /><br />
            </div>
            <div className="right_side">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' />
                <input type="text" value={bio} onChange={(e)=>setBio(e.target.value)} placeholder='Enter your bio' />
                <button className="btn-primary" onClick={handleUpdateProfile}>update</button>
            </div>
        </div>
      
    </div>
  )
}

export default UpdateProfile
