import { Card, Col, Layout, Menu, Row, theme } from "antd";
import OnePage from "./pages/OnePage";
import HeaderChildren from "./components/Header.mobile";
import FooterMobile, { itemsDoMenu } from "./components/footer.mobile";
import HomePageWeb from "./pages/HomePage.web";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const { Content, Header, Footer, Sider } = Layout;
const { Meta } = Card;

const AppWeb = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelect = (key: string) => {
    navigate(key);
  };

  const gridStyle: React.CSSProperties = {
    width: "25%",
    textAlign: "center",
  };
  return (
    <>
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
          {!isMobile ? (
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
                items={itemsDoMenu}
                onClick={(e) => handleSelect(e.key)}
              />
            </Sider>
          ) : null}

          <Layout
            style={{
              display: "block",
              // padding: "0 24px 24px",
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
              {/* Linha horizontal com scroll no mobile e centralizada no desktop */}
              <div
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
              </div>
              <Card title="Card Title">
                <Card.Grid style={gridStyle}>Content</Card.Grid>
              </Card>

              {/* Outros cards fixos */}
              <Card
                hoverable
                style={!isMobile ? { width: 250 } : { width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
              <Card
                hoverable
                style={!isMobile ? { width: 250 } : { width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://wallpaperaccess.com/full/286247.jpg"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
              <Card
                hoverable
                style={!isMobile ? { width: 250 } : { width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://wallpaperaccess.com/full/286247.jpg"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Content>
          </Layout>
        </Layout>

        {isMobile ? <FooterMobile /> : null}
      </Layout>
    </>
  );
};

export default AppWeb;
