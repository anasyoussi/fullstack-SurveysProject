import { useState } from "react";
import axiosClient from "../axios"; 

import { setCurrentUser, setUserToken } from '../Features/userSlice';
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom';

export default function Signup() {
  
  const dispatch = useDispatch();

  let navigate = useNavigate(); 

  const [fullname, setFullname] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState({ __html: '' }); 

  const loginRedirect = (e) => {
    e.preventDefault(); 
    navigate('/login');
  }

  const onChangeFullname = (e) => {
    setFullname(e.target.value); 
  }
  const onEmail = (e) => {
    setEmail(e.target.value)
  }
  const onPassword = (e) => {
    setPassword(e.target.value)
  }
  const onConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  } 

  const onSubmit = (e) => {
    e.preventDefault();  
 
    setError({ __html: '' });

    axiosClient.post('/signup', {
      name: fullname, 
      email, 
      password, 
      password_confirmation : confirmPassword,
    })
    .then((res) => {
      console.log(res); 
      // 1 - Set Current User  
      dispatch(setCurrentUser(res.data.user)); 
      // 2 - set token  
      dispatch(setUserToken(res.data.token)); 
 
       
    })
    .catch((err) => {

      console.log(err.response.data.errors);

      if(err.response){
        const finalErrors = Object.values(err.response.data.errors).reduce((accum, next) => [...accum, ...next], []) ;
        setError({ __html: finalErrors.join('<br>') }); 
      } 

    });
  } 

    return (
      <>  
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-8">
              Sign up for free 
            </h2> 
            
            {
              error.__html && (<div 
                                    className="bg-red-500 rounded py-2 px-3 my-6 text-white"
                                    dangerouslySetInnerHTML={error}
                                ></div>)
            }


            <form onSubmit={e => onSubmit(e)} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    value={fullname}
                    onChange={onChangeFullname}
                    id="fullname"
                    name="name"
                    type="text" 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

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
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password-confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirme Password
                  </label> 
                </div>
                <div className="mt-2">
                  <input
                    value={confirmPassword}
                    onChange={onConfirmPassword}
                    id="password-confirmation"
                    name="password_confirmation"
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
                  Sign up
                </button>
              </div>

              <p className="mt-10 text-center text-sm text-gray-500">
              Already a member ?{' '}
              <a href="" onClick={loginRedirect} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
              </a>
            </p> 

            </form> 
      </>
    )
  }
  