import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd'

const PropertyCard = ({title,description}) =>{
    const {Meta} = Card
    return (
        <Card className="property-card"
        style={{ width: 450, boxShadow: "4px 4px 10px 0 #babab0"}}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          title={title}
          description={description}
        />
      </Card>
    )
}

export default PropertyCard