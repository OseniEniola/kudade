import React, { useEffect, useState } from "react";
import { Eye } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import  {loginUser}  from "../../data/helpers/services.tsx";
import toast, { Toaster } from 'react-hot-toast';
import { isEmptyObject } from "../../data/helpers/utility.ts";
import { axiosApi } from "../../data/helpers/api_helper";


function Login() {
  const userObject = { id: "", zipcode: "" };
  const [formValues, setFormValues] = useState(userObject);
  const [formErrors, setFormErrors] = useState({} as any);
  const [isSubmit, setisSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(validateForm(formValues));
    if(isEmptyObject(validateForm(formValues))){
      signIn()
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length <= 0 && isSubmit) {
    }
  }, [formErrors]);
 

 const signIn = ()=>{
  toast.promise( loginUser(formValues),
   {
    loading:"Signing in",
    success: (res:any) => `Welcome`,
    error: `Error signing in`
   }).then((res)=>{
    console.log(res)
    let user = res
    localStorage.setItem("authUser",btoa(JSON.stringify(user)))
    navigate("/app/dashboard");
   })
 
 }

 
  const togglePassword = () => {
    var x = document.getElementById("password") as any;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const validateForm = (values: any) => {
    const error: any = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    Object.keys(values).forEach((key) => {
      if (!values[key]) {
        error[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }else {
        setisSubmit(true);
      }
    });
    return error;
  };

  return (
    <div>
   

      <div className="create_group">
        <div className="title_wrap">
          <div className="title1">Login into Application</div>
          <div className="title2">
            Please enter your seller credentials to access your account
          </div>
         
        </div>

        <div className="form_wrap">
          <form onSubmit={handleSubmit}>
            <div className="input_area">
              <label htmlFor="workmail">
                Seller ID <p className="form-error">{formErrors.id}</p>
              </label>
              <input
                id="workmail"
                className="input_wrap"
                type="text"
                name="id"
                value={formValues.id}
                onChange={handleChange}
                placeholder="3442f8959a84dea7ee197c632cb2df15"
              ></input>
            </div>

            <div className="input_area">
              <label htmlFor="password">
                Seller Zip Code Prefix <p className="form-error">{formErrors.zipcode}</p>
              </label>
              <div className="input_wrap password">
                <input
                  type="number"
                  className="password"
                  name="zipcode"
                  id="password"
                  value={formValues.zipcode}
                  onChange={handleChange}
                  placeholder="13023"
                />
              </div>
   
            </div>
            <button type="submit" className="submit">
              Log into your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
