import React from 'react';
import { Form, Input, Select } from 'antd';
const {Option} = Select

const CostForm = ({form}) =>{
    return(
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout='vertical'>
            <Form.Item
            label="Rent (Monthly)"
            name="price"
            rules={[
                {
                    pattern:new RegExp(/^\d+$/),
                    message:'Plese input numbers only'
                }
            ]}
            >
            <Input prefix='$'/>
            </Form.Item>
            <Form.Item
            label="Rental Status"
            name="state"
            rules={[{required:true}]}>
            <Select placeholder="Please select the rental status">
                <Option value="empty">Empty</Option>
                <Option value="occupied">Occupied</Option>
            </Select>
            </Form.Item>
            </Form>
    )
}

export default CostForm