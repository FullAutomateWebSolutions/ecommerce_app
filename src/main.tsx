// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import { BrowserRouter } from "react-router-dom";
// import { ConfigProvider } from "antd";
// import "./index.css";
// import './app.css';
// import AppWeb from "./App.web.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: '#2A9D8F',
//           colorLink: '#0B415C',
//         },}}
//     >
//       <BrowserRouter>
//         <AppWeb />
//       </BrowserRouter>
//     </ConfigProvider>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./routes/routes";
import ptBR from 'antd/es/locale/pt_BR';
import { ConfigProvider } from "antd";
import { AuthProvider } from "./contexts/AuthContext";
// import "./styles/global.css";
// import { MsalProvider } from "@azure/msal-react";


const queryClient = new QueryClient();
/// Meu tema custumizado generalizado
const customTheme = {
  token: {
    colorPrimary: "#005bac", 
    borderRadius: 6,
    fontFamily: "'Segoe UI', sans-serif",
    colorBgLayout: "#f5f6fa",
  },
  components: {
    Button: {
      colorPrimary: "#005bac",
    },
    Layout: {
      headerBg: "#001529",
      siderBg: "#001529",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={customTheme} locale={ptBR}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        {/* <MsalProvider instance={msalInstance}>       */}
        <RouterProvider router={router} /> {/* Controlador de acesso */}
        {/* </MsalProvider> */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </ConfigProvider>
);



