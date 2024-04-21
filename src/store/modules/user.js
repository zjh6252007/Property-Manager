import { createSlice } from "@reduxjs/toolkit";
import { deleteToken, request } from "../../utils/index";
import { getToken,setToken as _setToken } from "../../utils/index";

const user = createSlice({
    name:'user',
    initialState:{
        token:getToken()||'',
        userInfo:{},
        emailVerificationMessage:''
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state,action){
            state.userInfo = action.payload
        },
        clearUserInfo(state){
            state.token=''
            deleteToken()
        },
        setEmailVerificationMessage(state,action){
            state.emailVerificationMessage = action.payload
        }
    }
})

const {setToken,setUserInfo,clearUserInfo,setEmailVerificationMessage} = user.actions

const getUserData = () => async(dispatch,getState)=>{
        const token = getState().user.token
        try{
            const res = await request.get('/user/profile',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            dispatch(setUserInfo(res.data))
        }catch(error){
            console.log(error)
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                dispatch(clearUserInfo());
        }
}
}
const postLoginData = (data) => async(dispatch)=>{
        try {
            const res = await request.post('/user/authorization', data)
            console.log(res)
            if(res.data)
            {
            dispatch(setToken(res.data))
            return true
        }
            else{
                return false
            }
        } catch (error) {
            console.error("Login failed:", error);
            return false
        }
}

const postRegisterData = async(data) =>{
    try{
        const res = await request.post('/user/register',data)
        return res
    }catch(error)
    {
        console.log(error);
        return false
    }
}

const changePwd = async(data) =>{
    const res = await request.patch('/user/changePwd',data,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    return res
}

const verfiyEmail = (token) =>async(dispatch) =>{
    const res = await request.get(`/user/verify-email?token=${token}`)
    if(res.code === 0){
    dispatch(setEmailVerificationMessage(res.data))}
    else{
        dispatch(setEmailVerificationMessage(res.message))
    }
    return res
}

const resendVerifyEmail = () =>async(dispatch) =>{
    const res = await request.get('/user/resend-verification')
    if(res.code === 0){
        dispatch(setEmailVerificationMessage(res.data))}
        else{
            dispatch(setEmailVerificationMessage(res.message))
    }
    return res
}
export {setToken,setUserInfo,getUserData,postLoginData,postRegisterData,clearUserInfo,changePwd,verfiyEmail,resendVerifyEmail}

const userReducer = user.reducer

export default userReducer