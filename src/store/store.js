import { configureStore } from "@reduxjs/toolkit";
import emailDraftReducer from '../slices/emailDraftSlice'
import appReducer from '../slices/appSlice'

export const store = configureStore({
    reducer : {
        emailDraft : emailDraftReducer,
        apps: appReducer
    }
})