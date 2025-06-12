import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./index.css";
import './app.css';
import AppWeb from "./App.web.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2A9D8F',
          colorLink: '#0B415C',
        },}}
      // theme={{
      //   token: {
      //     // colorPrimary: "#001529",
      //     // colorLink: "#0B415C",
      //     // // colorBgBlur: "transparent",
      //     // colorBgElevated: "#fff", // cor do modal
      //     // colorBgContainer: "#fff",
      //     // colorBgLayout: "#2A9D8F",
      //     // colorText:"#001529",

      //     colorPrimary: "#005bac",
      //     colorTextBase:"#001529",
      //     borderRadius: 6,
      //     fontFamily: "'Segoe UI', sans-serif",
      //     colorBgLayout: "#f5f6fa",
      //   },
      //   components: {
      //     Button: {
      //       // colorPrimary: "#2A9D8F",
      //     },
      //     Input: {
      //       // colorPrimary: '#eb2f96',
      //       // algorithm: true,
      //     },
      //     Menu: {
      //        colorPrimary: "#fff",
      //       //  colorText:"#0B415C",
      //        colorBgBase: "#005bac",
      //       //  colorLinkHover:"#2A9D8F",
      //       //   colorLinkActive:"#2A9D8F",
      //     },
      //     Layout: {
      //       // headerBg: "#005bac",
      //       // siderBg: "#001529",
      //       // footerBg: "#001529"
      //     },
      //   },
      // }}
    >
      <BrowserRouter>
        <AppWeb />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
