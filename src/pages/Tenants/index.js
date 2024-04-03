import React, { useEffect, useState } from 'react';
import { Space,Popconfirm,Table, Button ,Modal,Form,Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
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
            <div className='add-button'>
            <Button type="primary" onClick={showModal} size='large'>Add tenant</Button>
            </div>
            <Table columns={columns} dataSource={tenantData} rowKey="id"/>  `dsasd`
        </div>
        <Modal title="Add tenant" open={isVisible} onOk={handelOk} onCancel={handelCancel}>
        <Form
          form = {form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input the first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
          >
            <Input />
          </Form.Item>
        </Form>
        </Modal>
    </div>

    )

}
export default Tenants;