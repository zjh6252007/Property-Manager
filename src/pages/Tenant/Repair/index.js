import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Table, Button ,Modal,Spin} from 'antd';
import RequestRepairForm from "../../../components/repairComponents/requestRepairForm";
import { useForm } from "antd/es/form/Form";
import { postRepairRequest } from "../../../store/modules/repair";
import { getTenantRepairList } from "../../../store/modules/repair";

const TenantRepair = () =>{
    const dispatch = useDispatch()
    const [form] = useForm()
    const [isPageLoading,setIsPageLoading] = useState(false)
    const [isVisible,SetIsVisible] = useState(false)
    const showModal = () =>{
        SetIsVisible(true)
    }

    useEffect(()=>{
        dispatch(getTenantRepairList())
    },[dispatch])

    const repairList = useSelector(state=> state.repair.repairList)
    const handelSubmit = async() =>{
        const values = await form.validateFields()
        const formattedDate = values.available.map(slot => {
            // Check if the time part is undefined and replace it with 'All Time'
            const time = slot[1] ? slot[1] : 'All Time';
            return `${slot[0]}: ${time}`;
        }).join(', ');
        
        const payload = {
            description:values.description,
            available:formattedDate
        }
        const response = await dispatch(postRepairRequest(payload))
        form.resetFields()
        SetIsVisible(false)
    }
    const handelCancel = () =>{
        SetIsVisible(false)
    }
    const columns = [

        {
          title:'Description',
          dataIndex:'description',
          key:'desciption'
        },
        {
            title:'Available Date',
            dataIndex:'available',
            key:'available'
        },
        {
            title:'Last Update',
            dataIndex:'updatedAt',
            key:'updatedAt',
            sorter:(a,b) => new Date(a.updatedAt) - new Date(b.updatedAt)
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
          }
      ]

    return(
        <div className="repair">
            <Spin spinning={isPageLoading}>
            <div className="repair-form">
                <div className="title">
                Repair
                <div className='add-button'>
                <Button type="primary" onClick={showModal} size='large'>Request Repair</Button>
                </div>
            </div>
                <Table columns={columns} dataSource={repairList} rowKey="id"/>
            </div>
            <Modal title="Request Repair" open={isVisible}  onCancel={handelCancel} onOk={handelSubmit}>
                <RequestRepairForm form={form} />
            </Modal>
            </Spin>
        </div>
    )
}

export default TenantRepair