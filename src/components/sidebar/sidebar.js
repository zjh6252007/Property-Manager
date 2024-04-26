import "./sidebar.scss"
import homeIcon from "../../assets/icons/home.png"
import { navinfo } from "../../navinfo.js"
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { useState } from "react"
import { useSelector } from "react-redux"

const Sidebar = () =>{

    const navigate = useNavigate()
    const location = useLocation()
    const [activeIndex,setactiveIndex] = useState(location.pathname)
    const role = useSelector(state => state.user.userInfo.role)
    const nav =(path)=>()=>{
        setactiveIndex(path)
        navigate(path)
    }

    const filterNav = navinfo.filter(item=>{
        return role === 'tenant' ? item.tenantVisible : !item.tenantVisible
    })

    return(
     <div className="sidebar">
        <div className="home-logo">
            <img src={homeIcon} alt="home logo" onClick={()=>nav('/home')()}/>
        </div>


        <nav className="navigation">
            <ul className="nav-list">
            {filterNav.map((item,index) =>
                <li className={classNames(`nav-item`,activeIndex === item.path && 'active')} key={index} onClick={nav(item.path)}>{item.icon}{item.name}</li>
            )}
            </ul>
        </nav>
    </div>
    )
}

export default Sidebar