import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Layout,
  Row,
  Col,
  Typography,
  theme,
  Badge,
  Card,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  ShoppingOutlined,
  RestOutlined,
  TruckOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import Meta from "antd/es/card/Meta";
import FooterMobile from "../components/footer.mobile";

const { Content, Header } = Layout;
const { Title } = Typography;

const HomePageWeb: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: colorBgContainer }}>
      {/* <Header
        style={{
          padding: 0,
          background: '#333', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1000,
          height: '64px', 
        }}
      >
        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
          <Col>
            {!isMobile && (
              <Button
                type="text"
                icon={isMenuOpen ? <LeftOutlined /> : <RightOutlined />}
                onClick={toggleMenu}
                style={{ color: '#fff', padding: 50 }}
              />
            )}
          </Col>
          <Col flex="1" style={{ textAlign: 'center' }}>
            <Title level={3} style={{ margin: 0, color: '#fff' }}>
              Bem-vindo
            </Title>
          </Col>
          <Col>
           
          </Col>
        </Row>
   
      </Header> */}

      <Layout style={{ flex: 6 }}>
        {/* Menu Lateral */}



        {/* Conteúdo Principal */}
        <Content
          style={{
            top: 0,
            left: 0,
            margin: "0px",
            minHeight: "300px",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "16px",
            // backgroundImage: 'url("https://wallpaperaccess.com/full/286247.jpg")',
            backgroundImage:
              'url("https://i.pinimg.com/originals/c2/e2/71/c2e271e7c2c54ae4157c092f89185114.jpg")',

            backgroundSize: "cover",
            transition: "margin-left 0.3s ease",
            marginLeft: !isMobile && isMenuOpen ? "250px" : "0",
          }}
        >
          <div style={{ maxHeight: "100%", overflowY: "auto", height: "100%" }}>
            {/* <AdminATFAG /> */}
          </div>
        </Content>

        {isMobile ? <FooterMobile /> : null}
      </Layout>
    </Layout>
  );
};

export default HomePageWeb;
