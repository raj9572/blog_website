import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ACCESS_KEY, getItem } from '../Utils/localStorageManager'

const ProtectedRoute = () => {
  return (
    <div>
      {getItem(ACCESS_KEY) ? <Outlet/> : <Navigate to='/login'/>}
    </div>
  )
}

export default ProtectedRoute
