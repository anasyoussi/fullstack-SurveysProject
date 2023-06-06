import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Features/userSlice'; 
import toastReducer from "./Features/toastSlice"; 
import surveyReducer from './Features/surveySlice'; 

export const store = configureStore({
    reducer: { 
        user: userReducer,
        toast: toastReducer,
        survey: surveyReducer,
    },
});


export default store; 