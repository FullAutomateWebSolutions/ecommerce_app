import React, { useState } from "react";

import {
  DesktopOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Badge,
  Col,
  Divider,
  Layout,
  Menu,
  Row,
  Space,
  theme,
  Typography,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import FooterMobile, { handleMenu } from "./components/layout/footer.mobile";
import { useMediaQuery } from "react-responsive";
import HeaderChildren from "./components/layout/Header.mobile";
import logo from "../src/assets/logo2.png";
const { Header, Content, Sider, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "sub1", <PieChartOutlined />, [
    getItem("Relatórios", "0"),
  ]),
  getItem("Análise", "sub2", <DesktopOutlined />, [getItem("Registros", "1")]),
  getItem("Cadastro", "sub3", <SettingOutlined />, [
    getItem("Rede", "2"),
    getItem("Bandeira", "3"),
    getItem("Finalizadora SAP", "4"),
    getItem("Teste", "5"),
  ]),
];

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  background: "#fff",
  boxShadow: "0 2px 8px #f0f1f2",
};



const logoStyle: React.CSSProperties = {
  height: "64px",
  margin: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // border: "1px solid black",
  marginBottom: 10,
};

const ContentStyle: React.CSSProperties = {
  minHeight: 360,
  padding: 24,
  background: "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(28, 151, 137, 0.26))"
};

const layoutPrincipal: React.CSSProperties = {
  minHeight: "100vh",
  borderBottom: "none",
  background:
    "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
};

const AppProt: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();

  const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
   justifyContent: !isMobile ? "flex-end": "center",
  background: "#fff",
  boxShadow: "0 2px 8px #f0f1f2"
};

  const handleSelect = (key: string) => {
    navigate(key);
  };

  return (
    <Layout style={layoutPrincipal}>
      {/* <Badge.Ribbon text={"versao"} /> */}
      {!isMobile && (
        <Sider
          style={siderStyle}
          trigger={null} /// botao de recolher
          // style={{ border: "solid 5px green" }}
          //  breakpoint="lg"
          // collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)} /// recolher menu sem nome
          width={220}
          collapsedWidth={80}
        >
          <Row style={logoStyle}>
            <Col md={6}>
              <img src={logo} alt="Logo GPA" width="50" />
            </Col>
            <Col md={18}>
              <Typography.Title
                level={5}
                style={{ color: "#2a9d8f", margin: 0 }}
              >
                Full Automate
              </Typography.Title>
              <Typography.Text type="secondary">Web Solutions</Typography.Text>
            </Col>

            <Divider style={{ margin: 0 }} />
          </Row>

          <Menu
            mode="vertical"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            //  style={{
            //    height: "100%",
            //    borderRight: 0,
            //    margin: 0,
            //    padding: 8,
            //  }}
            items={handleMenu()}
            onClick={(e) => handleSelect(e.key)}
          />
        </Sider>
      )}

      <Layout>
        <Header style={headerStyle}>
               <HeaderChildren />
        </Header>
        <Content style={ContentStyle}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {isMobile && <FooterMobile />}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppProt;
