import React, { useEffect, useState } from 'react';
import { Space,Popconfirm,Table, Button ,Modal,Form,Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTenantData,postTenantData,deleteTenantData } from '../../store/modules/tenant';
import './index.scss'
import { useForm } from 'antd/es/form/Form';
const Tenants = () =>{

const [isVisible,SetIsVisible] = useState(false)
const dispatch = useDispatch()
const [form] = useForm()

const handleDelete = (id) =>{
    dispatch(deleteTenantData(id))
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

        <Popconfirm
            description="Confirm to delete"
            onConfirm={()=>handleDelete(record.id)}>
        <Button>Modify</Button>
        </Popconfirm>
        </Space>
    )
  }
];


const showModal = () =>{
    SetIsVisible(true)
}
const handelOk = async() =>{
    try{
        const values = await form.validateFields()
        const response = await dispatch(postTenantData(values))
        if(response){
            console.log(response)
            SetIsVisible(false)
            form.resetFields()
        }
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
            <Table columns={columns} dataSource={tenantData} rowKey="id"/>
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