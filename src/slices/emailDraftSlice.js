import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    emailDraft : null,
    error: null,
    status: "idle"
}

export const generateEmailDraft = createAsyncThunk('generateEmail', async ({emailSectionName,emailSubSectionName,customerName,appName}) => {
    const response = await axios.post('https://email-draft-generator-backend.vercel.app/api/getEmailDraftWithName',{emailSectionName,emailSubSectionName,customerName,appName})
    return response.data
})

const emailDraftSlice = createSlice({
    name: "EMAIL",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(generateEmailDraft.pending, (state) => {
            state.status = "loading"
        })
        .addCase(generateEmailDraft.fulfilled, (state,action) => {
            state.status = "success"
            state.emailDraft = action.payload
        })
        .addCase(generateEmailDraft.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default emailDraftSlice.reducer