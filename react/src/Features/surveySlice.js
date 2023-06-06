import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {  
    QuestionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    Surveys: [], 
}; 

//  "image_url": "https://picsum.photos/200/300", 

const surveySlice = createSlice({
    name: 'survey',
    initialState, 
    reducers: { 
        getSurveys: (state, action)=>{
          state.Surveys.push(action.payload); 
        },
        deleteSurvey: (state, action)=>{
            state.Surveys = []; 
        }, 
    }
}); 

export const { getSurveys, deleteSurvey } = surveySlice.actions ;
export default surveySlice.reducer; 



