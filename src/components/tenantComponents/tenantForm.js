import React from 'react';
import { Form, Input,Select} from 'antd';
const TenantForm = ({form,propertyInfo}) =>{
  const {Option} = Select
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
  rules={[
    {
        type:'email',
        message:'The input is not valid E-mail'
    }
  ]}
>
  <Input />
</Form.Item>
<Form.Item
  label="Phone"
  name="phone"
  rules={[
    {
        pattern:new RegExp(/^[0-9]{10}$/),
        message:'Please input a valid phone number'
    }
  ]}
>
  <Input />
</Form.Item>
<Form.Item
label="Address"
name="address">
<Select placeholder="Select">
  <Option value=""></Option>
  {propertyInfo.map(property=>(
    <Option key={property.id} value={property.address}>{property.address}</Option>
  ))}    
  </Select>
</Form.Item>
</Form>
)
}

export default TenantForm