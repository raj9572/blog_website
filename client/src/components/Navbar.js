import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ACCESS_KEY, getItem } from '../Utils/localStorageManager'
import avatar from '../assests/avatar.png'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const navigate = useNavigate()
    const location = useLocation()
    const myProfile = useSelector(state=>state.appConfigSlice.myProfile)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="/">Blogify</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.path === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
        
        <li className="nav-item">
          <Link className={`nav-link ${location.path === '/addblog' ? "active" : ""}`} to="/addblog">Add blog</Link>
        </li>
        
      </ul>
      <div className="d-flex">
        { !getItem(ACCESS_KEY) ? <> <div className="btn btn-primary mx-2" onClick={()=>navigate('/signup')}>signup</div>
        <div className="btn btn-primary"  onClick={()=>navigate('/login')}>Login</div></> :
          <div onClick={()=>navigate(`/profile/${myProfile._id}`)}>
         <img src={myProfile?.avatar?.url || avatar} alt="" style={{borderRadius:'50%',width:'50px'}} />
          
          </div>
        }
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
