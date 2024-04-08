import './index.scss'
import {Button,Modal,Form,Input,Select} from 'antd';
import PropertyCard from './propertyCard'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyList } from '../../store/modules/properties';
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

    const handelOk = () =>{
        SetIsVisible(false)
    }

    useEffect(()=>{
    dispatch(getPropertyList())
    },[dispatch])

    const propertyInfo = useSelector(state=>state.property.propertyInfo)

    return( 
        <div className="property">
            <div className="title">
            Properties
                <div className='add-button'>
                    <Button type="primary" size='large' onClick={()=>SetIsVisible(true)}>Add a property</Button>
                </div>
            </div>
            <Modal title="Add a property" open={isVisible} onCancel={handelCancel}>
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout='vertical'>
                    <Form.Item
                        label="Street Address"
                        name="streetAddress"
                        rules={[{ required: true, message: 'Please input the first name!' }]}
                    >
                    <Input />
                    <Form.Item
                        label="Property Type"
                        name="propertyType"
                        rules={[{required:true, message:'Please select the property type'}]}>
                    <Select placeholder="Please select a home type">
                        <Option value="House">House</Option>
                        <Option value="Townhouse">Townhouse</Option>
                        <Option value="Condo/Apartment">Condo/Apartment</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item
                        label="Unit number (if applicable)"
                        name="unitNumber">
                    <Input />
                    </Form.Item>
          </Form.Item>
                </Form>
            </Modal>
            <div className='prop-grid'>
            <PropertyCard/>
            <PropertyCard/>
            <PropertyCard/>
            <PropertyCard/>
            </div>
        </div>
    )
}

export default Properties