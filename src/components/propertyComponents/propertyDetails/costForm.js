import React from 'react';
import { Form, Input, Select ,DatePicker} from 'antd';
const {Option} = Select

const CostForm = ({form}) =>{
    return(
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout='vertical'>
            
            <Form.Item label="Description" name="description" rules={[{required:true}]}>
            <Input/>
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{required:true}]}>
            <DatePicker />
            </Form.Item>

            <Form.Item
            label="Cost"
            name="cost"
            rules={[
                {
                    pattern:new RegExp(/^\d+(\.\d*)?$/),
                    message:'Plese input numbers only',
                    required:true
                }
            ]}
            >
            <Input prefix='$' style={{width:'100px'}}/>
            </Form.Item>
            </Form>
    )
}

export default CostForm