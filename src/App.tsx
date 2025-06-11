import { Layout } from "antd";
import OnePage from "./pages/OnePage";
import HeaderChildren from "./components/Header";
const { Content, Header, Footer } = Layout;
const App = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
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

        <Content style={{ padding: "40px 20px", background: 'linear-gradient(to right, rgba(42, 157, 143, 0.08), rgba(11, 65, 92, 0.08))'}}>
          <OnePage />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Full Automate Web Solutions ©2025 — É sempre possível melhorar
        </Footer>
      </Layout>
    </>
  );
  // </ConfigProvider>
};

export default App;
