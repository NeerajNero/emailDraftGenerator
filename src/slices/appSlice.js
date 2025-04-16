import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    ios: [],
    android: [],
    error: null,
    status: "idle"
}

export const getAppDataByPlatform = createAsyncThunk('/AppData', async({platform}) => {
    const response = await axios.get(`https://email-draft-generator-backend.vercel.app/apps/getAppData/${platform}`)
    console.log(response.data)
    return response.data
})

const appSlice = createSlice({
    name: "APPS",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAppDataByPlatform.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getAppDataByPlatform.fulfilled, (state,action) => {
            state.status = "success"
            if(action.payload.appsData[0].platform === "IOS"){
                state.ios = action.payload.appsData
            }else if(action.payload.appsData[0].platform === "ANDROID"){
                state.android = action.payload.appsData
            }
        })
        .addCase(getAppDataByPlatform.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default appSlice.reducer