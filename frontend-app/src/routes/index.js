import React from "react";

const Login = React.lazy(()=> import('../pages/login/login.tsx'))
const Dashboard = React.lazy(()=> import('../pages/dashboard/dashboard.tsx'))


const publicRoutes = [
	//Authentication related routes
	{ path: "login", component: Login },
]
const authProtectedRoutes = [
    { path: "app/dashboard", component: Dashboard },
]


export {publicRoutes,authProtectedRoutes}