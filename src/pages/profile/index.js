import './index.scss'
import { Button,Modal,Form,Input,message} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { changePwd } from '../../store/modules/user';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Profile =()=>{
    const [form] = useForm()
    const nav = useNavigate()
    const [isVisible,SetIsVisible] = useState(false)
    const [pwdInfo,SetPwdInfo] = useState('')
    const email = useSelector(state=>state.user.userInfo.email)
    const username = useSelector(state=>state.user.userInfo.username)
    const showModal=()=>{
        SetIsVisible(true)
    }

    const handelCancel=()=>{
        SetPwdInfo('')
        form.resetFields()
        SetIsVisible(false)
    }

    const handelOk=async()=>{
        const values = await form.validateFields()
        const response = await changePwd(values)
        SetPwdInfo(response.message)
        if(response.code === 0){
        message.success('change password succes')
        SetPwdInfo('')
        SetIsVisible(false)
        form.resetFields()
        nav('/login')}
    }
    return (
        <div className="profile">
            <div className="title">
                Profile
            </div>
            <div className='profile-box'>
                <div className='accordion-item'>
                    <h5 className='info-title'>User Name</h5>
                    <div className='info-area'>
                        <p className='info-text'>{username}</p>
                        
                    </div>
                </div>

                <div className='accordion-item'>
                    <h5 className='info-title'>Email</h5>
                    <div className='info-area'>
                        <p className='info-text'>{email}</p>
                        <Button className="info-button" type="primary" size='large'>Edit</Button>
                    </div>
                </div>

                <div className='accordion-item'>
                    <h5 className='info-title'>Password</h5>
                    <div className='info-area'>
                        <Button className="info-button" type="primary" size='large' onClick={showModal}>Change Password</Button>
                    </div>
                </div>
            </div>
            <Modal title="Change Password" open={isVisible} onOk={handelOk} onCancel={handelCancel}>
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
            </Modal>
        </div>
    )
}

export default Profile;