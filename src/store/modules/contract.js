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

const downloadContract = (fileName) =>{
    return async() =>{
        const res = await request.get(`/file/presigned-url/${fileName}`)
        return res.data
    }
}

const uploadContract = (fileData) => async(dispatch) =>{
    try{
        dispatch(setUploadStatus('uploading'))
        const formData = new FormData()
        formData.append("file",fileData)
        const res = await request.post('/file/upload',formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
        })
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
export {getContractList,downloadContract,uploadContract}

const contractRecuer = contract.reducer


export default contractRecuer