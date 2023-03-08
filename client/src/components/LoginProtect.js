import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ACCESS_KEY, getItem } from '../Utils/localStorageManager'

const LoginProtect = () => {
    return (
        <div>
            {getItem(ACCESS_KEY) ? <Navigate to='/' /> : <Outlet />}
        </div>
    )
}

export default LoginProtect
