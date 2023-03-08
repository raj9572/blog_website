import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../Utils/axiosClient'

export const getUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (body, thunkAPI) => {
      const response = await axiosClient.post('/user/getuserprofile',body)
      return response.data.message
    }
  )

export const userSlice = createSlice({
  name: 'userSlice',
  initialState:{
      userProfile:{}
  },
  extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile= action.payload
        
    })
  },

})


export default userSlice.reducer