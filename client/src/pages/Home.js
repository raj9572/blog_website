import React, { useEffect } from 'react'
import Card from '../components/Card'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAllBlogs } from '../redux/feedSlice'
import { getMyProfile } from '../redux/appConfigSlice'
import { Outlet } from 'react-router-dom'
const Home = () => {
    // const blogs = useSelector(state=>state.)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getMyProfile())
    },[])

  return (
     <div>
      <Outlet/>
     </div>
  )
}

export default Home
