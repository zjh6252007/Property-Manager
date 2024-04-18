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
          state.propertyInfo = [...state.propertyInfo,action.payload]
        },
        updatePropertyInfo(state,action){
            const {id,data} = action.payload
            const index = state.propertyInfo.findIndex(property => property.id === id)
            if (index !== -1){
                state.propertyInfo[index] = {...state.propertyInfo[index],...data}
            }
        }
    }
})

const {setPropertyInfo,addPropertyInfo,updatePropertyInfo} = properties.actions

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
    console.log(res.data)
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

const modifyProperty = (id,data) =>async(dispatch)=>{
    try{
        const res = await request.put(`/properties/modify/${id}`,data,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        dispatch(updatePropertyInfo({id,data:res.data}))
        return res
    }catch(error){
        console.log(error)
    }
}

const getPropertyById = (id) =>async()=>{
    try{
        const res = await request.get(`properties/${id}`)
        return res.data
    }catch(error){
        console.log(error)
    }
}
export {getPropertyList,addProperty,deleteProperty,modifyProperty,getPropertyById}

const propertiesReducer = properties.reducer

export default propertiesReducer