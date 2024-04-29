import React from 'react';
import { Form,Select} from 'antd';
const ChangeStatusForm = ({form}) =>{
  const {Option} = Select
return(
<Form
form = {form}
labelCol={{ span: 8 }}
wrapperCol={{ span: 16 }}
initialValues={{ remember: true }}
>

<Form.Item
label="Status"
name="status"
rules={[{ required: true, message: 'Please Select the Status.' }]}>
<Select placeholder="Select">
  <Option value="Open">Open</Option>
  <Option value="Pending">Pending</Option>
  <Option value="Close">Close</Option>
  </Select>
</Form.Item>
</Form>
)
}

export default ChangeStatusForm