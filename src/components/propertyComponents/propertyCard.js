import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Card , Form, Modal} from 'antd'
import defualtPropertyImg from '../../assets/icons/property.png'
import "./propertyCard.scss"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProperty,modifyProperty} from '../../store/modules/properties';
import ModifyForm from './modifyForm';
const PropertyCard = ({id,title,description,price,status,src}) =>{
    const {Meta} = Card
    const [isVisible,SetIsVisible] = useState(false)
    const [isModifyVisible,SetIsModifyVisible] = useState(false)
    const [selectedId,SetSelectedId] = useState()
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const showModal =(id) =>{
      SetSelectedId(id)
      SetIsVisible(true)
    }
    const showModifyModal =(id)=>{
      SetSelectedId(id)
      SetIsModifyVisible(true)
    }
    const handelCancel=()=>{
      if(isVisible){
      SetIsVisible(false)
      SetSelectedId(null)}
      else{
        SetIsModifyVisible(false)
      }
    }

    const handelOk = async() =>{
      await dispatch(deleteProperty(selectedId))
      SetIsVisible(false)
      SetSelectedId(null)
    }

    const handelModify = async(id,data)=>{
      await dispatch(modifyProperty(id,data))
      SetIsModifyVisible(false)
    }
    return (
      <>
      <Card className="property-card"
        cover={
          <img
          className='property-img'
          alt="property Img"
          src= {defualtPropertyImg}
          />
        }
        actions={[
          <EditOutlined key="edit" onClick={()=>showModifyModal(id)} />,
          <DeleteOutlined key="delete" onClick={()=>showModal(id)} />
        ]}
      >
        <div className='card-content'>
          <div className='address-info'>
            <h4>{title}</h4>
            <p className='zipcode'>{description}</p>
          </div>

          <div className='otherinfo'>
            <div className='price'>
            <h4>${price}/Month</h4>
            </div>
            <div className='rentalstatus'>
              <h4 style={{color:status==='empty'?'green':'red',textTransform:'uppercase'}}>{status}</h4>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        title = "Confirm Delete"
        open = {isVisible}
        onCancel={handelCancel}
        onOk={handelOk}
        >
          <p>Are you sure you want to delete this property?</p>
      </Modal>
      <Modal
        title= "Modify Property"
        open = {isModifyVisible}
        onCancel={handelCancel}
        onOk={()=>form.submit()}>
          <ModifyForm form={form} onSubmit={handelModify} id={selectedId}></ModifyForm>
      </Modal>
      </>
    )
}

export default PropertyCard