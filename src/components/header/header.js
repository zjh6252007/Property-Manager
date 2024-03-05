import './header.scss'
import { Popconfirm,message } from 'antd'
import {UserOutlined,NotificationOutlined} from '@ant-design/icons'

const Header = ()=>{
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
      };
      const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };

    return(
<div className='header'>
    <div className='notification'>
    <NotificationOutlined />
    </div>
    <div className='user'>
        <div className='username'>
        Username
        </div>
        <div className='usericon'>
    <Popconfirm
        title="Log out"
        description="Are you sure to logout?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        >
            <UserOutlined/>
        </Popconfirm>
        </div>
        </div>
        
</div>
    )
}

export default Header