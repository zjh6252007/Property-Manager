import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils/index";
import { getToken,setToken as _setToken } from "../../utils/index";
const user = createSlice({
    name:'user',
    initialState:{
        token:getToken()||''
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload
            _setToken(action.payload)
        }
    }
})

const {setToken} = user.actions


const postLoginData = (data) => {
    return async (dispatch) => {
        try {
            const res = await request.post('/authorization', data)
            console.log(res); 
            if(res.token)
            {dispatch(setToken(res.token))
            return true}
            else{
                return false
            }
        } catch (error) {
            return false;
        }
    };
};

export {setToken,postLoginData}

const userReducer = user.reducer

export default userReducer