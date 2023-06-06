import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios';
import PublicQuestionView from '../Components/PublicQuestionView';


const SurveyPublicView = () => { 

  const answers = {}; 

  const [surveyFiniched, setSurveyFiniched] = useState(false); 

  const [loading, setLoading] = useState({
    question: []
  }); 

  const [ survey, setSurvey ] = useState({}); 
  const { slug } = useParams(); 
 
    
    useEffect(() => {
      setLoading(true); 
        axiosClient.get(`/survey/get-by-slug/${slug}`)
        .then(({data}) => { 
          setLoading(false); 
            setSurvey(data.data) ;
        })
        .catch(() => {
          setLoading(false)
        }); 
    }, []);   

    function onSubmit(e){
      e.preventDefault(); 
      console.log(answers) 


      axiosClient
      .post(`/survey/${survey.id}/answer`, {
        answers,
      })
      .then((response) => { 
        console.log(response); 
        setSurveyFiniched(true);
      });
    }
  

    function answerChanged(question, value){
      answers[question.id] = value; 
    }  

  return (
    <div className='px-11 pt-10'>

        {loading && <div class='text-center flex items-center justify-center h-screen overflow-hidden'>Loading..</div>}
        {!loading && (
          <form onSubmit={e => onSubmit(e)} className='container mx-auto p-4'>
           
 
                {
                  surveyFiniched  && (
                    <div className='py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto'> 
                        Thank you for participating in the survey
                    </div> 
                )}

                {
                  !surveyFiniched && (
                    <>

          <div>
            <div className='grid grid-cols-6'>
              <div className='mr-4'>
                <img src={ survey.image } alt="" />
              </div>
              <div className='col-span-5'>
                <h1 className='text-3xl mb-3'>Expire Date: { survey.title }</h1>  
                <p className='text-gray-500 text-sm'>{ survey.expire_date }</p>
                <p>{ survey.description }</p>
              </div>
            </div>
                    <div>
                      { survey.questions.map((q, i) => (
                        <PublicQuestionView 
                            key={q.id} 
                            question={q} index={i} 
                            answerChanged={(val) => answerChanged(q, val)}
                        />
                      ))}
                    </div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>
                    </div>
                    </>
                  )
                }


            
            
          </form>        
        )}

        
    </div>
  )
}

export default SurveyPublicView