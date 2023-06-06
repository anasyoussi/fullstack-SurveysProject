import { useEffect, useState, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';
import QuestionEditor from './QuestionEditor'; 

export default function SurveyQuestions({ questions, onQuestionsUpdate }){
 
    const [myQuestions, setMyQuestions] = useState([...questions]); 
     

    useEffect(() => {  
      setMyQuestions(questions); 
    }, [questions]); 
 
    const addQuestion = (e) => {
         
      setMyQuestions([
        ...myQuestions, 
        {
          id: uuidv4(),
          type: "text",
          question: "",
          description: "",
          data: {},
        }
      ]) 
    }
 
    const questionChange = (question)   => { 
      if(!question) return; 
      const newQuestion = myQuestions.map((q) => {
        if(q.id == question.id){
          return { ...question }
        }
        return q; 
      })
      setMyQuestions(newQuestion)
      onQuestionsUpdate(newQuestion); 
    }; 

    const deleteQuestion = (question) => { 
      const newQuestions = myQuestions.filter((q) => q.id !== question.id); 

      setMyQuestions(newQuestions); 
      onQuestionsUpdate(newQuestions); 
    };

   

  return (
    <>
        <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Questions</h3>
        <button
          type="button"
          className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
          onClick={() => addQuestion()}
        >
          <PlusIcon className="w-4 mr-2"/>
          Add question
        </button>
      </div>
     
      {  
        myQuestions.length ? (  
          myQuestions.map((q, ind) => (
              <QuestionEditor
                key={q.id}
                index={ind}
                question={q}
                questionChange={questionChange}
                addQuestion={addQuestion}
                deleteQuestion={deleteQuestion}
              />
          ))
        ) : (
          <div className="text-gray-400 text-center py-4">
            You don't have any questions created
          </div>
        )
      }
    </>
  )
}
 