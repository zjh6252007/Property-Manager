import { useDispatch, useSelector } from "react-redux"
import { Button,Space,Table} from "antd"
import { getMyHome } from "../../../store/modules/properties"
import { useEffect } from "react"
import { getContractListByPropertyId } from "../../../store/modules/contract"
import moment from "moment"

import "./index.scss"
const MyHome=() =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getMyHome())
    },[dispatch])

    const myHome = useSelector(state=>state.property.propertyInfo) 
    console.log(myHome)
    useEffect(()=>{
        if(myHome && myHome.id)
        dispatch(getContractListByPropertyId(myHome.id))
    },[dispatch,myHome?.id])

    const contractInfo = useSelector(state=>state.contract.contractList)
    const propertyAddress = myHome.address || '' 
    const address = propertyAddress.substring(0,propertyAddress.indexOf(',')) 
    const desciption = propertyAddress.substring(propertyAddress.indexOf(',') + 1).trim()

    const calculateDaysLeft=(startTime,endTime) => {
        const start = moment(startTime)
        const end =moment(endTime)
        return end.diff(start,'days')
      }

    const contractForm = [
        {
          title: 'Contract Name',
          dataIndex: 'name',
          key:'name'
        },
        {
            title: 'Start Date',
            dataIndex: 'startTime',
            key:'startTime'
          },
          {
            title: 'End Date',
            dataIndex: 'endTime',
            key:'endTime'
          },
          {
            title:'Days Left',
            dataIndex:'daysleft',
            key:'daysleft',
            render:(_,record)=>{
              const days = calculateDaysLeft(record.startTime,record.endTime)
              if(days < 0){
                return <span style={{color:'grey'}}>Expired</span>
              }else if(days<90)
              {
                return <span style={{color:'red'}}>{days}</span>
              }else{
                return <span style={{color:'green'}}>{days}</span>
              }
            }
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

    return (
    <div className="myHome">
        <div className="propertyinfo">
            <p>{address}</p>
            <div className="description">
            <p>{desciption}</p>
            </div>
        </div>
        <div className="monthlyPayment">
            <p>Monthly Payment</p>
            <div className="price">${myHome.price}</div>
            <Button className="payment-button" type="primary" size='large'>Make Payment</Button>
        </div>
        <div className="ContractInfo">
            <p>Leaseing Infomation</p>
            <Table columns={contractForm} dataSource={contractInfo} rowKey="id"/>
        </div>
    </div>
    )
}

export default MyHome