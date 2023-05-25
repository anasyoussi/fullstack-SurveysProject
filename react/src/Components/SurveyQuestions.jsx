import { useEffect, useState, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';
import QuestionEditor from './QuestionEditor'; 

const SurveyQuestions = ({ survey, onSurveyUpdate }) => {

    const [model, setModel] = useState({ ...survey });   
 
    useEffect(() => { 
        onSurveyUpdate(model)  
    }, [model])  

    const addQuestion = (e) => {    
        setModel({
            ...model, 
            questions: 
            [
                ...model.questions, 
                {
                    id: uuidv4(),
                    type: 'text',
                    question: '',
                    description: '',
                    data: {}
                }
            ]
        })   
    }     
    
    const questionChange = (question) => { 
        if(!question) return; 
        const newQuestions = model.questions.map((q) => {
            if(q.id == question.id){
                return { ...question }
            }
            return q; 
        });  
        setModel({
            ...model, 
            questions: newQuestions
        })
    }; 
 
    const deleteQuestion = (question) => {
        const newQuestions = model.questions.filter((q) => q.id !== question.id); 
        setModel({
            ...model, 
            questions: newQuestions,
        });
    }  

  return (
    <>
        <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Questions</h3>
            <button
                type="button" 
                className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"  
                onClick={addQuestion}
            >   
                <PlusIcon className="w-4 mr-2" />
                Add New Question
            </button> 
        </div> 
        {
            model.questions && model.questions.length 
                ? 
            (
                model.questions.map((q, ind) => (
                    <QuestionEditor 
                        key={q.id}
                        index={ind}
                        question={q}
                        questionChange={questionChange}
                        addQuestion={addQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))
            ) 
                : 
            (
                <h4 className="text-center text-gray-400">No questions yet!</h4>
            )
        }
    </>
  )
}

export default SurveyQuestions