import { useState } from "react";
import { postRegisterData } from "../../store/modules/user";
import {message} from 'antd';
import { useNavigate } from "react-router-dom";

const Register =() =>{
    const [username,SetUsername] = useState('')
    const [password,SetPassword] = useState('')
    const [confirmPassword,SetConfirmPassword] = useState('')
    const [email,SetEmail] = useState('')
    const [error,SetError] = useState('')
    const nav = useNavigate()
    const validateUsername = (username) =>{
        const rules = /[^a-zA-Z0-9]/
        return rules.test(username)
    }

    const validatePassword = (password) =>{
        const rules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        return rules.test(password)
    }

    const validateEmail = (email) =>{
        const rules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return rules.test(email)
    }

    
    const handleUsername = (e) =>{
        const input = e.target.value
        SetUsername(input)
        if(validateUsername(input)){
            SetError('Invalid Username')
        }else{
            SetError('')
        }
    }

    const handlePassword = (e) =>{
        const input = e.target.value
        SetPassword(input)
        if(!validatePassword(input)){
            SetError('Invalid Password: Password must contain at least 1 letter and number')
        }else{
            SetError('')
        }
    }
    const handleEmail = (e) =>{
        const input = e.target.value
        SetEmail(input)
        if(!validateEmail(input)){
            SetError('Invalid Email')
        }else{
            SetError('')
        }
    }
    const handelSubmit = async(e) =>{
        e.preventDefault()
    
        if(password !== confirmPassword)
        {
            SetError('Password doesnt match')
            return
        }

        if(error === ""){
            try{
            const registerResponse = await postRegisterData({username,password,email})
            nav('/login')
            console.log(registerResponse)
            if(registerResponse.code === 1)
            {
                message.error(registerResponse.message)
            }
            else{
            SetError(registerResponse.message)
            }}catch(error){
                console.error('Registration error:',error)
            }
        }
    }
    return(
        <div className="register">
            <div className="box">
                <form className="form" name="register" onSubmit={handelSubmit}>
                    <h2>Register</h2>
                    <div className="inputBox">
                    <input type="text" value={username} required={true} onChange={handleUsername}></input>
                    <span>Username</span>
                    <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" value={password} required={true} onChange={handlePassword}></input>
                        <span>Password</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" value={confirmPassword} required={true} onChange={(e)=>SetConfirmPassword(e.target.value)}></input>
                        <span>Confirm password</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="text" value={email} required={true} onChange={handleEmail}></input>
                        <span>Email</span>
                        <i></i>
                    </div>

                    {error && <div className="error">{error}</div>}
                    <input type="submit" value="Register"></input>
                </form>
            </div>
        </div>
    )
}

export default Register;