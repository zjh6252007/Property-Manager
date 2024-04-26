import './index.scss'
import { Button, message, Upload, Space, Table, Popconfirm,Spin} from 'antd';
import { getContractList, downloadContract, uploadContract, deleteContract} from '../../../store/modules/contract';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Documents =() =>
{

    const dispatch = useDispatch()
    useEffect(()=>{
      const fetchContracts = async()=>{
        setLoading(true)
        try{
          await dispatch(getContractList())
        }catch(error){
          message.error("Failed to load contracts")
          console.error(error)
        }finally{
          setLoading(false)
        }
      }
      fetchContracts()
},[dispatch])

    const [loading,setLoading] = useState(false)
    const handelUpload = ({file}) =>{
        dispatch(uploadContract(file))
        .then(()=>{
            message.success(`${file.name} file upload successfully`)
        })
        .catch(()=>{
            message.error('upload failed')
        })
      }

      
    const props = {
    beforeUpload:(file)=>{
        const isPDF = file.type === 'application/pdf'
        if(!isPDF){
            message.error(`${file.name} is not pdf`)
        }
        return isPDF || Upload.LIST_IGNORE
    },
    customRequest: handelUpload,
    showUploadList:false
}

  const contractInfo = useSelector(state=>state.contract.contractList)
  const contractData = contractInfo.map((name,index)=>({
    key: index,
    name: name,
  }))

  const handelDownload = async(fileName) =>{
    try{
        const data = await downloadContract(fileName)()
        window.open(data,'_blank')
    }catch(error)
    {
        console.log(error)
    }
  }

  const handleDelete = (fileName) =>{
    dispatch(deleteContract(fileName))
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
          <Button onClick={()=>handelDownload(record.name)}>Download</Button>
          <Popconfirm
            description="Confirm to delete"
            onConfirm={()=>handleDelete(record.name)}
            >
        <Button>Delete</Button>
        </Popconfirm>
          </Space>
      )
    }
  ]

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

<Spin spinning={loading}>
    <div className='contract'>
        <Table columns={columns} dataSource={contractData} />
    </div>  
</Spin>
</div>
    )
}

export default Documents;