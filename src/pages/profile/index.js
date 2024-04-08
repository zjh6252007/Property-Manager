import './index.scss'
import { Button} from 'antd';
import { useForm } from 'antd/es/form/Form';
const Profile =()=>{
    const form = useForm()
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
                        <Button className="info-button" type="primary" size='large'>Change Password</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;