import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Space,Popconfirm,Table, Button ,Modal,Spin} from 'antd';
import { getPropertyById } from "../../../store/modules/properties";
import RequestRepairForm from "../../../components/repairComponents/requestRepairForm";
import { useForm } from "antd/es/form/Form";
import { postRepairRequest } from "../../../store/modules/repair";

const TenantRepair = () =>{
    const dispatch = useDispatch()
    const [form] = useForm()
    const [repairData,SetRepairData] = useState([])
    const [isPageLoading,setIsPageLoading] = useState(false)
    const [isVisible,SetIsVisible] = useState(false)
    const showModal = () =>{
        SetIsVisible(true)
    }

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
        console.log(payload)
        const response = await dispatch(postRepairRequest(payload))
        console.log(response)
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
                <div className='add-button'>
                <Button type="primary" onClick={showModal} size='large'>Request Repair</Button>
                </div>
            </div>
                <Table columns={columns}  rowKey="id"/>
            </div>
            <Modal title="Request Repair" open={isVisible}  onCancel={handelCancel} onOk={handelSubmit}>
                <RequestRepairForm form={form} />
            </Modal>
            </Spin>
        </div>
    )
}

export default TenantRepair