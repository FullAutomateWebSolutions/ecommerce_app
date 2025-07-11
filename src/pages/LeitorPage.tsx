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
  Avatar,
} from "antd";
import axios from "axios";
import BarcodeScanner from "@/components/BarcodeScanner";
import { BarcodeOutlined, ReloadOutlined } from "@ant-design/icons";
import { useGenericGet, useGenericPost } from "@/hooks/useQueryStore";
import { Product } from "@/types/type";

const { Title, Text, Paragraph } = Typography;

const LeitorPage: React.FC = () => {
  const [code, setCode] = useState<string | null>(null);
  const [data, setData] = useState<Product[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  const { mutate, isPending } = useGenericPost({
    endpoint: "/search_into_product",
    queryKey: "product",
    onSuccessCallback: (data: Product) => {
      setData([data])
    },
  });

  const handleConsultar = (ean: string) => {
    mutate({ ean });
  };

  // useEffect(() => {
  //   if (code && !data.some((d) => d.gtin.toString() === code)) {
  //     intoProduct({ean:code});
  //   }
  // }, [code]);

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
            <><Button onClick={()=>(handleConsultar("737628064502"),setCode("nul"))}> click</Button>
            <BarcodeScanner
              onScanSuccess={(code) => {
                handleConsultar(code);
              } } /></>
          )}

          {code && (
            <Result
              status="success"
              key={"1"}
              title="Código cadastrado com sucesso"
              children={[
                <Row
        style={{
          overflowX: "auto",
          display: "flex",
          gap: "20px",
          paddingBottom: "24px",
          flexWrap: "nowrap",
        }}
      >
        {data.map((produto: Product, index) => {
          const preco =
            produto.price ??
            produto.avg_price ??
            produto.max_price ??
            produto.min_price ??
            0;

          return (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
               extra={index+1}
                // hoverable
                bodyStyle={{
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                style={{
                  //   height: 420,
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                cover={
                  <div
                    style={{
                      width: "100%",
                      height: 180,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f9f9f9",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <img
                      src={
                        produto.thumbnail ||
                        "https://via.placeholder.com/250x200?text=Sem+Imagem"
                      }
                      alt={produto.description}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                }
              >
                <div
                key={index}
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                  <Space
                    align="center"
                    size="small"
                    style={{ marginBottom: 4 }}
                  >
                    <Avatar src={produto.brand?.picture} size={40} />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {produto.brand?.name}
                    </Text>
                  </Space>
                  <Text strong style={{ fontSize: 12, marginBottom: 4 }}>
                    ID: {produto.id || "N/A"}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Categoria: {produto.category?.description || "N/A"}
                  </Text>
                   <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Categoria Sub: {produto.gpc?.description || "N/A"}
                  </Text>
                  {/* {produto.gtins &&
                    produto.gtins.map((e) => (
                      <>
                      
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 0 }}
                        >
                          Ean: {e.gtin || "N/A"}
                        </Text>
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 4 }}
                        >
                          Ean: {e.gtin || "N/A"}
                          Type packaging:{" "}
                          {e.commercial_unit?.type_packaging || "N/A"}, Quantity
                          packaging:{" "}
                          {e.commercial_unit?.quantity_packaging || "N/A"}
                        </Text>
                      </>
                    ))} */}

                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Ean_Principal: {produto.gtin}
                  </Text>

                  {/* <Text strong style={{ fontSize: "1.1em", color: "#1677ff" }}>
                    R$ {Number(preco).toFixed(2)}
                  </Text> */}

                  {/* <Tag color="blue" style={{ marginTop: 6 }}>
                    {produto.origin}
                  </Tag> */}
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Code NCM: {produto.ncm?.code}
                  </Text>
                  <Paragraph
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                     ellipsis={
                      ellipsis
                        ? { rows: 1, expandable: true, symbol: "Mais" }
                        : false
                    }
                  >
                    Descrição NCM: {produto.ncm?.description}
                  </Paragraph>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Descrição completa NCM:
                  </Text>
                  <Paragraph
                    type="secondary"
                    ellipsis={
                      ellipsis
                        ? { rows: 1, expandable: true, symbol: "Mais" }
                        : false
                    }
                  >
                    {produto.ncm?.full_description}
                  </Paragraph>

                   <Paragraph
                    type="secondary"
                    ellipsis={
                      ellipsis
                        ? { rows: 1, expandable: true, symbol: "Mais" }
                        : false
                    }
                  >
                     {produto.gtins &&
                    produto.gtins.map((e) => (
                      <>
                      
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 0 }}
                        >
                          Ean: {e.gtin || "N/A"}
                        </Text>
                        <br />
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 4 }}
                        >
                          Type:{" "}{e.commercial_unit?.type_packaging || "N/A"}/
                          Quantity:{" "}{e.commercial_unit?.quantity_packaging || "N/A"}
                          <br />
                        </Text>
                      </>
                    ))}
                  </Paragraph>
                </div>

                {/* <Button
                  type="primary"
                  block
                  style={{ marginTop: 12 }}
                  onClick={() => handleComprar(produto.gtin)}
                  loading={isPending}
                >
                  Comprar
                </Button> */}
              </Card>
            </Col>
          );
        })}
      </Row>
              ]}
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
