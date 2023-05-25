import { useSelector } from "react-redux"
import PageComponent from "../Components/PageComponent"
import SurveyListItem from "../Components/SurveyListItem";
import { v4 as uuidv4 } from 'uuid';
import TButton from "../Components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const Surveys = () => {
  const surveys = useSelector(store => store.survey.Surveys);   



  const onDeleteClick = () => {
    console.log("On delete Click"); 
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
      <div id={uuidv4()} className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {
        surveys && surveys.map(survey => (
          <SurveyListItem survey={survey} uuidv4Key={uuidv4()} onDeleteClick={() => onDeleteClick()}/>
        ))
      }
      </div>
    </PageComponent>
  )
}

export default Surveys