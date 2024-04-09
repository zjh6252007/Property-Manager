import { createSlice } from "@reduxjs/toolkit";
import { deleteToken, request } from "../../utils/index";
import { getToken,setToken as _setToken } from "../../utils/index";

const user = createSlice({
    name:'user',
    initialState:{
        token:getToken()||'',
        userInfo:{}
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
        }
    }
})

const {setToken,setUserInfo,clearUserInfo} = user.actions

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
export {setToken,setUserInfo,getUserData,postLoginData,postRegisterData,clearUserInfo,changePwd}

const userReducer = user.reducer

export default userReducer