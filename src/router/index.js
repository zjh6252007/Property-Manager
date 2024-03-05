import {createBrowserRouter} from 'react-router-dom'
import MainPage from '../pages/MainPage'
import Login from '../pages/Login/index'
import RouterAu from '../components/RouterAu'
import Register from '../pages/Register'
import Documents from '../pages/Documents'
import Applications from '../pages/Applications'
import Properties from '../pages/Properties'
import Sidebar from '../components/sidebar/sidebar.js'
const router = createBrowserRouter([
    {
        path:'/',
        element:<RouterAu><MainPage/></RouterAu>,
        children:[
            {
                path:'/documents',
                element:<Documents/>
            },
            {
                path:'/listings',
                element:<Properties/>
            },
            {
                path:'/contact',
                element:<Applications/>
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