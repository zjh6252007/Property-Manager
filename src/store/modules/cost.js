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
        },
        addCostList(state,action){
            state.costList.push(action.payload)
        }
    }
})

const {setCostList,addCostList} = cost.actions

const getCostListById = (id) =>async(dispatch)=>{
    const res = await request.get(`/cost/getCost/${id}`)
    dispatch(setCostList(res.data))
    return res
} 

const addCost = (data) =>async(dispatch)=>{
    try{
    const res = await request.post('/cost/add',data,{
        headers:{
            'Content-Type':'application/json'
            }
        }
    )
    dispatch(addCostList(res.data))
    return res}catch(error){
        console.log(error)
    }
}

const deleteCost = (costid,propertyId) =>async(dispatch)=>{
    try{
        const res = await request.delete(`/cost/delete/${costid}`)
        dispatch(getCostListById(propertyId))
    }catch(error)
    {
        console.log(error)
    }
}
export{getCostListById,addCost,deleteCost}

const costReducer = cost.reducer
export default costReducer