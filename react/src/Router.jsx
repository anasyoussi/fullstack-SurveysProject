import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Surveys from "./Views/Surveys";
import Dashboard from "./Views/Dashboard";
import GuestLayout from './Components/GuestLayout'; 
import DefaultLayout from "./Components/DefaultLayout";
import SurveyView from "./Views/SurveyView";

const Router = createBrowserRouter([  
    {
        path: '/', 
        element: <Navigate to='dashboard'/>
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            } ,
            {
                path: 'signup',
                element: <Signup />
            } ,
        ]
    } ,
    {
        path: '/',
        element: <DefaultLayout />,
        children: [  
            {
                path: 'surveys',
                element: <Surveys />
            } ,
            {
                path: 'surveys/create',
                element: <SurveyView />
            } ,
            {
                path: 'dashboard',
                element: <Dashboard />
            } ,
        ]
    }
]);

export default Router; 