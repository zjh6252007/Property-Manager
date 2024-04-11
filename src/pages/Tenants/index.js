import React, { useEffect, useState } from 'react';
import { Space,Popconfirm,Table, Button ,Modal,Form,Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TenantForm from '../../components/tenantComponents/tenantForm';
import { getTenantData,postTenantData,deleteTenantData,modifyTenantData } from '../../store/modules/tenant';
import './index.scss'
import { useForm } from 'antd/es/form/Form';
const Tenants = () =>{

const [isVisible,SetIsVisible] = useState(false)
const [isEditing,SetIsEditing] = useState(false)
const [editingTenant,setEditingTenant] = useState(null)
const dispatch = useDispatch()
const [form] = useForm()

const handleDelete = (id) =>{ //Delete the user by id
    dispatch(deleteTenantData(id))
}

const handleModify = (tenant) =>{ //modify user
  SetIsEditing(true)
  setEditingTenant(tenant)
  showModal(tenant)
}

const showModal = (tenant = null) =>{ //show the form when user click the modify or add tenant button
  SetIsVisible(true)
  if(tenant){ //if modify then auto fill the info from form
    form.setFieldsValue(tenant)
  }else{// if add tenant then show the empty form
    form.resetFields()
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
    title:'Telephone',
    dataIndex:'phone',
    key:'phone'
  },{
    title:'Action',
    key:'action',
    render:(_,record) =>(
        <Space size="middle">
        <Popconfirm
            description="Confirm to delete"
            onConfirm={()=>handleDelete(record.id)}>
        <Button>Delete</Button>
        </Popconfirm>
        <Button onClick={()=>handleModify(record)}>Modify</Button>
        </Space>
    )
  }
];

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

    useEffect(()=>{
        dispatch(getTenantData())
    },[dispatch])

const tenantData = useSelector(state => state.tenant.tenantInfo)

return(
    <div className='tenant'>
        <div className='tenant-form'>
          <div className='title'>
            Tenants
            <div className='add-button'>
            <Button type="primary" onClick={showModal} size='large'>Add tenant</Button>
            </div>
          </div>
            <Table columns={columns} dataSource={tenantData} rowKey="id"/>  
        </div>
        <Modal title="Add tenant" open={isVisible} onOk={handelOk} onCancel={handelCancel}>
          <TenantForm form={form}/>
        </Modal>
    </div>

    )

}
export default Tenants;