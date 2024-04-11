import React from 'react';
import { Form, Input} from 'antd';

const TenantForm = ({form}) =>{
return(
<Form
form = {form}
labelCol={{ span: 8 }}
wrapperCol={{ span: 16 }}
initialValues={{ remember: true }}
>
<Form.Item
  label="First Name"
  name="firstName"
  rules={[{ required: true, message: 'Please input the first name!' }]}
>
  <Input />
</Form.Item>
<Form.Item
  label="Last Name"
  name="lastName"
  rules={[{ required: true, message: 'Please input the last name!' }]}
>
  <Input />
</Form.Item>
<Form.Item
  label="Email"
  name="email"
>
  <Input />
</Form.Item>
<Form.Item
  label="Phone"
  name="phone"
>
  <Input />
</Form.Item>
<Form.Item
  label="Address"
  name="address"
>
  <Input />
</Form.Item>
</Form>
)
}

export default TenantForm