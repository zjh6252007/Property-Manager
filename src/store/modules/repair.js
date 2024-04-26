import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";

const repair = createSlice({
    name:'repair',
    initialState:{
        repairList:[]
    },
    reducers:{
        setRepairList(state,action){
            state.repairList = action.payload
        },
        addRepairList(state,action){
            state.repairList.push(action.payload)
        }
    }
})

const {setRepairList,addRepairList} = repair.actions

const getRepairList = () =>async(dispatch) =>{
    try{
        const res = await request.get('/repair-requests/getAll')
        dispatch(setRepairList(res.data))
    }catch(error){
        console.log(error)
    }
}

const postRepairRequest=(data) =>async(dispatch)=>{
    try{
        const res = await request.post('/repair-requests/create',data)
        dispatch(addRepairList(res.data))
        return res
    }catch(error){
        console.log(error)
    }
}

const getTenantRepairList = () =>async(dispatch) =>{
    try{
        const res = await request.get('/repair-requests/tenant/getAll')
        dispatch(setRepairList(res.data))
        return res
    }catch(error){
        console.log(error)
    }
}

const updateStatus = (id,data) =>async(dispatch) =>{
    try{
        const res = await request.put(`/repair-requests/updateStatus/${id}`,data,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        dispatch(getRepairList())
        return res
    }catch(error){
        console.log(error)
    }
}
export {getRepairList,postRepairRequest,getTenantRepairList,updateStatus}
const repairReducer = repair.reducer
export default repairReducer