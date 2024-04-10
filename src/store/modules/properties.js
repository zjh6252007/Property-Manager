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
        },
        addPropertyInfo(state,action){
          state.propertyInfo.push(action.payload)  
        }
    }
})

const {setPropertyInfo,addPropertyInfo} = properties.actions

const getPropertyList = () => async(dispatch)=>{
        const res = await request.get('/properties/getAll')
        dispatch(setPropertyInfo(res.data))
        return res.data
}

const addProperty = (data) => async(dispatch)=>{
    try{
    const res = await request.post('/properties/add',data,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    dispatch(addPropertyInfo(res.data))
    return res
    }
    catch(error){
        console.log(error)
    }
}

const deleteProperty = (id) =>async(dispatch)=>{
    try{
        const res = await request.delete(`/properties/delete/${id}`)
        dispatch(getPropertyList())
        return res
    }catch(error){
        console.log(error)
    }
}
export {getPropertyList,addProperty,deleteProperty}

const propertiesReducer = properties.reducer

export default propertiesReducer