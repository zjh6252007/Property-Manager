import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";

const tenant = createSlice({
    name:'tenant',
    initialState:{
        tenantInfo:[]
    },
    reducers:{
        setTenantInfo(state,action){
            state.tenantInfo = action.payload
        },
        addTenantInfo(state,action){
            state.tenantInfo.push(action.payload)
        },
        updateTenantInfo(state,action){
            const {id,data} = action.payload
            const index = state.tenantInfo.findIndex(tenant => tenant.id === id)
            if(index !== -1){
                state.tenantInfo[index] = {...state.tenantInfo[index],...data}
            }
        }
    }
})

const {setTenantInfo,addTenantInfo,updateTenantInfo} = tenant.actions

const getTenantData = () => async(dispatch) => {
    const res = await request.get('/tenant/getAll')
    dispatch(setTenantInfo(res.data))
    return res
}

const postTenantData =(data) => async(dispatch) =>{
    try{
        const res = await request.post('/tenant/add',data,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        dispatch(addTenantInfo(res.data))
        console.log(res.data)
        return res
    }catch(error)
    {
        console.log(error);
        return error
    }
}

const deleteTenantData = (id) => async(dispatch,getState)=>{
        try{
            await request.delete(`/tenant/delete/${id}`)
            const currentTenants= getState().tenant.tenantInfo
            const updatedTenants = currentTenants.filter(tenant=>tenant.id !== id)
            dispatch(setTenantInfo(updatedTenants))
        }catch(error)
        {
            console.log(error)
        }
}

const modifyTenantData = (id,data) => async(dispatch) =>{
    try{
        const res = await request.put(`/tenant/modify/${id}`,data,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        dispatch(updateTenantInfo({id,data:res.data}))
        return res
    }catch(error){
        console.log(error)
        return false
    }
}

const getTenantById = (id) => async()=>{
    try{
        const res = await request.get(`/tenant/${id}`)
        return res.data
    }catch(error){
        console.log(error)
    }
}

const getTenantsByPropertyId=(id)=>async(dispatch)=>{
    try{
        const res = await request.get(`/tenant/getTenant/${id}`)
        dispatch(setTenantInfo(res.data))
        return res
    }catch(error){
        console.log(error)
    }
}
export {getTenantData,postTenantData,deleteTenantData,modifyTenantData,getTenantById,getTenantsByPropertyId}

const tenantReducer = tenant.reducer

export default tenantReducer