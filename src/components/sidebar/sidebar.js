import "./sidebar.scss"
import homeIcon from "../../assets/icons/home.png"
import { navinfo } from "../../navinfo.js"
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useState } from "react"

const Sidebar = () =>{

    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname)
    const [activeIndex,setactiveIndex] = useState(location.pathname)
    const nav =(path)=>()=>{
        let navpath = path
        setactiveIndex(path)
        navigate(navpath)
    }
    return(
     <div className="sidebar">
        <div className="home-logo">
            <img src={homeIcon} alt="home logo"/>
        </div>


        <nav className="navigation">
            <ul className="nav-list">
            {navinfo.map((item,index) =>
                <li className={classNames(`nav-item`,activeIndex === item.path && 'active')} key={index} onClick={nav(item.path)}>{item.icon}{item.name}</li>
            )}
            </ul>
        </nav>
    </div>
    )
}

export default Sidebar