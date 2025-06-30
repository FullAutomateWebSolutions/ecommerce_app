import { Card, Col, Layout, Menu, Row, theme } from "antd";

import HeaderChildren from "./components/Header.mobile";
import FooterMobile, { handleMenu } from "./components/footer.mobile";
import HomePageWeb from "./pages/HomePage.web";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const { Content, Header, Footer, Sider } = Layout;
const { Meta } = Card;

const AppWeb = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();
      const {role} = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSelect = (key: string) => {
    navigate(key);
  };

  const cardsData = [
    {
      title: "Europe Street beat",
      description: "www.instagram.com",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Ocean View",
      description: "www.example.com",
      img: "https://wallpaperaccess.com/full/286247.jpg",
    },
    {
      title: "Mountain High",
      description: "www.example.org",
      img: "https://wallpaperaccess.com/full/286247.jpg",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          boxShadow: "0 2px 8px #f0f1f2",
          padding: "0 20px",
        }}
      >
        <HeaderChildren />
      </Header>

      <Layout>
        {!isMobile && (
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0,
                margin: 0,
                padding: 8,
              }}
              items={handleMenu(role)}
              onClick={(e) => handleSelect(e.key)}
            />
          </Sider>
        )}

        <Layout
          style={{
            background:
              "linear-gradient(to right, rgba(42, 157, 143, 0.08), rgba(11, 65, 92, 0.08))",
          }}
        >
          <Content
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflowY: "auto",
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: "40px 20px",
            }}
          >
            {/* Grid ou Lista de Cards */}
            {/* <div
              style={{
                display: "flex",
                flexWrap: isMobile ? "nowrap" : "wrap",
                flexDirection: isMobile ? "column" : "row",
                gap: 16,
                width: "100%",
                justifyContent: isMobile ? "flex-start" : "center",
                padding: 16,
              }}
            >
              {cardsData.map((card, index) => (
                <Card
                  key={index}
                  hoverable
                  title={card.title}
                  style={{
                    width: isMobile ? "100%" : 250,
                    flexShrink: 0,
                  }}
                  cover={<img alt={card.title} src={card.img} />}
                >
                  <Meta title={card.title} description={card.description} />
                </Card>
              ))}
            </div> */}
             {/* Linha horizontal com scroll no mobile e centralizada no desktop */}
              {/* <div
                style={{
                  overflowX: "auto",
                  width: "100%",
                  margin: 15,
                  paddingBottom: 8,
                  display: "flex",
                  justifyContent: isMobile ? "flex-start" : "center",
                }}
              >
                <Row
                  gutter={16}
                  style={{
                    flexWrap: "nowrap",
                    display: "flex",
                    maxWidth: isMobile ? "none" : 800,
                  }}
                >
                  <Col span={8} style={{ minWidth: 250 }}>
                    <Card title="Card title" variant="borderless">
                      Card content
                    </Card>
                  </Col>
                  <Col span={8} style={{ minWidth: 250 }}>
                    <Card title="Card title" variant="borderless">
                      Card content
                    </Card>
                  </Col>
                  <Col span={8} style={{ minWidth: 250 }}>
                    <Card title="Card title" variant="borderless">
                      Card content
                    </Card>
                  </Col>
                </Row>
              </div> */}
                      <Outlet />
          </Content>
        </Layout>
      </Layout>
      
      {isMobile && <FooterMobile />}
    </Layout>
  );
};

export default AppWeb;
