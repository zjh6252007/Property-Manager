import axios from "axios"
import { getToken } from "./index"
const request = axios.create({
    baseURL:'http://localhost:8080',
    timeout: 5000
})

request.interceptors.request.use((config)=>{
    const token = getToken()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
        console.log('Request config:', config);
    }
    return config
},(error)=>{
    return Promise.reject(error)
})

request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    return Promise.reject(error)
})

export {request}