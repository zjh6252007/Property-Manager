import { useEffect } from "react"
import { verfiyEmail } from "../../store/modules/user"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
const Verify=() => {
    const emailVerificationMessage = useSelector(state=>state.user.emailVerificationMessage)
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(()=>{
        const params = new URLSearchParams(location.search)
        const token = params.get('token')
        if(token)
        {
            dispatch(verfiyEmail(token))
        }
    },[location,dispatch])
    
    return(
        <div>
            {emailVerificationMessage}
        </div>
    )
}

export default Verify