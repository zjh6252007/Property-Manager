import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Card , Modal} from 'antd'
import defualtPropertyImg from '../../assets/icons/property.png'
import "./propertyCard.scss"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProperty } from '../../store/modules/properties';
const PropertyCard = ({id,title,description,src}) =>{
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
        <Meta className='property-address'
          title={title}
          description={description}
        />
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