import PageComponent from "../Components/PageComponent"
import SurveyListItem from "../Components/SurveyListItem";
import { v4 as uuidv4 } from 'uuid';
import TButton from "../Components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosClient from "../axios"; 
import { useNavigate } from "react-router-dom";
// import PaginationLinks from "../Components/PaginationLinks"; 
import { toast } from 'react-toastify';

import { lazy, Suspense } from 'react'

const Surveys = () => { 

  let navigate = useNavigate(); 

  // const surveys  = useSelector(store => store.survey.Surveys);   
       
  const [surveys, setSurveys] = useState([]); 
  const [meta, setMeta] = useState({}); 
  const [loading, setLoading]  = useState(false); 


  // use lazy loading to solve problem of undifined meta.links error: 
  const Paginate = lazy(() => import('../Components/PaginationLinks'));
  
  const onPageClick = (link) => {
    let { url } = link; 
    // console.log(url)
    getSurveys(url); 
  }

  const getSurveys = (url) => { 
    url = url || '/survey';     
    setLoading(true);   
    axiosClient.get(url).then(({ data }) => {   
      setSurveys(data.data);  
      setLoading(false);  
      setMeta(data.meta)
    });

  }
   
  useEffect(() => {  
    getSurveys(); 
  }, []);  
 
  const notify = (message) => toast(message);

  const onDeleteClick = (id) => {
    console.log(id); 
    if(window.confirm('Are u sure ?')){
      axiosClient.delete(`/survey/${id}`)
      .then(() => {
        getSurveys();   
        notify("Deleted Successfully !"); 
      });  
    }  
  } 
  

  return (
    <PageComponent title="Surveys"
        buttons={(
          <TButton color="green" to="/surveys/create">
            <PlusCircleIcon className="h-6 w-6 mr-1" />
            Create new
          </TButton>
        )}
    >
      {
        loading && <div className="text-center text-lg">Loading ...</div>
      }

      {
        !loading && <div>
        <div id={uuidv4()} className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {
            surveys && surveys.map(survey => (
              <SurveyListItem survey={survey} uuidv4Key={uuidv4()} onDeleteClick={onDeleteClick}/>
            ))
          }
        </div>
          <Suspense>
              <Paginate meta={meta} onPageClick={onPageClick} />
          </Suspense>
        </div>
      }

    </PageComponent>
  )
}

export default Surveys