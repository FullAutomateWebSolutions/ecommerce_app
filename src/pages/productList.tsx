import { useEffect, useMemo, useState } from "react";
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
import {
  useSearchAllProduct,
  useSearchIntoProduct,
  useSendResetLink,
} from "@/hooks/api";
import { Product } from "@/types/type";
const { Title, Text, Paragraph } = Typography;

const ProductList = () => {
  // Supondo que useSendResetLink seja um hook que retorna { data, isLoading, error }
  // e que data seja um array de produtos

  const { data, error } = useSearchAllProduct();

  const products: Product[] = useMemo(() => {
    const list = Array.isArray(data) ? data : [];
    return list;
  }, [data]);

  console.log(data?.success);
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
    //  style={{
    //      
    //     }}
    // }}
    >
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {products.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                //  borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              hoverable
              cover={
                <Image
                  alt={item.description}
                  src={item.thumbnail}
                  height={300}
                  preview={false}
                />
              }
            >
              <Card.Meta
                avatar={
                  <Image
                    alt={item.brand?.name}
                    src={item.brand?.picture}
                    height={50}
                    preview={false}
                  />
                }
                title={item.brand?.name}
              />
              <Text strong>Descrição: </Text>
              <span style={{ fontSize: 10 }}>{item.description}</span>
              <br />
              <Text strong>GTIN:</Text> {item.gtin} <br />
              {/* <Text strong>Marca:</Text> {item.} <br /> */}
              {item.ncm &&(
                <>
                 <Text strong>Descrição simples:</Text>{" "}
                {item.ncm.description}
                <br />
                 <Text strong>Descrição completa:</Text>{" "}
                <Paragraph type="secondary">
                    {item.ncm.full_description}
                </Paragraph>
                
                </>
              )}
              {/* <br />
              {item.gtins && (
                <>
                  {item.gtins.map((e) => (
                    <Text>
                      <Text strong>type_packaging:</Text>{" "}
                      {e.commercial_unit?.type_packaging}
                      <br />
                      <Text strong>quantity_packaging:</Text>{" "}
                      {e.commercial_unit?.quantity_packaging}
                      <br />
                      <Text strong>layer:</Text>{" "}
                      {e.commercial_unit?.layer}
                      <br />
                      <Text strong>ballast:</Text>{" "}
                      {e.commercial_unit?.ballast}
                      <br />
                    </Text>
                  ))}
                </>
              )} */}
              {/* {item.layer && <Text>Layer: {item.layer}</Text>} */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
