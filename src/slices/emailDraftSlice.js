import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    emailDraft : [],
    error: null,
    status: "idle"
}

const emailDraftSlice = createSlice({
    name: "EMAIL",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default emailDraftSlice.reducer