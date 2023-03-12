// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";
import React from "react";
import Login from "../src/pages/login/login.tsx";
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";


function App() {
  const PublicRoutes = publicRoutes.map((route, idx) => (
    <Route
      key={idx}
      path={route.path}
      element={
        <React.Suspense fallback={''}>
          <AppRoute isAuthProtected={false} component={route.component} />
        </React.Suspense>
      }
    />
  ));
  const AuthProtectedRoutes = authProtectedRoutes.map((route, idx) => (
    <Route
      key={idx}
      exact
      path={route.path}
      element={
        <React.Suspense fallback={''}>
        <AppRoute isAuthProtected={true} component={route.component} />
      </React.Suspense>}
    > </Route>
  ));
  const router = createBrowserRouter(
    createRoutesFromElements(
     <>
      {[...PublicRoutes]}
      {[...AuthProtectedRoutes]}
      <Route path="*" element={<Login />} />
      </>
    )
  );
  return (
    
  <div>
    <RouterProvider router={router} />
    <div>
      <Toaster position="top-right" toastOptions={{style: {
     fontSize:"0.88rem",
    }}}/>
    <ConfirmDialog />
    <script src="https://unpkg.com/primereact/core/core.min.js"></script>
    <script src="https://unpkg.com/primereact/confirmdialog/confirmdialog.min.js"></script>

    <title>React App</title>
    </div>
 
    </div>
  );
}

export default App;
