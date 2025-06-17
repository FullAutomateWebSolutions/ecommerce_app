import { Layout, Menu } from "antd";
import OnePage from "./pages/OnePage";
import HeaderChildren from "./components/Header.mobile";
import FooterMobile from "./components/footer.mobile";
import HomePageWeb from "./pages/HomePage.web";
import Sider from "antd/es/layout/Sider";
const { Content, Header, Footer } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
            boxShadow: "0 2px 8px #f0f1f2", //rgb(45, 68, 90)
            padding: "0 20px",
          }}
        >
          <HeaderChildren />
        </Header>
            {/* Menu Lateral */}
                    <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%', borderRight: 0 }}
                      items={items2}
                    />
                  </Sider>
        <Content
          style={{
            padding: "40px 20px",
            background:
              "linear-gradient(to right, rgba(42, 157, 143, 0.08), rgba(11, 65, 92, 0.08))",
          }}
        >
          {/* <OnePage /> */}
          
        </Content>
      </Layout>
    </>
  );
  // </ConfigProvider>
};

export default App;
