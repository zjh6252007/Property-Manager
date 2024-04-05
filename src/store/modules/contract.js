import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";

const contract = createSlice({
    name:"contract",
    initialState:{
        contractList:[]
    },
    reducers:{
        setContractList(state,action){
            state.contractList = action.payload
        }
    }
})

const {setContractList} = contract.actions

const getContractList = () =>{
    return async(dispatch)=>{
        const res = await request.get('/file/list')
        dispatch(setContractList(res.data))
        return res
    }
}

const downloadContract = (fileName) =>{
    return async() =>{
        const res = await request.get(`/file/presigned-url/${fileName}`)
        console.log(res.data)
        return res.data
    }
}
export {getContractList,downloadContract}

const contractRecuer = contract.reducer


export default contractRecuer