import React, { useState } from "react";
import { Card, Typography, Button, Space, Result } from "antd";
import { BarcodeOutlined, ReloadOutlined } from "@ant-design/icons";
import BarcodeScanner from "../components/BarcodeScanner";

const { Title, Text } = Typography;

const LeitorPage: React.FC = () => {
  const [code, setCode] = useState<string | null>(null);

  const handleScan = (result: string) => {
    setCode(result);
  };

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "16px",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
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

          {code && (
            <Result
              status="success"
              title="Código lido com sucesso!"
              subTitle={
                <Text strong style={{ fontSize: "18px" }}>
                  {code}
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
