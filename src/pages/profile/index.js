import './index.scss'
import { Button,Modal,Form,Input,message} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { changePwd } from '../../store/modules/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChangePasswordForm from '../../components/profileComponents/ChangePasswordForm';
import { CheckCircleTwoTone,ExclamationCircleTwoTone} from '@ant-design/icons';
import { resendVerifyEmail } from '../../store/modules/user';

const Profile =()=>{
    const [form] = useForm()
    const nav = useNavigate()
    const [isVisible,SetIsVisible] = useState(false)
    const [pwdInfo,SetPwdInfo] = useState('')
    const email = useSelector(state=>state.user.userInfo.email)
    const username = useSelector(state=>state.user.userInfo.username)
    const verified = useSelector(state=>state.user.userInfo.emailVerified)
    const [messageApi, contextHolder] = message.useMessage();
    const emailVerificationMessage = useSelector(state=>state.user.emailVerificationMessage)

    const dispatch = useDispatch()

    const handleClick=() =>{
        dispatch(resendVerifyEmail()).then((res)=>{
            if(res.code === 0){
                message.success('Verification email sent successfully.')
            }else{
                message.error(res.message)
            }
        })
    }
    const showModal=()=>{
        SetIsVisible(true)
    }

    const handelCancel=()=>{
        SetPwdInfo('')
        form.resetFields()
        SetIsVisible(false)
    }

    const handelOk=async()=>{
        try{
        const values = await form.validateFields()
        const response = await changePwd(values)
        SetPwdInfo(response.message)
        if(response.code === 0){
        message.success('change password succes')
        SetPwdInfo('')
        SetIsVisible(false)
        form.resetFields()
        nav('/login')}}
        catch(error){
            console.log(error)
        }
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
                        <div className='info-text'>
                          <p>{email}</p>
                          <div className='email-verify'>
                            {
                                verified?
                                <p><CheckCircleTwoTone twoToneColor="#52c41a" />Email is verified.</p>
                                :
                                <p><ExclamationCircleTwoTone twoToneColor="#ff0000"/> Email not verified.</p>
                            }
                          </div>
                        </div>
                        <div className='email-button'>
                        {!verified?
                        <Button className='resend-button' type='primary' size='large' onClick={handleClick}>Resend</Button>:<></>
                        }
                        </div>
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
                <ChangePasswordForm form={form} pwdInfo={pwdInfo}/>
            </Modal>
        </div>
    )
}

export default Profile;