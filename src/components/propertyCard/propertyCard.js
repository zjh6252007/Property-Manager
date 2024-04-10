import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd'
import defualtPropertyImg from '../../assets/icons/property.png'
import "./propertyCard.scss"
const PropertyCard = ({title,description,src}) =>{
    const {Meta} = Card
    return (
        <Card className="property-card"
        cover={
          <img
          className='property-img'
          alt="property Img"
          src= {defualtPropertyImg}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta className='property-address'
          title={title}
          description={description}
        />
      </Card>
    )
}

export default PropertyCard