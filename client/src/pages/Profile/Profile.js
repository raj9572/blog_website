import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/Card';
import { getUserProfile } from '../../redux/userSlice';
import './Profile.css'
import {showLoading,showToast} from '../../redux/appConfigSlice'
import avatar from '../../assests/avatar.png'
import sampleblogImg from '../../assests/sampleblogImg.jpg'
import { ACCESS_KEY, removeItem } from '../../Utils/localStorageManager';
import { axiosClient } from '../../Utils/axiosClient';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App';
const Profile = () => {
  const navigate = useNavigate()
  const params = useParams();
  const dispatch = useDispatch()
  const userProfile = useSelector(state=>state.userSlice.userProfile)
  const myProfile = useSelector(state=>state.appConfigSlice.myProfile)
 

  useEffect(() => {
    dispatch(getUserProfile({ userId: params.userId }))
  }, [])

  async function handleLogoutClick(){
    try {
      dispatch(showLoading(true))
      const res = await axiosClient.post('/user/logout');
       removeItem(ACCESS_KEY)
       navigate('/login');
       dispatch(showToast({ type: TOAST_SUCCESS, message: res.data.message }))
    } catch (error) {
      console.log(error)
      dispatch(showToast({ type: TOAST_FAILURE, message:error.message }))
      
    }
    finally{
      dispatch(showLoading(false))
    }
 }
  return (
    <div className='Profile'>
      <div className="profile-container">
      <div className="left-side me-2">
        
           <div className="blogs my-2">
           {userProfile?.blogs?.map(blog=>(
            <div key={blog._id} className="card mb-3" style={{maxWidth: "80%"}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={blog?.blogImage?.url || sampleblogImg} className="img-fluid rounded-start h-100 object-fit-fill" alt="..."/>
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.description}</p>
                  <p className="card-text my-0"><strong>Createdby : </strong>{blog.user.name}</p>
                  <p className="card-text my-0"><strong>Email : </strong>{blog.user.email}</p>
                  <p className="card-text my-0"><strong>Last update : </strong>{blog.updatedAt}</p>
                  
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  <Link to={`/viewblog/${blog._id}`} className="btn btn-primary">Read more</Link>
                </div>
              </div>
            </div>
          </div>
           ))}
           
           </div>
         
      </div>
      <div className="right-side ms-2">
      <div className="card my-2" style={{width: "18rem"}}>
    <img src={userProfile?.avatar?.url || avatar } className="card-img-top" alt="..."/>
    <div className="card-body">
        <h5 className="card-title"><strong>Name :</strong> {userProfile?.name}</h5>
        <p className="card-text"> <strong>Email :</strong> {userProfile?.email}</p>
        {myProfile._id === userProfile._id &&
          <>
           <Link to="/updateprofile" className="btn btn-primary">UpdateProfile</Link>
           <button className="btn btn-primary btn-sm ms-4" onClick={handleLogoutClick}>Logout</button>
          </>
        }
    </div>
    </div>
      </div>
      </div>

    </div>
  )
}

export default Profile
