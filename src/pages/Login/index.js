import { useState } from 'react'
import './index.scss'
import { useDispatch } from 'react-redux'
import {postLoginData} from '../../store/modules/user'
import { useNavigate } from 'react-router-dom'
import {message} from 'antd';

const Login=()=>{

    const[username,SetUsername] = useState('')
    const[password,SetPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handelSubmit = async(e) =>{
        e.preventDefault()
        let error = false

        if(!username.trim() || !password.trim){
            error = true
        }
        if(!error){
            const loginSuccess = await dispatch(postLoginData({username,password}))
            if(loginSuccess)
            {
            navigate('/')
            message.success('login success')
            }else{
                message.error('Wrong Username or Password')
            }        
        }
    }
    return(
        <div className='login'>
        <div className='box'>
            <form className='form' onSubmit={handelSubmit}>
                <h2>Sign in</h2>
                <div className='inputBox'>
                    <input type="text" value={username} required="required" onChange={(e)=>SetUsername(e.target.value)}/>
                    <span>Username</span>
                    <i></i>

                </div>
                <div className='inputBox'>
                    <input type="password" value={password} required="required" onChange={(e)=>SetPassword(e.target.value)}/>
                    <span>Password </span>
                    
                    <i></i>
                </div>
                <div className="links">
                    <a href="/forgetpassword">Forgot Password</a>
                    <a href="/signup">Sign Up</a>
                </div>
                <input type="submit" value="Login"></input>
            </form>
        </div>
        </div>
    )
}

export default Login