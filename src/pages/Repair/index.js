import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRepairList } from "../../store/modules/repair"
const Repair = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getRepairList())
    },[dispatch])

    const repairList = useSelector(state=> state.repair.repairList)
    console.log(repairList)
    return(
        <div className="repair">
            Service & Repair
        </div>
    )
}

export default Repair