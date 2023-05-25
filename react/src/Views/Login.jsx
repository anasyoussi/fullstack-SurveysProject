import { useState } from "react";
import axiosClient from "../axios"; 

import { useNavigate } from 'react-router-dom';

import { setCurrentUser, setUserToken } from '../Features/userSlice';
import { useDispatch } from 'react-redux'


export default function Login() {

  let navigate = useNavigate(); 
  
  const dispatch = useDispatch(); 
  
  const [error, setError] = useState({ __html: '' });  

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  const signupRedirect = (e) => {
    e.preventDefault(); 
    navigate('/signup');
  }


  const onEmail = (e) => {
    setEmail(e.target.value)
  }
  const onPassword = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();    
    setError({ __html: '' }); 
    
    axiosClient.post('/login', {
        email: email, 
        password: password, 
    })
    .then((res) => {
        console.log(res);   
        // 1 - Set Current User  
        dispatch(setCurrentUser(res.data.user)); 
        // 2 - set token  
        dispatch(setUserToken(res.data.token));  
    })
    .catch((err) => { 
      // console.log(err.response.data.error);  
      // console.log(err.response.data.errors); 
      if(err.request.response){
        // const finalErrors = Object.values(err.response.data.error).reduce((accum, next) => [...accum, ...next], []) ;
        setError({ __html: err.response.data.error }); 
      } 
      
    });
  }  
  // console.log(error); 
  return (
      <> 
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-8">
              Sign in to your account
            </h2> 

            {
              error.__html && (<div 
                                    className="bg-red-500 rounded py-2 px-3 my-6 text-white"
                                    dangerouslySetInnerHTML={error}
                                ></div>)
            }

            <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={onEmail}
                    id="email"
                    name="email"
                    type="email" 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={onPassword}
                    id="password"
                    name="password"
                    type="password" 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="" onClick={signupRedirect} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register
              </a>
            </p> 
      </>
    )
  }
  