import { useDispatch } from "react-redux"
import "./index.scss"
import { getPropertyById } from "../../../store/modules/properties"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const PropertyDetails = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const [property,setProperty] = useState('')
    useEffect(()=>{
        const fetchProperty = async()=>{
            try{
                const response = await dispatch(getPropertyById(id))
                console.log(response)
                setProperty(response)
            }catch(error){
                setProperty(null)
            }
        }
        fetchProperty()
    },[id,dispatch])
    const propertyAddress = property.address || '' //create a temp varible in case address not exist 
    const address = propertyAddress.substring(0,propertyAddress.indexOf(',')) 
    const desciption = propertyAddress.substring(propertyAddress.indexOf(',') + 1).trim()
    return(
        <div className="propertyDetails">
            <div className="title">
            <p>{address}</p>
            <div className="description">
            {desciption}
            </div>
            </div>
        </div>
    )
}

export default PropertyDetails