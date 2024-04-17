import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRepairList } from "../../store/modules/repair"
import { Space,Popconfirm,Table, Button ,Modal} from 'antd';
import './index.scss'
const Repair = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getRepairList())
    },[dispatch])

    const repairList = useSelector(state=> state.repair.repairList)
    console.log(repairList)

    const columns = [
        {
          title: 'PropertyAddress',
          dataIndex: 'address',
          key:'address'
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
              <Popconfirm
                  description="Confirm to delete"
                  >
              <Button>Delete</Button>
              </Popconfirm>
              <Button >Modify</Button>
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
                <Table columns={columns}  rowKey="id"/>
            </div>
        </div>
    )
}

export default Repair