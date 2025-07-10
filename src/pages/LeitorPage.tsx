import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Image,
  Button,
  Space,
  message,
  Result,
} from "antd";
import axios from "axios";
import BarcodeScanner from "@/components/BarcodeScanner";
import { BarcodeOutlined, ReloadOutlined } from "@ant-design/icons";
import { useSearchIntoProduct } from "@/hooks/api";
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

const LeitorPage: React.FC = () => {
  const [code, setCode] = useState<string | null>(null);
  const [data, setData] = useState<CardProduto[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

   const { mutate: intoProduct } = useSearchIntoProduct({ 
      onSuccess: (data: any) => {
        const successMessage = data.message;
        message.success(successMessage);
           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
        queryClient.invalidateQueries('products');
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'Falha';
        message.error(errorMessage);
      }
    });

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
      const cardItem: CardProduto = {
        key: produto.gtin,
        gtin: produto.gtin,
        description: produto.description,
        thumbnail: produto.thumbnail,
        marca: produto.brand.name,
        embalagem: produto.gtins[0]?.commercial_unit?.type_packaging ?? "-",
        quantidade: produto.gtins[0]?.commercial_unit?.quantity_packaging ?? 1,
        ballast: produto.gtins[0]?.commercial_unit?.ballast ?? null,
        layer: produto.gtins[0]?.commercial_unit?.layer ?? null,
      };

      setData((prev) => {
        if (prev.find((item) => item.gtin === cardItem.gtin)) return prev;
        return [...prev, cardItem];
      });

      setSelectedKeys([]);
    } catch (err) {
      message.error("GTIN não encontrado ou erro na API");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code && !data.some((d) => d.gtin.toString() === code)) {
      intoProduct({ean:code});
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

          {!code && (
            <BarcodeScanner
              onScanSuccess={(result) => {
                if (result) {
                  setCode(result);
                }
              }}
            />
          )}

          {code && (
            <Result
              status="success"
              title="Código lido com sucesso!"
              subTitle={
                <Text strong style={{ fontSize: "18px" }}>
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
                          <Text strong>Quantidade:</Text> {item.quantidade}{" "}
                          <br />
                          {item.ballast && (
                            <Text>
                              Ballast: {item.ballast}
                              <br />
                            </Text>
                          )}
                          {item.layer && <Text>Layer: {item.layer}</Text>}
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Text>
              }
              extra={[
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  onClick={() => setCode(null)}
                >
                  Ler Outro
                </Button>,
              ]}
            />
          )}
        </Space>
      </Card>
    </div>
  );
};

export default LeitorPage;
