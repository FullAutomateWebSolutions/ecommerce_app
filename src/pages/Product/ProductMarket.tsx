import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { Product } from "@/types/product";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  FloatButton,
  Image,
  Input,
  Row,
  Tooltip,
  Typography,
} from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { CartModal } from "@/components/CartModal";

const { Meta } = Card;
const { Title, Text } = Typography;

export function ProductMarket() {
  const { list, create } = useProducts();
  const { selectedProduct, setSelectedProduct } = useProductStore();
  const {  items,addToCart } = useCartStore();
  const { favorites, toggleFavorite } = useFavoritesStore();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);

  if (list.isLoading) return <p>Carregando...</p>;
  if (list.isError) return <p>Erro ao carregar produtos</p>;

  const handleSubmit = () => {
    create.mutate({ nome, preco });
    setNome("");
    setPreco(0);
  };


  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Produtos</Title>

      {/* Grid de Produtos */}
      <Row gutter={[16, 16]}>
        {list.data?.map((produto: Product) => (
          <Col key={produto.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              onClick={() => setSelectedProduct(produto)}
              cover={
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f5f5f5",
                    padding: 12,
                  }}
                >
                  <img
                    src={produto.thumbnail}
                    alt={produto.description}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              }
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              actions={[
                <Tooltip title="Favoritar" key="like">
                  <HeartOutlined
                    style={{
                      color: favorites.includes(produto.id)
                        ? "#eb2f96"
                        : "#999",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(produto.id);
                    }}
                  />
                </Tooltip>,
                <Tooltip title="Adicionar ao carrinho" key="cart">
                  <ShoppingCartOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(produto);
                    }}
                  />
                </Tooltip>,
              ]}
            >
              <Meta
                title={
                  <div>
                    <Text strong>{produto.description}</Text>
                    {produto.subtitle && (
                      <Text type="secondary" style={{ display: "block" }}>
                        {produto.subtitle}
                      </Text>
                    )}
                    <Text type="success" style={{ fontSize: 18, display: "block" }}>
                      R$ {produto.price}
                    </Text>
                  </div>
                }
                description={
                  <div>
                    {produto.parcelamento && (
                      <Text type="secondary" style={{ display: "block" }}>
                        {produto.parcelamento}
                      </Text>
                    )}
                    {produto.cupom && (
                      <Text type="warning" style={{ display: "block" }}>
                        Cupom: {produto.cupom}
                      </Text>
                    )}
                    {produto.embalagem && (
                      <Text style={{ display: "block", fontSize: 12 }}>
                        {produto.embalagem}
                      </Text>
                    )}
                    {produto.brand?.name && (
                      <div
                        style={{
                          marginTop: 8,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Avatar src={produto.brand.picture} size="small" />
                        <Text type="secondary">{produto.brand.name}</Text>
                      </div>
                    )}
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Formulário de Criação */}
      <div style={{ marginTop: 40 }}>
        <Title level={3}>Adicionar Produto</Title>
        <Input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <Input
          placeholder="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(+e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <Button type="primary" onClick={handleSubmit}>
          Criar
        </Button>
      </div>

      {/* Produto Selecionado */}
      {selectedProduct && (
        <div style={{ marginTop: 40 }}>
          <Title level={4}>Produto Selecionado</Title>
          <Card
            title={selectedProduct.description}
            extra={<DownOutlined />}
            style={{ width: 300 }}
          >
            <Image
              width={150}
              src={selectedProduct.thumbnail}
              alt="thumbnail"
              preview={false}
              style={{ marginBottom: 12 }}
            />
            <Meta
              avatar={<Avatar src={selectedProduct.brand?.picture} />}
              title={selectedProduct.brand?.name}
              description={
                <>
                  <div>Preço: R$ {selectedProduct.price}</div>
                  {selectedProduct.subtitle && <div>{selectedProduct.subtitle}</div>}
                  {selectedProduct.parcelamento && <div>{selectedProduct.parcelamento}</div>}
                  {selectedProduct.cupom && <div>{selectedProduct.cupom}</div>}
                  {selectedProduct.embalagem && <div>{selectedProduct.embalagem}</div>}
                </>
              }
            />
          </Card>
         
        </div>
      )}

      {/* Botão Flutuante do Carrinho */}
      <FloatButton
        icon={
         
           <CartModal />
          
        }
        tooltip="Ver Carrinho"
        type="primary"
        style={{ right: 24, bottom: 24 }}
      />

       
    </div>
  );
}
