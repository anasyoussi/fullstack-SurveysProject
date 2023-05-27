import { useEffect, useState, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';
import QuestionEditor from './QuestionEditor'; 

const SurveyQuestions = ({ questions, onQuestionsUpdate }) => {

    // const [model, setModel] = useState({ ...survey });   
    // He used [] instead on {} in  minute: https://youtu.be/bHRe5XNP5l8?t=18189
    const [myQuestions, setMyQuestions] = useState({ ...questions });   
 
    useEffect(() => { 
        onQuestionsUpdate(myQuestions)  
    }, [myQuestions])  

    const addQuestion = (e) => {    
        setMyQuestions({
            ...myQuestions, 
            questions: 
            [
                ...myQuestions.questions, 
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
        const newQuestions = myQuestions.questions.map((q) => {
            if(q.id == question.id){
                return { ...question }
            }
            return q; 
        });  
        setMyQuestions({
            ...myQuestions, 
            questions: newQuestions
        })
    }; 
 
    const deleteQuestion = (question) => {
        const newQuestions = myQuestions.questions.filter((q) => q.id !== question.id); 
        setMyQuestions({
            ...myQuestions, 
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
            myQuestions.questions && myQuestions.questions.length 
                ? 
            (
                myQuestions.questions.map((q, ind) => (
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