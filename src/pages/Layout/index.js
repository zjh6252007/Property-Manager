import { useEffect } from "react"
import { request } from "../../utils"
import './index.scss'
import NavBar from "../../components/NavBar.js";
const Layout=()=>{
    useEffect(()=>{
        request.get('/data')
    },[])
    return(
    <div>
        <NavBar></NavBar>
    </div>
    )
}

export default Layout