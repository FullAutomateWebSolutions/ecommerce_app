import React, { useState } from "react";
import {
  Layout,
  theme,
} from "antd";
import { useMediaQuery } from "react-responsive";

import FooterMobile from "../components/footer.mobile"
import LeitorPage from "./LeitorPage";
import { Outlet } from "react-router-dom";
const { Content } = Layout;
const HomePageWeb: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <div
      style={{
        maxWidth: "430px", // largura típica de celular
        margin: "0 auto", // centraliza na tela
        boxShadow: "0 0 10px rgba(0,0,0,0.2)", // opcional: dá um visual de "celular"
        height: "100vh", // ocupa toda a altura
        overflow: "hidden", // previne scroll externo
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: colorBgContainer
        }}
      >
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
        <Outlet />
        </Content>
        {isMobile ? <FooterMobile /> : null}
      </Layout>
    </div>
  );
};

export default HomePageWeb;
