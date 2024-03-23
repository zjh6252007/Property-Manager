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
        }
    }
})

const {setTenantInfo,addTenantInfo} = tenant.actions

const getTenantData = () =>{
    return async(dispatch) =>{
        const res = await request.get('/tenant/getAll')
        dispatch(setTenantInfo(res.data))
        return res
    }
}

const postTenantData =(data) => async(dispatch) =>{
    try{
        const res = await request.post('/tenant/add',data,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        dispatch(addTenantInfo(res.data))
        return res
    }catch(error)
    {
        console.log(error);
        return false
    }
}

const deleteTenantData = (id) =>{
    return async(dispatch)=>{
        try{
            await request.delete(`/tenant/delete/${id}`)
            dispatch(getTenantData())
        }catch(error)
        {
            console.log(error)
        }
    }
}
export {getTenantData,postTenantData,deleteTenantData}

const tenantReducer = tenant.reducer
export default tenantReducer