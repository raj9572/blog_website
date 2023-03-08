import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'
import Feed from './pages/Feed';
import LoginProtect from './components/LoginProtect';
import AddBlog from './pages/AddBlog';
import UpdateProfile from './pages/updateProfile/UpdateProfile';
import ViewBlog from './pages/ViewBlog/ViewBlog';
export const TOAST_SUCCESS = 'toast_success'
export const TOAST_FAILURE = 'toast_failure'
function App() {
  const ref = useRef(null)
  const toastData = useSelector(state => state.appConfigSlice.toastData)
  const isLoading = useSelector(state => state.appConfigSlice.isLoading)

  useEffect(() => {
    if (isLoading) {
      ref.current?.continuousStart()
    }
    else {
      ref.current?.complete()
    }
  }, [isLoading])


  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message)
        break;

      case TOAST_FAILURE:
        toast.error(toastData.message)
        break;
    }
  }, [toastData])


  return (
    <div>
      <Navbar />
      <LoadingBar color='#f11946' height={2} ref={ref} />
      <div className="container mt-5">
        <Routes >
          <Route element={<ProtectedRoute />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/addblog" element={<AddBlog />}></Route>
            <Route path="/profile/:userId" element={<Profile />}></Route>
            <Route path="/updateprofile" element={<UpdateProfile />}></Route>
            <Route path="/viewblog/:blogId" element={<ViewBlog />}></Route>
          </Route>
          </Route>
          <Route element={<LoginProtect />}>
            <Route path="/signup" toast={toast} element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
