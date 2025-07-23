
import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Button, Card, Col, Divider, Image, Row, Typography } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export function CartPage() {
  const {
    items,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCartStore();
  //@ts-ignore
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>🛒 Carrinho</Title>
      {items.length === 0 ? (
        <Text>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {items.map((item) => (
              <Col span={24} key={item.id}>
                <Card>
                  <Row gutter={16} align="middle">
                    <Col>
                      <Image
                        width={80}
                        height={80}
                        src={item.thumbnail}
                        alt={item.description}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                      />
                    </Col>
                    <Col flex="auto">
                      <Title level={5}>{item.description}</Title>
                      <Text>Preço unitário: R$ {item.price}</Text>
                      <br />
                      <Text strong>
        
                        Subtotal: R$ {
                        //@ts-ignore
                        (item.price * item.quantity)}
                      </Text>
                    </Col>
                    <Col>
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() => decreaseQty(item.id)}
                      />
                      <Text style={{ margin: '0 8px' }}>{item.quantity}</Text>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => increaseQty(item.id)}
                      />
                    </Col>
                    <Col>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeFromCart(item.id)}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider />
          <Title level={3}>Total: R$ {total.toFixed(2)}</Title>
          <Button danger onClick={clearCart}>
            Limpar Carrinho
          </Button>
        </>
      )}
    </div>
  );
}
