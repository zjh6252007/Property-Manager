import { useDispatch, useSelector } from "react-redux"
import "./index.scss"
import { getPropertyById } from "../../../store/modules/properties"
import { getCostListById } from "../../../store/modules/cost"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Space,Popconfirm,Table, Button ,Modal} from 'antd';
const PropertyDetails = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const property = useSelector(state=>state.property.selectProperty)
    const costList = useSelector(state=>state.cost.costList)
    console.log(costList)
    useEffect(()=>{
      dispatch(getPropertyById(id))
      dispatch(getCostListById(id))
},[id,dispatch])

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
        },{
          title:'Action',
          key:'action',
          render:(_,record) =>(
              <Space size="middle">
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
          key:'date'
        },
        {
            title:'Cost',
            dataIndex:'cost',
            key:'cost'
        },{
          title:'Action',
          key:'action',
          render:(_,record) =>(
              <Space size="middle">
              </Space>
          )
        }
      ]
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
                <Table columns={tenantsForm} rowKey="id"/>
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
                    <Button type="primary" size='large'>Add Cost</Button>
                    </div>
                </div>
                <Table columns={costForm} dataSource={costList} rowKey="id"/>
            </div>
        </div>
    )
}

export default PropertyDetails