import React from 'react';
import { RouterProvider } from 'react-router-dom';
import useRoleBasedRoutes from './index'; 
import AuthHandler from './AuthHandler';
const AppRouterSetup = () => {
  const router = useRoleBasedRoutes(); 
  if(!router){
    return <div>Loading</div>
  }
  return <RouterProvider router={router}>
    <AuthHandler/>
  </RouterProvider>
};

export default AppRouterSetup;