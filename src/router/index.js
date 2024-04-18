import {createBrowserRouter} from 'react-router-dom'
import MainPage from '../pages/MainPage'
import Home from '../pages/Home/index.js'
import Login from '../pages/Login/index'
import RouterAu from '../components/RouterAu'
import Register from '../pages/Register'
import Documents from '../pages/Documents'
import Profile from '../pages/Profile/index.js'
import Properties from '../pages/Properties'
import Sidebar from '../components/sidebar/sidebar.js'
import Repair from '../pages/Repair/index.js'
import Tenants from '../pages/Tenants/index.js'
import PropertyDetails from '../pages/Properties/PropertyDetails/index.js'
const router = createBrowserRouter([
    {
        path:'/',
        element:<RouterAu><MainPage/></RouterAu>,
        children:[
            {   path:'/home',
                element:<Home/>
            },
            {
                path:'/documents',
                element:<Documents/>
            },
            {
                path:'/property',
                element:<Properties/>
            },
            {
                path:'/property/:id',element:<PropertyDetails/>
            },
            {
                path:'/profile',
                element:<Profile/>
            },{
                path:'/repair',
                element:<Repair/>
            },{
                path:'/tenant',
                element:<Tenants/>
            }
        ]
    },{
        path:'/login',
        element:<Login/>
    },{
        path:'/register',
        element:<Register/>
    },{
        path:'/sidebar',
        element:<Sidebar/>
    }
])

export default router;