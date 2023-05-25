import axios from "axios"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const token = '';

const axiosComponent = () => {
    let navigate = useNavigate()	;
    const token = useSelector(store => store.token.UserToken);   
} 
    const axiosClient = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL_BASE}/api`,
    });

    axiosClient.interceptors.request.use((config) => { 
        config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
        return config; 
    });

    axiosClient.interceptors.response.use(response => {
        return response;  
    }, error => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem('TOKEN'); 
            navigate.push("/login"); 
            // window.location.reload(); 
            // router.navigate('/login'); 
            return error; 
        }
        throw error; 
    }); 
 

export default axiosClient; 