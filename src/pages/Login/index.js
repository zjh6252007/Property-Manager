import { useState } from 'react'
import './index.scss'

const Login=()=>{
    const[username,SetUsername] = useState('')
    const[password,SetPassword] = useState('')

    const handelSubmit = (e) =>{
        e.preventDefault()
        let error = false

        if(!username.trim() || !password.trim){
            error = true
        }
        if(!error){
            console.log('success',{username,password})
        }
    }
    return(
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
                    <a href="#">Forgot Password</a>
                    <a href="#">Sign Up</a>
                </div>
                <input type="submit" value="Login"></input>
            </form>
        </div>
    )
}

export default Login