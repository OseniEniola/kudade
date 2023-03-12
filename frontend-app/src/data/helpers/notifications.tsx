

import toast from "react-hot-toast";

export const sucessToast=(msg:any)=>{toast.success(msg)}

export const errorToast=(msg:any)=>{toast.error(msg)}

export const promiseToast=(promiseMethod:any) =>{
    toast.promise(promiseMethod,{
        loading:"loading",
        success: null,
        error: null
    })
}