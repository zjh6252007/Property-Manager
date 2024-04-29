import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import MainPage from '../pages/MainPage'
import Home from '../pages/Owner/Home/index.js'
import Login from '../pages/Login/index'
import RouterAu from '../components/RouterAu'
import Register from '../pages/Register'
import Documents from '../pages/Owner/Documents/index.js'
import Profile from '../pages/Profile/index.js'
import Properties from '../pages/Properties'
import Sidebar from '../components/sidebar/sidebar.js'
import Repair from '../pages/Owner/Repair/index.js'
import Tenants from '../pages/Owner/Tenants/index.js'
import PropertyDetails from '../pages/Properties/PropertyDetails/index.js'
import Verify from '../pages/Verfiy/index.js'
import TenantRegister from '../pages/Register/tenantRegister.js'
import TenantRepair from '../pages/Tenant/Repair/index.js'
import MyHome from '../pages/Tenant/Home/index.js'
import { useSelector } from 'react-redux'


const useRoleBasedRoutes = () => {
    const role = useSelector(state => state.user.userInfo.role)
    const routes = [
        {
            path: '/',
            element: <RouterAu><MainPage /></RouterAu>,
            children: role === 'tenant' ? [
                {path:'/myHome',element:<MyHome/>},
                { path: '/tenant-repair',element:<TenantRepair/>},
                { path: '/profile', element: <Profile /> }
            ] : [
                { path: '/home', element: <Home /> },
                { path: '/documents', element: <Documents /> },
                { path: '/property', element: <Properties /> },
                { path: '/property/:id', element: <PropertyDetails /> },
                { path: '/profile', element: <Profile /> },
                { path: '/repair', element: <Repair /> },
                { path: '/tenant', element: <Tenants /> },
                { path: '/tenant-repair',element:<TenantRepair/>},
                {path:'/myHome',element:<MyHome/>}
            ]
        },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/sidebar', element: <Sidebar /> },
        { path: '/user/verify-email', element: <Verify /> },
        { path: '/register/tenant', element: <TenantRegister /> }
    ];

    return createBrowserRouter(routes);
};

export default useRoleBasedRoutes
