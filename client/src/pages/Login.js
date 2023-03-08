import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../App'
import { showLoading, showToast } from '../redux/appConfigSlice'
import { axiosClient } from '../Utils/axiosClient'
import { ACCESS_KEY,  setItem } from '../Utils/localStorageManager'

const Login = () => {

  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [Input, setInput] = useState({ email: "", password: "" })

  const onchange = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value })

  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(showLoading(true))
      const res = await axiosClient.post('/user/login', Input)
      console.log(res)
      if (res.data.status === 'ok') {
        dispatch(showToast({ type: TOAST_SUCCESS, message: res.data.message.message }))
        setItem(ACCESS_KEY,res.data.message.accessToken)
        navigate('/')
      }
      else {
        dispatch(showToast({ type: TOAST_FAILURE, message: res.data.message }))
      }
      dispatch(showLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(showToast({ type: TOAST_FAILURE, message: error }))
      dispatch(showLoading(false))
    }
  }
  return (
    <div>
     <form method='post' onSubmit={handleLogin}>
      <div className="mb-1">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" name='email' onChange={onchange} className="form-control" id="email" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-1">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" name='password' onChange={onchange} className="form-control" id="password"/>
      </div>
      
      <button type="submit" className="btn btn-primary" onSubmit={handleLogin}>Login</button>
    </form>
    </div>
  )
}

export default Login
