import './header.scss'
import { Popconfirm,message,Badge,Tooltip} from 'antd'
import {UserOutlined,NotificationOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo,getUserData} from '../../store/modules/user';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
const Header = ()=>{
  
    const[notification,setNotification] = useState(false)
    const[tipInfo,setTipInfo] = useState("")
    const role = useSelector(state => state.user.userInfo.role)
    useEffect(() => {
      if(role === 'owner'){
      let socket = new SockJS('https://j-propertymanage.com/ws')
      let stompClient = Stomp.over(socket)
      stompClient.connect({}, function(frame) {
          stompClient.subscribe('/topic/repairs', function(message) {
              setNotification(true)
              setTipInfo("Receive new repair request")
          })
      })
      return () => {
          stompClient.disconnect()
      }}
  }, [])
    const dispatch = useDispatch()
    const nav = useNavigate()
      const [clicked,SetClicked] = useState(false)
      const logout = () =>{
        dispatch(clearUserInfo())
        nav('/login')
        message.success('Log Out')
      }

      const nav_profile = () =>{
        nav('/profile')
      }
      useEffect(()=>{
        dispatch(getUserData())
      },[dispatch])

      const username = useSelector(state=>state.user.userInfo.username)
      const email = useSelector(state=>state.user.userInfo.email)
    return(
<div className='header'>
    <div className='notification'>
      <Badge dot={notification} offset={[-2,10]}>
      <Tooltip title={tipInfo} onVisibleChange={(visible)=>{
        if(!visible) setTipInfo('')
      }}>
    <NotificationOutlined style={{color:'white'}} onClick={()=>setNotification(false)}/>
      </Tooltip>
    </Badge>
    </div>

    <div className='user' onClick={()=>{SetClicked(!clicked)}}>
        <div className='username'>
        {username}
        </div>
        <div className='dropdown'>
            {clicked&&(
                <ul>
                    <li onClick={nav_profile}>Account Settings</li>
                    <li>
                    <Popconfirm
                    title="Log out"
                    description="Are you sure to logout?"
                    onConfirm={logout}
                    okText="Yes"
                    cancelText="No"
                    >
                    <a href="#" onClick={(e)=>e.stopPropagation()} style={{textDecoration:'none',color:'white'}}>Sign Out</a>
                    </Popconfirm>
                    </li>
                </ul>)
              }
        </div>
        <div className='usericon'>
        <UserOutlined/>
        </div>
        </div>
        
</div>
    )
}

export default Header