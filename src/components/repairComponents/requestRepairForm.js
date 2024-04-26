import React from 'react';
import { Form, Input,Select,Cascader} from 'antd';
const RequestRepairForm = ({form}) =>{
const {Option} = Select
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const timeSlots = [
    "8:00am - 9:00am", "9:00am - 10:00am", "10:00am - 11:00am", 
    "11:00am - 12:00pm", "12:00pm - 1:00pm", "1:00pm - 2:00pm",
    "2:00pm - 3:00pm", "3:00pm - 4:00pm", "4:00pm - 5:00pm", "5:00pm - 6:00pm"
]
const date = daysOfWeek.map(day=>({
    label:day,
    value:day,
    children:timeSlots.map(time=>({
        label:time,
        value:time
    }))
}))

return(
<Form
form = {form}
labelCol={{ span: 8 }}
wrapperCol={{ span: 16 }}
initialValues={{ remember: true }}
>
<Form.Item
  label="Description"
  name="description"
  rules={[{ required: true, message: 'Please input descripton!' }]}
>
  <Input />
</Form.Item>

<Form.Item 
label="Available Date"
name="available">
<Cascader 
options={date} multiple maxTagCount="responsive"
></Cascader>
</Form.Item>
</Form>
)
}

export default RequestRepairForm