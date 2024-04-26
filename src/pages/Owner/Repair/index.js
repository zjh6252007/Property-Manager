import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRepairList } from "../../../store/modules/repair"
import { Space,Popconfirm,Table, Button ,Modal,Spin} from 'antd';
import ChangeStatusForm from "../../../components/repairComponents/changeStatusForm";
import './index.scss'
import { useForm } from "antd/es/form/Form";
import { updateStatus } from "../../../store/modules/repair";
const Repair = () =>{
    const dispatch = useDispatch()
    const [isPageLoading,setIsPageLoading] = useState(false)
    const [isVisible,SetIsVisible] = useState(false)
    const [repairId,setRepairId] = useState(null)
    const [form] = useForm()
    useEffect(()=>{
        setIsPageLoading(true)
        dispatch(getRepairList(),
        setIsPageLoading(false))
        },[dispatch])

    const showModal = (repairForm) =>{
        SetIsVisible(true)
        setRepairId(repairForm.id)
    }

    const handelCancel= () =>{
        SetIsVisible(false)
        form.resetFields()
    }

    const handelOk = async() =>{
        try{
        const value = await form.validateFields()
        const statusValue = {status:value.status}
        const response = await dispatch(updateStatus(repairId,statusValue))
        SetIsVisible(false)
        form.resetFields()
        }catch(error)
        {
            console.log(error)
        }
    }
    
    const repairList = useSelector(state => state.repair.repairList);
    

    const columns = [
        {
          title: 'Property Address',
          dataIndex: 'propertyAddress',
          key:'address',
          width:200
        },
        {
          title: 'Tenant',
          dataIndex: 'tenantName',
          key:'tenant',
          width:10
        },
        {
          title: 'Telephone',
          dataIndex: 'tenantPhone',
          key:'phone',
          width:10
        },
        {
          title:'Description',
          dataIndex:'description',
          key:'desciption',
          width:40
        },{
            title:'Update Time',
            dataIndex:'updatedAt',
            key:'updatedAt',
            width:140
        },
        {
            title:'Tenant Available',
            dataIndex:'available',
            key:'available',
            width:240,
            render:available => available?(
                <div>
                    {available.split(',').map((time,index)=>(
                        <div key={index}>
                            {time.trim()}
                        </div>
                    ))}
                </div>
            ):null
            
        },
        {
            title:'Status',
            dataIndex:'status',
            key:'status',
            width:50,
            render:(status)=>{
                let color = `black`
                if(status === 'Open'){
                    color='red'
                }else if(status=== 'Pending'){
                    color = 'yellow'
                }else if(status === 'Close'){
                    color = 'grey'
                }
                return <span style={{color}}>{status}</span>
            }
          },
        {
          title:'Action',
          key:'action',
          width:50,
          render:(_,record) =>(
              <Space size="middle">
              <Button onClick={()=>showModal(record)}>Change Status</Button>
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
            <Modal title="Change Status" open={isVisible} onCancel={handelCancel} onOk={handelOk}>
                <ChangeStatusForm form={form}/>
            </Modal>
            </Spin>
        </div>
    )
}

export default Repair