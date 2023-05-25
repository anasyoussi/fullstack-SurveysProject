import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Features/userSlice'; 
// import tokenReducer from './Features/tokenSlice'; 
 import surveyReducer from './Features/surveySlice'; 

export const store = configureStore({
    reducer: { 
        user: userReducer,
        // token: tokenReducer,
         survey: surveyReducer,
    },
});


export default store; 