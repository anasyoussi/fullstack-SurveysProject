import { createSlice } from '@reduxjs/toolkit'; 
 
const initialState = {    
    message: null, 
    show: false 
}; 
 
const toastSlice = createSlice({
    name: 'toast',
    initialState, 
    reducers: {
        setToast: (state, action)=>{ 
            state.toast = action.payload; 
        }, 
    }
}); 
 
export const { setToast } = toastSlice.actions ;
export default toastSlice.reducer; 