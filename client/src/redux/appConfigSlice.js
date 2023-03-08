import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../Utils/axiosClient'

export const getMyProfile = createAsyncThunk(
  'users/getmyprofile',
  async (_, thunkAPI) => {
    showLoading(true)
    const response = await axiosClient('user/getmyprofile')
    showLoading(false)
    return response.data.message
  }
)

export const appConfigSlice = createSlice({
  name: 'appSlice',
  initialState:{
    isLoading:false,
    toastData:{},
    myProfile:{}
  },
  reducers: {
    showToast: (state,action) => {
      state.toastData=action.payload
    },
    showLoading:(state,action)=>{
      state.isLoading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload
    })
  },


})

// Action creators are generated for each case reducer function
export const { showToast,showLoading } = appConfigSlice.actions

export default appConfigSlice.reducer