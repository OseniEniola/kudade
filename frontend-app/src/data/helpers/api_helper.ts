import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';


const axiosApi = axios.create({
    baseURL:'http://localhost:8080'
})




axiosApi.interceptors.response.use(
    (response: AxiosResponse) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    (err: AxiosError) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      const status = err.response?.status || 500;
      // we can handle global errors here
      switch (status) {
        // authentication (token related issues)
        case 401: 
            toast.error(err.message)
            localStorage.removeItem("authUser")
           // window.location.reload()
            break;
  
        // forbidden (permission related issues)
        case 403: 
            toast.error(err.message)
            break;
  
        // bad request
        case 400: 
            toast.error(err.message)
            break;
  
        // not found
        case 404: 
            toast.error(err.message)
            break;
  
        // conflict
        case 409: 
            toast.error(err.message)
            break;
  
        // unprocessable
        case 422: 
            toast.error(err.message)
            break;
  
        // generic api error (server related) unexpected
        default: 
            toast.error(err.message)
            break;

      }
      return Promise.reject(err)
    }
  );

// error => {
//     if(error.response.status == 401){
//         toast.error("error.response.data.message");
//         localStorage.removeItem("authUser");
//     }
//     // if(error.response.data.message){
//     //     toast.error(error.response.data.message)
//     // }else{
//     //     toast.error(error.response.data.msg.message)
//     // }
    
// }
export  {axiosApi}
export async function get(url:any, config = {}) {
    return await axiosApi.get(url,config).then(response => response.data)
}

export async function post(url:any,data:any,config = {}) {
    return await axiosApi.post(url,data,{...config}).then((response:AxiosResponse) =>response)
}

export async function put(url:any,data:any,config = {}) {
    return await axiosApi.put(url,data,{...config}).then(response =>response)
}
export async function del(url:any,config = {}) {
    return await axiosApi.delete(url,{...config}).then(response =>response)
}