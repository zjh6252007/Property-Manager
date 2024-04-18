import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRepairList } from "../../store/modules/repair"
import { Space,Popconfirm,Table, Button ,Modal} from 'antd';
import { getPropertyById } from "../../store/modules/properties";
import { getTenantById } from "../../store/modules/tenant";
import './index.scss'
const Repair = () =>{
    const dispatch = useDispatch()
    const [repairData,SetRepairData] = useState([])

    useEffect(()=>{
        dispatch(getRepairList()).then(()=>{
            handleFetchDetails()
        })
    },[dispatch])

    const repairList = useSelector(state => state.repair.repairList);
    console.log(repairList)
    const handleFetchDetails = async () => {
        const details = await Promise.all(repairList.map(async (repair) => {
            const propertyRes = await dispatch(getPropertyById(repair.propertyId))
            const tenantRes = await dispatch(getTenantById(repair.tenantId))
            
            return {
                ...repair,
                address: propertyRes.address,  
                tenant: tenantRes.firstName+" "+ tenantRes.lastName,
                phone: tenantRes.phone
            }
        }))
        SetRepairData(details)
    }

    const columns = [
        {
          title: 'Property Address',
          dataIndex: 'address',
          key:'address'
        },
        {
          title: 'Tenant',
          dataIndex: 'tenant',
          key:'tenant'
        },
        {
          title: 'Telephone',
          dataIndex: 'phone',
          key:'phone'
        },
        {
          title:'Description',
          dataIndex:'description',
          key:'desciption'
        },
        {
            title:'Status',
            dataIndex:'status',
            key:'status',
            render:(status)=>{
                let color = `black`
                if(status === 'Open'){
                    color='red'
                }else if(status=== 'Pending'){
                    color = 'yellow'
                }else if(status === 'Close'){
                    color = 'green'
                }
                return <span style={{color}}>{status}</span>
            }
          },
        {
          title:'Action',
          key:'action',
          render:(_,record) =>(
              <Space size="middle">
              <Button>Delete</Button>
              </Space>
          )
        }
      ]

    return(
        <div className="repair">
            <div className="repair-form">
                <div className="title">
                Repair
                </div>
                <Table columns={columns}  dataSource={repairData} rowKey="id"/>
            </div>
        </div>
    )
}

export default Repair