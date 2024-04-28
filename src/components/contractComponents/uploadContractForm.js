import React from 'react';
import { Form, DatePicker,Upload,Input} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const UploadContractForm = ({form}) =>{

    const normFile = e =>{
        if(Array.isArray(e)){
            return e
        }
        return e && e.fileList.slice(-1)
    }

const disabledEndDate = (value) =>{
    const startValue = form.getFieldValue('startTime')
    if(!value || !startValue){
        return false
    }
    return value.isBefore(startValue,'day')
}

const disabledStartData = (value) =>{
    const endValue = form.getFieldValue('endTime')
    if(!value || ! endValue){
        return false
    }
    return value.isAfter(endValue,'day')
}
return(
<Form
form = {form}
labelCol={{ span: 8 }}
wrapperCol={{ span: 16 }}
initialValues={{ remember: true }}
>
<Form.Item label="Contract Name" name="name" rules={[{ required: true, message: 'Please Enter Contract Name ' }]}>
    <Input/>
</Form.Item>
<Form.Item label="Start Time" name="startTime" >
    <DatePicker disabledDate={disabledStartData}
    rules={[{ required: true, message: 'Please select start date!' }]}/>
</Form.Item>


<Form.Item label="End Time" name="endTime">
    <DatePicker disabledDate={disabledEndDate}
    rules={[{ required: true, message: 'Please select end date!' }]}/>
</Form.Item>

<Form.Item
    name="file"
    label="Upload Contract"
    valuePropName="fileList"
    getValueFromEvent={normFile}
    rules={[{ required: true, message: 'Please upload a PDF file!' }]}
>
    <Upload.Dragger name="file" beforeUpload={() => false} accept=".pdf">
        <p className="ant-upload-drag-icon">
            <UploadOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
            Only PDF files are accepted.
        </p>
    </Upload.Dragger>
</Form.Item>
</Form>
)}

export default UploadContractForm