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
        }
    }
})

const {setRepairList} = repair.actions

const getRepairList = () =>async(dispatch) =>{
    try{
        const res = await request.get('/repair-requests/getAll')
        dispatch(setRepairList(res.data))
    }catch(error){
        console.log(error)
    }
}

export {getRepairList}
const repairReducer = repair.reducer
export default repairReducer