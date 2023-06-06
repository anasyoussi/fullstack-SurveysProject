import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { setToast } from '../Features/toastSlice';

const Toast = () => { 
    
    const toast = useSelector(store => store.toast);  
    
  return (
   <>
    {
        toast.show && (<div className='py-2 px-3 text-white rounded bg-emerald-500 fixed right-4 bottom-8'>
            {toast.message}
        </div>)
    }
   </>
  )
}

export default Toast