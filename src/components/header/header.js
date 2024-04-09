import './header.scss'
import { Popconfirm,message } from 'antd'
import {UserOutlined,NotificationOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo,getUserData} from '../../store/modules/user';
import { useNavigate } from 'react-router-dom';
const Header = ()=>{
    const dispatch = useDispatch()
    const nav = useNavigate()
      const cancel = (e) => {
        message.error('Click on No')
      }
      const [clicked,SetClicked] = useState(false)
      
      const logout = () =>{
        dispatch(clearUserInfo())
        nav('/login')
        message.success('Log Out')
      }

      useEffect(()=>{
        dispatch(getUserData())
      },[dispatch])

      const username = useSelector(state=>state.user.userInfo.username)
      const email = useSelector(state=>state.user.userInfo.email)
    return(
<div className='header'>
    <div className='notification'>
    <NotificationOutlined />
    </div>

    <div className='user' onClick={()=>{SetClicked(!clicked)}}>
        <div className='username'>
        {username}
        </div>
        <div className='dropdown'>
            {clicked&&(
                <ul>
                    <li>Account Settings</li>
                    <li onClick={logout}>Sign Out</li>
                </ul>)
}
        </div>
        <div className='usericon'>
        <Popconfirm
        title="Log out"
        description="Are you sure to logout?"
        onConfirm={logout}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        >
            <UserOutlined/>
        </Popconfirm>
        </div>
        </div>
        
</div>
    )
}

export default Header