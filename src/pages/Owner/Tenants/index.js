import React, { useEffect, useState } from 'react';
import { Space,Popconfirm,Table, Button ,Modal,message, Spin, Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TenantForm from '../../../components/tenantComponents/tenantForm';
import { getTenantData,postTenantData,deleteTenantData,modifyTenantData } from '../../../store/modules/tenant';
import './index.scss'
import { useForm } from 'antd/es/form/Form';
import { sendInviteLink } from '../../../store/modules/user';
import { getPropertyList } from '../../../store/modules/properties';
const Tenants = () =>{

const [isVisible,SetIsVisible] = useState(false)
const [isEditing,SetIsEditing] = useState(false)
const [editingTenant,setEditingTenant] = useState(null)
const [searchText,setSearchText] = useState('')
const [isActive,setIsActive] = useState(false)
const dispatch = useDispatch()
const [form] = useForm()
const [isPageLoading,setIsPageLoading] = useState(false)

const isLoaded = useSelector(state=>state.property.isLoaded)
    useEffect(()=>{
      const fetchData=async()=>{
        setIsPageLoading(true)
        await dispatch(getTenantData())
        if(!isLoaded){
          await dispatch(getPropertyList())
        }
        setIsPageLoading(false)
      }
      fetchData()
    },[dispatch,isLoaded])
    
    const tenantData = useSelector(state => state.tenant.tenantInfo)
    const propertyInfo = useSelector(state=>state.property.propertyInfo)
const handleDelete = (id) =>{ //Delete the user by id
    dispatch(deleteTenantData(id))
}

const handleModify = (tenant) =>{ //modify user
  SetIsEditing(true)
  setEditingTenant(tenant)
  showModal(tenant)
}

const sendLink = (id) =>{
  dispatch(sendInviteLink(id)).then((res)=>{
    if(res.code === 0){
      message.success('Link sent successfully.')
    }else{
      message.error(res.message)
    }
  })
}

const showModal = (tenant = null) =>{ //show the form when user click the modify or add tenant button
  SetIsVisible(true)
  if(tenant){ //if modify then auto fill the info from form
    form.setFieldsValue(tenant)
    setIsActive(tenant.active)
  }else{// if add tenant then show the empty form
    form.resetFields()
    setIsActive(false)
  }
}
const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key:'firstName'
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key:'lastName'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key:'address'
  },
  {
    title:'Email',
    dataIndex:'email',
    key:'email'
  },
  {
    title:'Telephone',
    dataIndex:'phone',
    key:'phone'
  }
  ,{
    title:'Action',
    key:'action',
    render:(_,record) =>(
        <Space size="middle">
        <Popconfirm
            description="Confirm to delete"
            onConfirm={()=>handleDelete(record.id)}>
        <Button disabled={record.active}>Delete</Button>
        </Popconfirm>
        <Button onClick={()=>handleModify(record)}>Modify</Button>
        <Popconfirm
            description="Confirm to send a register link. You can't delete the tenant after register."
            onConfirm={()=>sendLink(record.id)}>
        <Button hidden={record.active}>Invite to Register</Button>
        </Popconfirm>
        </Space>
    )
  }
]

const handelOk = async() =>{
    try{
        const values = await form.validateFields()
        if(isEditing && editingTenant){ //Depends on current state,it editing then call modify function
          const response = await dispatch(modifyTenantData(editingTenant.id,values))
          if(response){
            console.log(response)
          }
        }else{
          const response = await dispatch(postTenantData(values))
          if(response){
              console.log(response)
          }
        }
        SetIsVisible(false)
        SetIsEditing(false)
        setEditingTenant(null)
        form.resetFields()
    }catch(error){
        console.log(error)
    }
}

const handelCancel=()=>{
    SetIsVisible(false)
}

const handelSearch = (e) =>{
  setSearchText(e.target.value)
}
const filteredData = tenantData.filter(tenant =>
    tenant.firstName?.toLowerCase().includes(searchText.toLowerCase())||
    tenant.lastName?.toLowerCase().includes(searchText.toLowerCase())||
    tenant.phone?.includes(searchText))
return(
    <div className='tenant'>
      <Spin spinning={isPageLoading}>
        <div className='tenant-form'>
          <div className='title'>
            Tenants
            <div className='add-button'>
            <Button type="primary" onClick={showModal} size='large'>Add tenant</Button>
            </div>
          </div>
          <Input placeholder="Search by Name or Phone" onChange={handelSearch} style={{height:40, width: 200,marginBottom:10}} />
            <Table columns={columns} dataSource={filteredData} rowKey="id"/>  
        </div>
        <Modal title="Add tenant" open={isVisible} onOk={handelOk} onCancel={handelCancel}>
          <TenantForm form={form} propertyInfo={propertyInfo} isActive={isActive}/>
        </Modal>
        </Spin>
    </div>

    )

}
export default Tenants;