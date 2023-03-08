import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../App'
import { showLoading, showToast } from '../redux/appConfigSlice'
import { axiosClient } from '../Utils/axiosClient'

const Signup = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [Input, setInput] = useState({ name: "", email: "", password: "" })

  const onchange = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value })

  }
  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      dispatch(showLoading(true))
      const res = await axiosClient.post('/user/signup', Input)

      if (res.data.status === 'ok') {
        dispatch(showToast({ type: TOAST_SUCCESS, message: res.data.message }))
        navigate('/login')
      }
      else {
        dispatch(showToast({ type: TOAST_FAILURE, message: res.data.message }))
      }
      dispatch(showLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(showToast({ type: TOAST_FAILURE, message: error.message }))
      dispatch(showLoading(false))
    }
  }
  return (
    <div>
      <form method='post' onSubmit={handleSignup}>
        <div className="mb-1">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name='name' onChange={onchange} className="form-control" id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-1">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name='email' onChange={onchange} className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="text" name='password' onChange={onchange} className="form-control" id="password" />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  )
}

export default Signup
