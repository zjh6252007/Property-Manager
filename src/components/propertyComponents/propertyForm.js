import React from 'react';
import { Form, Input, Select } from 'antd';
import AutocompleteInput from '../../components/googleComponents/AutocompleteInput';

const {Option} = Select

const PropertyForm = ({form}) =>{
    return(
    <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout='vertical'>
    <Form.Item
        label="Street Address"
        name="address"
        htmlFor="address"
        rules={[{ required: true, message: 'Please input the street address!' }]}
    >
    <AutocompleteInput/>
    </Form.Item>
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
        label="Unit number"
        name="unitNumber">
    <Input prefix="#"/>
    </Form.Item>
    </Form>
    )
}

export default PropertyForm