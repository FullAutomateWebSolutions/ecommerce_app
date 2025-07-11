import { useGenericGet, useGenericPost } from "@/hooks/useQueryStore";
import { Product } from "@/types/type";
import { Button, Card, Col, Row, Typography, Tag } from "antd";
import React from "react";

const { Text } = Typography;

const Teste = () => {
  const { data } = useGenericGet({
    endpoint: "/search_all_product",
    queryKey: "product",
    options: { retry: 2, retryDelay: 2 },
  });

  const produtos: Product[] = data || [];

  return (
    <div style={{ padding: "24px" }}>
      <Row
        gutter={[16, 16]}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {produtos.map((produto, index) => {
          const preco =
            produto.price ??
            produto.avg_price ??
            produto.max_price ??
            produto.min_price ??
            0;

          return (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                bodyStyle={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                style={{
                  height: 360,
                  borderRadius: 8,
                  border: "1px solid #f0f0f0",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    height: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    marginBottom: 8,
                  }}
                >
                  <img
                    src={produto.thumbnail || "https://via.placeholder.com/200x160?text=Sem+Imagem"}
                    alt={produto.description}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "18px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: 36,
                    marginBottom: 4,
                  }}
                >
                  {produto.description}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    color: "#3483fa",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  R$ {Number(preco).toFixed(2)}
                </Text>

                <Text type="secondary" style={{ fontSize: 12 }}>
                  {produto.brand?.name || "Marca desconhecida"}
                </Text>

                <div style={{ marginTop: "auto" }}>
                  <Button
                    type="primary"
                    block
                    size="small"
                    style={{ marginTop: 12 }}
                  >
                    Ver mais
                  </Button>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Teste;
