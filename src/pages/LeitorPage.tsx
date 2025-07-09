import React, { useState } from "react";
import { Card, Typography, Button, Space, Result, Spin, Image, message } from "antd";
import { BarcodeOutlined, ReloadOutlined } from "@ant-design/icons";
import BarcodeScanner from "../components/BarcodeScanner";
import axios from "axios";

const { Title, Text } = Typography;

interface ProductItem {
  title: string;
  brand: string;
  images: string[];
  offers: {
    merchant: string;
    domain: string;
    price: number;
    list_price: number;
    condition: string;
    link: string;
  }[];
}

const LeitorPage: React.FC = () => {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductItem | null>(null);

  const handleScan = async (result: string) => {
    if (!result || result === code) return;

    setCode(result);
    setLoading(true);
    setProduct(null);

    try {
      const response = await axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${result}`);
      const item = response.data.items?.[0];

      if (item) {
        setProduct(item);
      } else {
        message.warning("Produto não encontrado.");
      }
    } catch (error) {
      message.error("Erro ao consultar API.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode(null);
    setProduct(null);
  };

  return (
    <div
      // style={{
      //   maxWidth: "430px",
      //   margin: "0 auto",
      //   padding: "16px",
      //   minHeight: "100vh",
      //   backgroundColor: "#f0f2f5",
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      // }}
    >
      <Card
        bordered={false}
        style={{
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Title level={3} style={{ textAlign: "center" }}>
            <BarcodeOutlined /> Leitor de Código
          </Title>

          {!code && <BarcodeScanner onScanSuccess={handleScan} />}

          {loading && <Spin tip="Consultando produto..." />}

          {code && !loading && product && (
            <Card
              type="inner"
              title={product.title}
              extra={<a href={product.offers?.[0]?.link} target="_blank">Ver Produto</a>}
              cover={
                product.images?.[0] && (
                  <Image src={product.images[0]} alt={product.title} style={{ maxHeight: 200, objectFit: "contain" }} />
                )
              }
            >
              <Text strong>Marca:</Text> {product.brand || "Não informado"}<br />
              <Text strong>Vendedor:</Text> {product.offers?.[0]?.merchant}<br />
              <Text strong>Preço:</Text> ${product.offers?.[0]?.price} <br />
              <Text strong>Preço original:</Text> ${product.offers?.[0]?.list_price} <br />
              <Text strong>Condição:</Text> {product.offers?.[0]?.condition}
              <div style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  onClick={handleReset}
                  block
                >
                  Ler Outro Código
                </Button>
              </div>
            </Card>
          )}

          {code && !loading && !product && (
            <Result
              status="warning"
              title="Produto não encontrado"
              subTitle={`Código lido: ${code}`}
              extra={
                <Button type="primary" icon={<ReloadOutlined />} onClick={handleReset}>
                  Tentar Novamente
                </Button>
              }
            />
          )}
        </Space>
      </Card>
    </div>
  );
};

export default LeitorPage;
