import { useDispatch, useSelector } from "react-redux"
import "./index.scss"
import { getPropertyById } from "../../../store/modules/properties"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Space,Popconfirm,Table, Button ,Modal,message,Upload} from 'antd';
import { useForm } from "antd/es/form/Form"
import CostForm from "../../../components/propertyComponents/propertyDetails/costForm"
import { getCostListById,addCost,deleteCost } from "../../../store/modules/cost"
import TenantFormWithoutAddress from "../../../components/tenantComponents/tenantFormWithoutAddress"
import { postTenantData,deleteTenantData,modifyTenantData,getTenantsByPropertyId } from "../../../store/modules/tenant"
import { sendInviteLink } from "../../../store/modules/user"
import UploadContractForm from "../../../components/contractComponents/uploadContractForm"
import { uploadContract } from "../../../store/modules/contract"
const PropertyDetails = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()

    const property = useSelector(state=>state.property.selectProperty)
    const costList = useSelector(state=>state.cost.costList)
    const [isActive,setIsActive] = useState(false)
    const [isEditing,SetIsEditing] = useState(false)
    const [editingTenant,setEditingTenant] = useState(false)

    //Create state for the visiable of tenant,contract,cost form
    const [isTenantFormVisible,setIsTenantFormVisible] = useState(false)
    const [isVisible,SetIsVisible] = useState(false)
    const [isContractFormVisible,setIsContractFormVisible] = useState(false)

    //Create Form for tenants,contract,cost
    const [addCostForm] = useForm()
    const [addTenantForm] = useForm()
    const [addContractForm] = useForm()

    //formatDate for the date in cost form
    const formatDate = (date) =>{
      return new Date(date).toLocaleDateString('en-CA')
    }
    const formattedCostList = costList.map(cost=>({
      ...cost,date:formatDate(cost.date)
    }))

//body of tenant,contract,cost form
    const tenantsForm = [
      {
        title: 'Name',
        dataIndex: 'name',
        key:'name'
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
      } ,{
        title:'Action',
        key:'action',
        width:100,
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

    const contractForm = [
      {
        title: 'Contract Name',
        dataIndex: 'name',
        key:'name'
      },
      {
          title: 'Start Date',
          dataIndex: 'start_date',
          key:'start_date'
        },
        {
          title: 'End Date',
          dataIndex: 'end_date',
          key:'end_date'
        },
      {
        title:'Action',
        key:'action',
        render:(_,record) =>(
            <Space size="middle">
            </Space>
        )
      }
    ]

    const costForm = [
      {
        title: 'Description',
        dataIndex: 'description',
        key:'description'
      },
      {
        title:'Date',
        dataIndex:'date',
        key:'date',
        sorter:(a,b) =>new Date(a.date) - new Date(b.date),
        sortDirections:['descend','ascend']
      },
      {
          title:'Cost',
          dataIndex:'cost',
          key:'cost',
          render:(text)=>`$${text.toFixed(2)}`,
          sorter:(a,b) => a.cost-b.cost,
          sortDirections:['descend','ascend']
      },{
        title:'Action',
        key:'action',
        render:(_,record) =>(
          <Space size="middle">
          <Popconfirm
              description="Confirm to delete"
              onConfirm={()=>deleteCostForm(record.id)}>
          <Button>Delete</Button>
          </Popconfirm>
          </Space>
        )
      }
    ]

    //use property id get property info, cost info ,tenant info
    useEffect(()=>{
      dispatch(getPropertyById(id))
      dispatch(getCostListById(id))
      dispatch(getTenantsByPropertyId(id))
},[id,dispatch])

  const tenantData = useSelector(state => state.tenant.tenantInfo)
  const formattedData = tenantData.map(tenant=>({
    ...tenant,
    name:`${tenant.firstName} ${tenant.lastName}`
  }))

    const propertyAddress = property.address || '' //create a temp varible in case address not exist 
    const address = propertyAddress.substring(0,propertyAddress.indexOf(',')) 
    const desciption = propertyAddress.substring(propertyAddress.indexOf(',') + 1).trim()

//function to modify tenant form
  const handleModify = (tenant) =>{ 
    SetIsEditing(true)
    setEditingTenant(tenant)
    showTenantModal(tenant)
  }

  //function to send invite link for tenant
  const sendLink = (id) =>{
    dispatch(sendInviteLink(id)).then((res)=>{
      if(res.code === 0){
        message.success('Link sent successfully.')
      }else{
        message.error(res.message)
      }
    })
  }
//function to delete item from cost form
  const deleteCostForm = (costId) =>{
    dispatch(deleteCost(costId,id))
  }
//function to delete item from tenant form
  const handleDelete = (id) =>{ 
    dispatch(deleteTenantData(id))
}

//function to show tenant,contract,cost modal

    const showTenantModal = (tenant = null) =>{
      setIsTenantFormVisible(true)
      if(tenant){ //if modify then auto fill the info from form
      addTenantForm.setFieldsValue(tenant)
      setIsActive(tenant.active)
      }else{// if add tenant then show the empty form
    addTenantForm.resetFields()
    setIsActive(false)
      }
      }    
      const showContractModal = () =>{
        setIsContractFormVisible(true)
      }

      const showModal = () =>{
        SetIsVisible(true)
      }
      const handelCancel= (form) =>{
        form.resetFields()
        SetIsVisible(false)
        setIsTenantFormVisible(false)
        setIsContractFormVisible(false)
      }

      const submitCostForm = async() =>{
        try{
        const values = await addCostForm.validateFields()
        values.propertyId = id
        const res = dispatch(addCost(values))
        addCostForm.resetFields()
        SetIsVisible(false)}
        catch(error){
          console.log(error)
        }
      }

      const submitTenantForm = async()=>{
        try{
        const values = await addTenantForm.validateFields()
        values.address = propertyAddress
        if(isEditing && editingTenant){ //Depends on current state,it editing then call modify function
          const response = await dispatch(modifyTenantData(editingTenant.id,values))
          if(response){
            console.log(response)
          }
        }else{
        const response = await dispatch(postTenantData(values))
        addTenantForm.resetFields()}
        setIsTenantFormVisible(false)
        }catch(error){
          console.log(error)
        }
      }

      const submitContractForm = async()=> {
        try{
          const values = await addContractForm.validateFields()
          if(values.file && values.file.length>0){
              const file = values.file[0].originFileObj
              const contractData={
                startTime:values.startTime.format('YYYY-MM-DD'),
                endTime: values.endTime.format('YYYY-MM-DD'),
                propertyId:id
              }
              await dispatch(uploadContract(file,contractData))
              message.success('Uploaded Successfully')
              addContractForm.resetFields()
              setIsContractFormVisible(false)
          }else{
            message.error('Please select a file to upload')
          }
        }catch(error){
          console.error(error)
        }
      }
     /* const handelUpload = ({file,propertyId}) =>{
        dispatch(uploadContract(file,propertyId))
        .then(()=>{
            message.success(`${file.name} file upload successfully`)
        })
        .catch(()=>{
            message.error('upload failed')
        })
      }

      
    const props = {
    beforeUpload:(file)=>{
        const isPDF = file.type === 'application/pdf'
        if(!isPDF){
            message.error(`${file.name} is not pdf`)
        }
        return isPDF || Upload.LIST_IGNORE
    },
    customRequest: handelUpload,
    showUploadList:false
}*/
    return(
        <div className="propertyDetails">
            <div className="propertyinfo">
            <p>{address}</p>
            <div className="description">
            {desciption}
            </div>
            </div>
            <div className="TenantsList">
                <div className="title">
                Tenants
                <div className="add-button">
                    <Button type="primary" size='large' onClick={showTenantModal}>Add tenant</Button>
                    </div>
                </div>
                <Table columns={tenantsForm} dataSource={formattedData} rowKey="id"/>
            </div>
            <div className="ContractList">
                <div className="title">
                    Contract
                    <div className="add-button">
                      <Button type="primary" size='large' onClick={showContractModal}>Upload Contracts</Button>
                    </div>
                </div>
                <Table columns={contractForm} rowKey="id"/>
            </div>
            <div className="CostList">
                <div className="title">
                    Cost
                    <div className="add-button">
                    <Button type="primary" size='large' onClick={showModal}>Add Cost</Button>
                    </div>
                </div>
                <Table columns={costForm} dataSource={formattedCostList} rowKey="id"/>
            </div>
        <Modal title="Add Tenant" open={isTenantFormVisible} onCancel={()=>handelCancel(addTenantForm)} onOk={submitTenantForm}>
          <TenantFormWithoutAddress form={addTenantForm}/>
        </Modal>
        <Modal title="Upload Contract" open={isContractFormVisible} onCancel={()=>handelCancel(addContractForm)} onOk={submitContractForm}>
          <UploadContractForm form={addContractForm}/>
        </Modal>
        <Modal title="Add Cost" open={isVisible} onOk={submitCostForm} onCancel={()=>handelCancel(addCostForm)}>
          <CostForm form={addCostForm}/>
        </Modal>
        </div>
    )
}

export default PropertyDetails