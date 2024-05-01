import axios from "axios"
import { getToken,deleteToken } from "./index"
const request = axios.create({
    baseURL:'https://54.172.6.160:443',
    timeout: 5000
})

request.interceptors.request.use((config)=>{
    const token = getToken()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},(error)=>{
    return Promise.reject(error)
})

request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    if(error.response && error.response.status === 401 || error.response.status === 403){
        deleteToken()
        window.dispatchEvent(new CustomEvent('unauthorized', { detail: {} }))
    }
    return Promise.reject(error)
})

export {request}