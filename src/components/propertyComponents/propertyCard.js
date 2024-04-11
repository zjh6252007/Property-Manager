import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Card , Modal} from 'antd'
import defualtPropertyImg from '../../assets/icons/property.png'
import "./propertyCard.scss"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProperty } from '../../store/modules/properties';
const PropertyCard = ({id,title,description,price,status,src}) =>{
    const {Meta} = Card
    const [isVisible,SetIsVisible] = useState(false)
    const [selectedId,SetSelectedId] = useState()
    const dispatch = useDispatch()
    const showModal =(id) =>{
      SetSelectedId(id)
      SetIsVisible(true)
    }
    const handelCancel=()=>{
      SetIsVisible(false)
      SetSelectedId(null)
    }

    const handelOk = async() =>{
      await dispatch(deleteProperty(selectedId))
      SetIsVisible(false)
      SetSelectedId(null)
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
          <EditOutlined key="edit" />,
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
      </>
    )
}

export default PropertyCard