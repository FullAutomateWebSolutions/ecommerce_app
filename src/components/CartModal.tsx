import React from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  Typography,
  Image,
  Divider,
  Badge,
} from 'antd';
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useCartStore } from '@/store/useCartStore';

const { Title, Text } = Typography;

export function CartModal() {
  const {
    items,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const [visible, setVisible] = React.useState(false);
   //@ts-ignore
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Badge count={items.length} size="small" offset={[0, 4]}>
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={() => setVisible(true)}
          shape="circle"
        />
      </Badge>

      <Modal
        title="🛒 Carrinho de Compras"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="clear" danger onClick={clearCart}>
            Limpar
          </Button>,
          <Button key="close" type="primary" onClick={() => setVisible(false)}>
            Fechar
          </Button>,
        ]}
        width={700}
      >
        {items.length === 0 ? (
          <Text>Seu carrinho está vazio.</Text>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id}>
                <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
                  <Col>
                    <Image
                      width={64}
                      height={64}
                      src={item.thumbnail}
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                  </Col>
                  <Col flex="auto">
                    <Title level={5}>{item.description}</Title>
                    <Text>R$ {item.price} x {item.quantity}</Text>
                    <br />
                    <Text strong>
                      Subtotal: R$ {
                      //@ts-ignore
                      (item.price * item.quantity)}
                    </Text>
                  </Col>
                  <Col>
                    <Button
                      size="small"
                      icon={<MinusOutlined />}
                      onClick={() => decreaseQty(item.id)}
                    />
                    <Text style={{ margin: '0 8px' }}>{item.quantity}</Text>
                    <Button
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => increaseQty(item.id)}
                    />
                  </Col>
                  <Col>
                    <Button
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeFromCart(item.id)}
                    />
                  </Col>
                </Row>
                <Divider />
              </div>
            ))}
            <Title level={4}>Total: R$ {total}</Title>
          </>
        )}
      </Modal>
    </>
  );
}
