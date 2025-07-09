import { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Image, Button, Space, message } from "antd";
import axios from "axios";
import BarcodeScanner from "@/components/BarcodeScanner";


const { Title, Text } = Typography;

interface CardProduto {
  key: number;
  gtin: number;
  description: string;
  thumbnail: string;
  marca: string;
  embalagem: string;
  quantidade: number;
  ballast: number | null;
  layer: number | null;
}

export default function ProdutoComScannerCam() {
  const [code, setCode] = useState<string | null>(null);
  const [data, setData] = useState<CardProduto[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProduto = async (gtin: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.cosmos.bluesoft.com.br/gtins/${gtin}.json`,
        {
          headers: {
            "User-Agent": "Cosmos-API-Request",
            "Content-Type": "application/json",
            "X-Cosmos-Token": "lQ8BFJOXSkBiEIZaLgT_oQ",
          },
        }
      );

      const produto = res.data;
      const itens: CardProduto[] = produto.gtins.map((g: any) => ({
        key: g.gtin,
        gtin: g.gtin,
        description: produto.description,
        thumbnail: produto.thumbnail,
        marca: produto.brand.name,
        embalagem: g.commercial_unit?.type_packaging,
        quantidade: g.commercial_unit?.quantity_packaging,
        ballast: g.commercial_unit?.ballast,
        layer: g.commercial_unit?.layer,
      }));

      setData(itens);
      setSelectedKeys([]);
    } catch (err) {
      message.error("GTIN não encontrado ou erro na API");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      fetchProduto(code);
    }
  }, [code]);

  const toggleSelecionado = (key: number) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleReprocess = () => {
    message.success(`Reprocessando: ${selectedKeys.join(", ")}`);
  };

  const handleReset = () => {
    setCode(null);
    setData([]);
    setSelectedKeys([]);
  };

  return (
    <>
      {/* <Title level={3}>Leitor com Câmera + Consulta Cosmos API</Title> */}

      <Space style={{ marginBottom: 16 }} wrap>
        <Button onClick={handleReset}>Resetar</Button>
        {selectedKeys.length > 0 && (
          <Button type="primary" onClick={handleReprocess}>
            Reprocessar Selecionados ({selectedKeys.length})
          </Button>
        )}
      </Space>

      <BarcodeScanner
      onScanSuccess={ (result) => {
          if (result) {
            setCode(result); 
          }
        }}
      />

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {data.map((item) => (
          <Col key={item.key} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              loading={loading}
              onClick={() => toggleSelecionado(item.key)}
              style={{
                border: selectedKeys.includes(item.key)
                  ? "2px solid #1677ff"
                  : undefined,
              }}
              cover={
                <Image
                  alt={item.description}
                  src={item.thumbnail}
                  height={200}
                  preview={false}
                />
              }
            >
              <Title level={5}>{item.description}</Title>
              <Text strong>GTIN:</Text> {item.gtin} <br />
              <Text strong>Marca:</Text> {item.marca} <br />
              <Text strong>Embalagem:</Text> {item.embalagem} <br />
              <Text strong>Quantidade:</Text> {item.quantidade} <br />
              {item.ballast && <Text>Ballast: {item.ballast}<br /></Text>}
              {item.layer && <Text>Layer: {item.layer}</Text>}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
