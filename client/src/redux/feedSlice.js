import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { TOAST_SUCCESS } from '../App'
import { axiosClient } from '../Utils/axiosClient'
import { showLoading, showToast } from './appConfigSlice'

export const fetchAllBlogs = createAsyncThunk(
    'blog/fetchAllblogs',
    async (_, thunkAPI) => {
      const response = await axiosClient.post('/blog/getallblog')
      return response.data.message.allBlogs
    }
  )
  
  export const fetchUserBlog = createAsyncThunk(
      'blog/fetchuserblog',
      async (body, thunkAPI) => {
        try {
          showLoading(true)
          const response = await axiosClient.post('/blog/getspecificblog',body)
          // console.log(response.data)
          return response.data.message
        } catch (error) {
          console.log(error)
        }
        finally{
          showLoading(false)
        }
      }
    )
export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState:{
    blog:[],
    userblog:{}
  },
  extraReducers: (builder) => {
        builder.addCase(fetchAllBlogs.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.blog = action.payload
    })
    builder.addCase(fetchUserBlog.fulfilled,(state,action)=>{
        state.userblog = action.payload
    })
  },

})

export const { increment, decrement, incrementByAmount } = feedSlice.actions

export default feedSlice.reducer