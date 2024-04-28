import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";

const contract = createSlice({
    name:"contract",
    initialState:{
        contractList:[],
        uploadStatus:'idle',
    },
    reducers:{
        setContractList(state,action){
            state.contractList = action.payload
        },
        setUploadStatus(state,action){
            state.uploadStatus = action.payload
        }
    }
})

const {setContractList,setUploadStatus} = contract.actions

const getContractList = () =>{
    return async(dispatch)=>{
        const res = await request.get('/file/list')
        dispatch(setContractList(res.data))
        return res
    }
}

const getContractListByPropertyId = (id) =>async(dispatch)=>{
    {
        try{
        const res = await request.get(`/contract/${id}`)
        dispatch(setContractList(res.data))
        }catch(error){
            console.log(error)
        }
    }
}
const downloadContract = (fileName) =>{
    return async() =>{
        const res = await request.get(`/file/presigned-url/${fileName}`)
        return res.data
    }
}

const uploadContract = (fileData,contractData) => async(dispatch) =>{
    try{
        dispatch(setUploadStatus('uploading'))
        const formData = new FormData()
        formData.append("file",fileData)

        if(contractData && typeof contractData === 'object'){
        Object.keys(contractData).forEach(key=>{
            formData.append(key,contractData[key])
        })
    }
        for(let pair of formData.entries()){
            console.log(`${pair[0]}: ${pair[1]}`)
        }
        const res = await request.post('/file/upload',formData)
        dispatch(setUploadStatus('success'))
        dispatch(getContractList())
        return res
    }catch(error)
    {
        dispatch(setUploadStatus('failed'))
        console.error(error)
        throw error
    }
}

const deleteContract = (fileName) =>{
    return async (dispatch) =>{
        const res = await request.delete(`/file/delete/${fileName}`)
        dispatch(getContractList())
        return res
    }
}
export {getContractList,downloadContract,uploadContract,deleteContract,getContractListByPropertyId}

const contractRecuer = contract.reducer


export default contractRecuer