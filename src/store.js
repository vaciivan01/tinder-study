import { configureStore } from "@reduxjs/toolkit";
import hideReducer from './hideSlice'

export const store = configureStore({
    reducer: {
        hide: hideReducer,
        questions: hideReducer
    }
});