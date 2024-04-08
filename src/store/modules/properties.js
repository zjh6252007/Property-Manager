import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";

const properties = createSlice({
    name:"properties",
    initialState:{
        propertyInfo:[]
    },
    reducers:
    {
        setPropertyInfo(state,action){
            state.propertyInfo = action.payload
        }
    }
})

const {setPropertyInfo} = properties.actions

const getPropertyList = () =>{
    return async(dispatch)=>{
        const res = await request.get('/properties/getAll')
        dispatch(setPropertyInfo(res.data))
        return res.data
    }
}

export {getPropertyList}

const propertiesReducer = properties.reducer

export default propertiesReducer