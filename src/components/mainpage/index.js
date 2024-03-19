import { useState } from 'react'
import './index.scss'
import {ReloadOutlined,MoreOutlined,LoadingOutlined} from '@ant-design/icons'

const GridHeader = ({title,body}) =>{
    const [loading,SetLoading] = useState(false)

    return (
        <div className="common-style">
            <div className="common-header">
                {title}
                <div className='icon'>
                <ReloadOutlined onClick={()=>SetLoading(true)}/>
                <MoreOutlined />
                </div>
            </div>

            <div className='body'>
                {body}
            </div>
        </div>
    )
}

export default GridHeader