import './index.scss'
import {Button,Modal,Form,Input,Select} from 'antd';
import PropertyCard from '../../components/propertyComponents/propertyCard'
import PropertyForm from '../../components/propertyComponents/propertyForm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyList,addProperty } from '../../store/modules/properties';
import AutocompleteInput from '../../components/googleComponents/AutocompleteInput';
const Properties =() =>{
    const [form] = Form.useForm()
    const [isVisible,SetIsVisible] = useState(false)
    const [confirmVisible,SetConfirmVisible] = useState(false)
    const [formData,SetFormData] = useState({})
    const dispatch = useDispatch()
    const { Option } = Select
    const handelCancel = () =>{
        SetIsVisible(false)
    }

    const handleOk = async() =>{
        try{
        const values = await form.validateFields()
        const response = await dispatch(addProperty(values))
        SetIsVisible(false)
        form.resetFields()
        return response}
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
            <Modal title="Add a property" open={isVisible} onOk={handleOk} onCancel={handelCancel}>
                <PropertyForm form={form}/>
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