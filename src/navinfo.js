import {HomeOutlined,FileOutlined,KeyOutlined,FolderOpenOutlined,UserOutlined} from "@ant-design/icons"

export const navinfo = [
    {name:'Home',path:'/home',icon:<HomeOutlined />,visibleFor:'owner'},
    {name:'Properties',path:'/property',icon:<FileOutlined/>,visibleFor:'owner'},
    {name:'Repair',path:'/repair',icon:<KeyOutlined/>,visibleFor:'owner'},
    {name:'Tenants',path:'/tenant',icon:<FolderOpenOutlined/>,visibleFor:'owner'},
    {name:'Documents',path:'/documents',icon:<FolderOpenOutlined/>,visibleFor:'owner'},
    {name:'Home',path:'/myHome',icon:<HomeOutlined/>,visibleFor:'tenant'},
    {name:'Repair',path:'/tenant-repair',icon:<KeyOutlined/>,visibleFor:'tenant'},
    {name:'Profile',path:'/profile',icon:<UserOutlined />,visibleFor:'both'}
]
