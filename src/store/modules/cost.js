import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";

const cost = createSlice({
    name:"cost",
    initialState:{
        costList:[]
    },
    reducers:{
        setCostList(state,action){
            state.costList = action.payload
        }
    }
})

const {setCostList} = cost.actions

const getCostListById = (id) =>async(dispatch)=>{
    const res = await request.get(`/cost/getCost/${id}`)
    dispatch(setCostList(res.data))
    return res
} 

export{getCostListById}

const costReducer = cost.reducer
export default costReducer