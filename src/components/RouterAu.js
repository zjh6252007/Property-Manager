import { getToken } from "../utils";
import {Navigate} from 'react-router-dom'
function RouterAu({children}){
    const token = getToken()
    if(token){
        return <>{children}</>
    }else{
       return <Navigate to={'/login'} replace/>
    }
}

export default RouterAu