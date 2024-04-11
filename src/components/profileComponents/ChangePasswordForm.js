import { Form,Input} from 'antd';

const ChangePasswordForm = ({form,pwdInfo}) =>{
    return(
    <Form
    form = {form}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    >
    <Form.Item
    label="Current Password"
    name="current_pwd"
    rules={[{ required: true, message: 'Please input Current Password' }]}
    >
    <Input.Password />
    </Form.Item>

    <Form.Item
    label="New Password"
    name="new_pwd"
    rules={[{ required: true, message: 'Please Enter New Password' },
    ()=>({
        validator(_,value){
            if(!value || (/[A-Za-z]/.test(value) && /\d/.test(value)))
            {
                return Promise.resolve()
            }
            return Promise.reject(new Error('Password must contain at least one letter and one number!'))
        }
    })]}
    >
    <Input.Password />
    </Form.Item>

    <Form.Item
    label="Confirm Password"
    name="confirm_pwd"
    dependencies={['new_pwd']}
    rules={[{ required: true, message: 'Please Enter New Password' },
    ({getFieldValue})=>({
        validator(_,value){
            if(!value || getFieldValue('new_pwd') === value){ //Confirm password must equal to new password
                return Promise.resolve()
            }
            return Promise.reject(new Error('Password does not match'))
        }
    })]}
    >
    <Input.Password />
    </Form.Item>
    <li style={{color:'red',position:'relative',left:'30px'}}>{pwdInfo}</li>
    </Form>
    )
}

export default ChangePasswordForm