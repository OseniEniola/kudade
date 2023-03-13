import axios from "axios";
import { del, get, post, put } from "./api_helper.ts";
import * as url from "./url_helper.ts";

//Gets the logged in user token from local session
export const getLoggedInUser = () => {
    if(localStorage.getItem("authUser")|| ""){
        const token = JSON.parse(atob(localStorage.getItem("authUser") || ""))
        if(token)
            return token;
        return null;
    }
   
}


//AUTHENTICATION
export const loginUser = (userData:any) => get(url.LOGIN_URL,{
    auth: {
      username: userData.id,
      password: userData.zipcode
    }
  })

//Get Order Items
export const getOrderItemsAPI = (page?:any,limit?:any,query?:any) => get(`${url.ORDER_ITEMS}/?page=${page}&limit=${limit}`,{
    auth: {
      username: getLoggedInUser().sellerId,
      password: getLoggedInUser().sellerZipCodePrefix
    }
  })
// Delete Order Item
  export const deleteOrderItem = (id:any) => del(`${url.ORDER_ITEMS}/${id}`,{
    auth: {
      username: getLoggedInUser().sellerId,
      password: getLoggedInUser().sellerZipCodePrefix
    }
  })


//Update Seller info
  export const updateSellerInfoApi= (userinfo:any) => post(`${url.ACCOUNT_UPDATE}`,{},{
    auth: {
      username: getLoggedInUser().sellerId,
      password: getLoggedInUser().sellerZipCodePrefix
    }
  })
