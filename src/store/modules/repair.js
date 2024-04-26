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
        dispatch(addRepairList())
        return res
    }catch(error){
        console.log(error)
    }
}
export {getRepairList,postRepairRequest}
const repairReducer = repair.reducer
export default repairReducer