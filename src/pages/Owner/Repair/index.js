import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRepairList } from "../../../store/modules/repair"
import { Space,Popconfirm,Table, Button ,Modal,Spin} from 'antd';
import './index.scss'
const Repair = () =>{
    const dispatch = useDispatch()
    const [isPageLoading,setIsPageLoading] = useState(false)

    useEffect(()=>{
        setIsPageLoading(true)
        dispatch(getRepairList(),
        setIsPageLoading(false))
        },[dispatch])

    const repairList = useSelector(state => state.repair.repairList);
    console.log(repairList)

    const columns = [
        {
          title: 'Property Address',
          dataIndex: 'propertyAddress',
          key:'address'
        },
        {
          title: 'Tenant',
          dataIndex: 'tenantName',
          key:'tenant'
        },
        {
          title: 'Telephone',
          dataIndex: 'tenantPhone',
          key:'phone'
        },
        {
          title:'Description',
          dataIndex:'description',
          key:'desciption'
        },
        {
            title:'Available Date',
            dataIndex:'available',
            key:'available',
            render:available => available?(
                <div>
                    {available.split(',').map((time,index)=>(
                        <div key={index}>{time.trim()}</div>
                    ))}
                </div>
            ):null
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
            <Spin spinning={isPageLoading}>
            <div className="repair-form">
                <div className="title">
                Repair
                </div>
                <Table columns={columns}  dataSource={repairList} rowKey="id"/>
            </div>
            </Spin>
        </div>
    )
}

export default Repair