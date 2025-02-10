import { configureStore } from "@reduxjs/toolkit";
import emailDraftReducer from '../slices/emailDraftSlice'

export const store = configureStore({
    reducer : {
        emailDraft : emailDraftReducer
    }
})