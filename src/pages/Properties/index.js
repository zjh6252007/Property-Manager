import './index.scss'
import {Button,Modal,Form,Select} from 'antd';
import PropertyCard from '../../components/propertyComponents/propertyCard'
import PropertyForm from '../../components/propertyComponents/propertyForm';
import DetailForm from '../../components/propertyComponents/detailForm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyList,addProperty } from '../../store/modules/properties';

const Properties =() =>{
    const [form] = Form.useForm()
    const [isVisible,SetIsVisible] = useState(false)
    const [formData,setFormData] = useState({})
    const [isSecondFormVisible,SetIsSecondFormVisible] = useState(false)
    const dispatch = useDispatch()
    const handelCancel = () =>{
        if(isSecondFormVisible){
            SetIsSecondFormVisible(false)
        }else{
        SetIsVisible(false)
        form.resetFields()
        }
    }

    const handleOk = async() =>{
        try{
        const values = await form.validateFields()
        if(!isSecondFormVisible){
            setFormData(values)
            SetIsSecondFormVisible(true)
        }else{
        const finalData = {...formData,...values}
        const response = await dispatch(addProperty(finalData))
        SetIsVisible(false)
        SetIsSecondFormVisible(false)
        form.resetFields()
        return response}
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
    dispatch(getPropertyList())
    },[dispatch])

    const propertyInfo = useSelector(state=>state.property.propertyInfo || [])

    return( 
        <div className="property">
            <div className="title">
            Properties
                <div className='add-button'>
                    <Button type="primary" size='large' onClick={()=>SetIsVisible(true)}>Add a property</Button>
                </div>
            </div>
            <Modal title={isSecondFormVisible?"Add detail Infomation":"Add a Property"} open={isVisible} onOk={handleOk} onCancel={handelCancel}
            cancelText={isSecondFormVisible?"Back":"cancel"}
            okText={isSecondFormVisible?"Submit":"OK"}>
                {!isSecondFormVisible?(<PropertyForm form={form}/>):(<DetailForm form={form}/>)}
            </Modal>


            <div className='prop-grid'>
            {propertyInfo.map((item,index)=>{
            const address = item.address ||''
            const commaIndex = address.indexOf(',')
            let propertyAddress = ''
            let description = ''
            if(commaIndex !== -1){
                propertyAddress = item.address.substring(0,commaIndex).trim()
                description = item.address.substring(commaIndex + 1).trim()
            }else{
                propertyAddress = item.address
            }
            return(
            <PropertyCard id={item.id} key={index} title={propertyAddress} description={description}/>
            )
            })}
            </div>
        </div>
    )
}

export default Properties