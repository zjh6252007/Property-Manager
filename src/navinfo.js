import {HomeOutlined,FileOutlined,KeyOutlined,FolderOpenOutlined,UserOutlined} from "@ant-design/icons"

export const navinfo = [
    {name:'Home',path:'/home',icon:<HomeOutlined />,tenantVisible:false},
    {name:'Properties',path:'/property',icon:<FileOutlined/>,tenantVisible:false},
    {name:'Repair',path:'/repair',icon:<KeyOutlined/>,tenantVisible:false},
    {name:'Tenants',path:'/tenant',icon:<FolderOpenOutlined/>,tenantVisible:false},
    {name:'Documents',path:'/documents',icon:<FolderOpenOutlined/>,tenantVisible:false},
    {name:'Profile',path:'/profile',icon:<UserOutlined />,tenantVisible:true},
    {name:'Repair',path:'/tenant-repair',icon:<KeyOutlined/>,tenantVisible:true}
]
