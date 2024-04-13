import React,{useState,useEffect} from "react"
import { getToken } from "../utils"
import {Navigate} from 'react-router-dom'
import {Modal} from 'antd'

function RouterAu({children}){
    const token = getToken()
    const [isVisible,SetIsVisible] = useState(false)

    useEffect(()=>{
        if(!token){
            SetIsVisible(true)
        }
    },[token])

    const handleOk=()=>{
        SetIsVisible(false)
    }

    if(token){
        return <>{children}</>
    }else{
       return(
        <>
        <Modal title="Session Expired" open={isVisible} onOk={handleOk}>
        <p>You session has expired.Please login again.</p>
        </Modal>
       <Navigate to={'/login'} replace/>
       </>
       )
    }
}

export default RouterAu