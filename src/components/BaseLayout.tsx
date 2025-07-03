import { Layout, Row, Col } from "antd";
import React from "react";

const { Header, Content, Footer } = Layout;

interface BaseLayoutProps {
  childrenHeader: React.ReactNode;
  childrenContent: React.ReactNode;
  childrenFooter?: React.ReactNode;
  title?: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  childrenHeader,
  childrenContent,
  childrenFooter,
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
           background: "linear-gradient(to right, rgba(3, 10, 14, 0.73), rgba(28, 151, 137, 0.26))",
          color: "#fff",
          padding: "0 16px",
          position: "sticky",
          top: 70,
          zIndex: 10,
          paddingBottom: 8,
        }}
      >
        {childrenHeader}
      </Header>

      <Content style={{ margin: "10px" }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>{childrenContent}</Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: "center" }}>{childrenFooter}</Footer>
    </Layout>
  );
};
