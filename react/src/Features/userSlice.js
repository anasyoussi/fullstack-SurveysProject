import { createSlice } from '@reduxjs/toolkit'; 
 
const initialState = {  
    UserToken: localStorage.getItem('TOKEN') || null,
    CurrentUser: {}
}; 

const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        setCurrentUser: (state, action)=>{
            state.CurrentUser = action.payload; 
        },
        setUserToken: (state, action)=>{
            state.UserToken = action.payload; 
        }, 
    }
}); 
 
export const { setCurrentUser, setUserToken } = userSlice.actions ;
export default userSlice.reducer; 