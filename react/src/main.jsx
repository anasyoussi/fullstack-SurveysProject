import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Router  from './Router'; 
import './index.css' 
import store from './store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={Router} /> 
    </Provider>
  </React.StrictMode>,
)
