import { useEffect, useState } from "react"
import PageComponent from "../Components/PageComponent"
import { PhotoIcon } from "@heroicons/react/24/outline";
import TButton from "../Components/core/TButton";
import axiosClient from '../axios';
import SurveyQuestions from "../Components/SurveyQuestions";
import QuestionEditor from "../Components/QuestionEditor";
import moment from "moment/moment"; 
import { useNavigate  } from 'react-router-dom';



const SurveyView = () => { 

    const [error, setError] = useState({ __html: ''});
    const [dateError, setDateError] = useState(''); 
    
    let navigate = useNavigate(); 
 

    const [survey, setSurvey] = useState({
        image: null,
        image_url: null,
        title: "", 
        description: "",
        expire_date: null,
        status: false,
        slug: "", 
        questions: []
    });

    
  
    const onImageChoose = (e) => {
      const file = e.target.files[0]; 
      const reader = new FileReader();
      reader.onload = () => {
        setSurvey({
          ...survey,
          image: file,
          image_url: reader.result,
        }); 
        e.target.value = ""; 
      }
      reader.readAsDataURL(file); 
    }

    const onSubmit = (e) => {
      e.preventDefault();    
      const payload = { ...survey }; 
      if(payload.image){
        payload.image = payload.image_url ;
      }
      delete payload.image_url;  
      axiosClient.post('/survey', payload )
      .then(res => {
        console.log(res)
        navigate('/surveys')
      })
      .catch(err => { 
        if(err.response){
          const finalErrors = Object.values(err.response.data.errors).reduce((accum, next) => [...accum, ...next], []) ;
          setError({ __html: finalErrors.join('<br>') }); 
        } 
      })
    }     

    const ValidateDate = (e) => { 
      if(moment(e.target.value).isValid()){ 
        setSurvey({ 
          ...survey, 
          expire_date: e.target.value 
        }) 
      }else{
        setDateError('Enter Valid Date!');
      }
    }

    function onQuestionsUpdate(data){  
      setSurvey({ ...survey, questions: data.questions }); 
    }   

    // console.log(survey); 

  return (
    <PageComponent title="Survey">
          {
              error.__html && (<div className="bg-red-500 rounded py-2 px-3 my-6 text-white" dangerouslySetInnerHTML={error}></div>)
          }
       <form action="#" method="POST" onSubmit={onSubmit}> 
         <div className="shadow sm:overflow-hidden sm:rounded-md"> 

            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                {/* Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="">
                        Photo
                    </label>
                    <div className="mt-1 flex items-center">
                        {
                            survey.image_url && (
                                <img src={survey.image_url} alt="" className="w-32 h-32 object-cover"/>
                            )
                        }
                        {!survey.image_url && (
                            <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                <PhotoIcon className="w-8 h-8"/>
                            </span> 
                        )}
                        <button type="button" className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm 
                                       font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none
                                       focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <input
                                type="file"
                                className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                onChange={onImageChoose}
                            />
                            change
                        </button>
                    </div> 
                </div>
                {/* Image */}


                {/*Title*/}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Survey Title
                </label>

                <input type="text" name="title" id="title"
                  value={survey.title ?? ''} 
                  onChange={(e) => { setSurvey({ ...survey, title: e.target.value }) }}
                  placeholder="Survey Title"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                /> 
              </div>
              {/*Title*/}


               {/*Description*/}
               <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
                <textarea
                  value={survey.description || ""}
                  onChange={(e) =>
                    setSurvey({ ...survey, description: e.target.value })
                  }
                  name="description"
                  id="description" 
                  placeholder="Describe your survey"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`} 
                ></textarea> 
              </div>
              {/*Description*/}

              {/*Expire Date*/}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="expire_date" className="block text-sm font-medium text-gray-700">Expire Date</label>
                <input
                  value={survey.expire_date ?? new Date().toJSON().slice(0, 10)} 
                  onChange={(e) => {setSurvey({ ...survey, expire_date: e.target.value })}}
                  type="date"
                  name="expire_date"
                  id="expire_date"  
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                />
              </div> 
              {/*Expire Date*/}



              {/*Active*/}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    value={survey.status ?? 'false'} 
                    onChange={(e) => { setSurvey({ ...survey, status: e.target.checked }) }}
                    id="status"
                    name="status"
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-700"
                  >
                    Active
                  </label>
                  <p className="text-gray-500">
                    Whether to make survey publicly available
                  </p>
                </div>
              </div> 
              {/*Active*/}

              <SurveyQuestions questions={survey} onQuestionsUpdate={onQuestionsUpdate} /> 
               
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <TButton>Save</TButton>
            </div> 

         </div>
       </form>
    </PageComponent>
  )
}

export default SurveyView