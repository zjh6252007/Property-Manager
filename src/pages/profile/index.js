import './index.scss'
import { Button,Modal,Form,Input} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { changePwd } from '../../store/modules/user';
const Profile =()=>{
    const [form] = useForm()
    const [isVisible,SetIsVisible] = useState(false)

    const showModal=()=>{
        SetIsVisible(true)
    }

    const handelCancel=()=>{
        SetIsVisible(false)
    }

    const handelOk=async()=>{
        const values = await form.validateFields()
        const response = await changePwd(values)
        console.log(response)
    }
    return (
        <div className="profile">
            <div className="title">
                Profile
            </div>
            <div className='profile-box'>
                <div className='accordion-item'>
                    <h5 className='info-title'>Name</h5>
                    <div className='info-area'>
                        <p className='info-text'>Nameinfo</p>
                        <Button className="info-button" type="primary" size='large'>Edit</Button>
                    </div>
                </div>

                <div className='accordion-item'>
                    <h5 className='info-title'>Email</h5>
                    <div className='info-area'>
                        <p className='info-text'>Emailinfo</p>
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
                rules={[{ required: true, message: 'Please Enter New Password' }]}
                >
                <Input.Password />
                </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Profile;