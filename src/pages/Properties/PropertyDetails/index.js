import { useDispatch, useSelector } from "react-redux"
import "./index.scss"
import { getPropertyById } from "../../../store/modules/properties"
import { getCostListById } from "../../../store/modules/cost"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Space,Popconfirm,Table, Button ,Modal} from 'antd';
import { useForm } from "antd/es/form/Form"
import CostForm from "../../../components/propertyComponents/propertyDetails/costForm"
import { addCost } from "../../../store/modules/cost"
import { deleteCost } from "../../../store/modules/cost"
import { getTenantsByPropertyId } from "../../../store/modules/tenant"
const PropertyDetails = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const property = useSelector(state=>state.property.selectProperty)
    const costList = useSelector(state=>state.cost.costList)
    const [isVisible,SetIsVisible] = useState(false)
    const [addCostForm] = useForm()

    const formatDate = (date) =>{
      return new Date(date).toLocaleDateString('en-CA')
    }
    const formattedCostList = costList.map(cost=>({
      ...cost,date:formatDate(cost.date)
    }))
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
    const deleteCostForm = (costId) =>{
      dispatch(deleteCost(costId,id))
    }
    const propertyAddress = property.address || '' //create a temp varible in case address not exist 
    const address = propertyAddress.substring(0,propertyAddress.indexOf(',')) 
    const desciption = propertyAddress.substring(propertyAddress.indexOf(',') + 1).trim()

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

      const showModal = () =>{
        SetIsVisible(true)
      }

      const handelCancel= (form) =>{
        form.resetFields()
        SetIsVisible(false)
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
                    <Button type="primary" size='large'>Add tenant</Button>
                    </div>
                </div>
                <Table columns={tenantsForm} dataSource={formattedData} rowKey="id"/>
            </div>
            <div className="ContractList">
                <div className="title">
                    Contract
                    <div className="add-button">
                    <Button type="primary" size='large'>Upload Contract</Button>
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
          <Modal title="Add Cost" open={isVisible} onOk={submitCostForm} onCancel={()=>handelCancel(addCostForm)}>
          <CostForm form={addCostForm}/>
        </Modal>
        </div>
    )
}

export default PropertyDetails