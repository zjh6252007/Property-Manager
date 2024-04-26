import React from 'react';
import { RouterProvider } from 'react-router-dom';
import useRoleBasedRoutes from './index'; 

const AppRouterSetup = () => {
  const router = useRoleBasedRoutes();  
  if(!router){
    return <div>Loading</div>
  }
  return <RouterProvider router={router} />;
};

export default AppRouterSetup;