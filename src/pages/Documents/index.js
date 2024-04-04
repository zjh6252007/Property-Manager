import './index.scss'
import { Button, message, Upload,Space,Popconfirm,Table} from 'antd';
import { getContractList } from '../../store/modules/contract';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Documents =() =>
{
    const props = {
    beforeUpload:(file)=>{
        const isPDF = file.type === 'application/pdf'
        if(!isPDF){
            message.error(`${file.name} is not pdf`)
        }
        return isPDF || Upload.LIST_IGNORE
    },
    onChange:(info) =>{
        console.log(info.fileList)
    },
}

const columns = [
    {
      title: 'Contract Name',
      dataIndex: 'name',
      key:'name'
    },
    {
      title:'Action',
      key:'action',
      render:(_,record) =>(
          <Space size="middle">
          <Button>Download</Button>
          </Space>
      )
    }
  ];

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getContractList())
  },[dispatch])

  const contractInfo = useSelector(state=>state.contract.contractList)
  const contractData = contractInfo.map((name,index)=>({
    key: index,
    name: name,
  }))

    return(
        <div className="document">
            <div className='title'>
            Documents
            <div className='add-button'>
                <Upload {...props}>
            <Button type="primary" size='large'>Upload Contracts</Button>
            </Upload>
            </div>
            </div>
            <div className='contract'>
            <Table columns={columns} dataSource={contractData} />
            </div>  
        </div>
    )
}

export default Documents;