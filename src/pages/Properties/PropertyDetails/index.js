import { useDispatch } from "react-redux"
import "./index.scss"
import { getPropertyById } from "../../../store/modules/properties"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Space,Popconfirm,Table, Button ,Modal} from 'antd';
const PropertyDetails = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const [property,setProperty] = useState('')
    useEffect(()=>{
        const fetchProperty = async()=>{
            try{
                const response = await dispatch(getPropertyById(id))
                console.log(response)
                setProperty(response)
            }catch(error){
                setProperty(null)
            }
        }
        fetchProperty()
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
          title: 'Name',
          dataIndex: 'name',
          key:'name'
        },
        {
          title:'Date',
          dataIndex:'date',
          key:'date'
        },
        {
            title:'Amount',
            dataIndex:'amount',
            key:'amount'
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
            <div className="title">
            <p>{address}</p>
            <div className="description">
            {desciption}
            </div>
            </div>
            <div className="TenantsList">
                <div className="title">
                Tenants
                </div>
                <Table columns={tenantsForm} rowKey="id"/>
            </div>
            <div className="ContractList">
                <div className="title">
                    Contract
                </div>
                <Table columns={contractForm} rowKey="id"/>
            </div>
            <div className="CostList">
                <div className="title">
                    Cost
                </div>
                <Table columns={costForm} rowKey="id"/>
            </div>
        </div>
    )
}

export default PropertyDetails