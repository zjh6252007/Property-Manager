import axios from "axios"
import { getToken,deleteToken } from "./index"
import { createBrowserHistory } from "@remix-run/router"
const request = axios.create({
    baseURL:'http://localhost:8080',
    timeout: 5000
})

const history = createBrowserHistory();
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
    if(error.response && error.response.status === 401){
        deleteToken()
        history.push('/login')
    }
    return Promise.reject(error)
})

export {request}