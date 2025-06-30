import { useState } from "react";
import {
  Menu,
  Drawer,
  Button,
  Grid,
  Col,
  Row,
  Divider,
  List,
  Avatar,
  Dropdown,
  MenuProps,
  message,
  Space,
  Typography,
} from "antd";
import { HomeOutlined, LogoutOutlined, MenuOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import { loginStore } from "@/store/useStore";
import { IconApp } from "./ui/iconApp";
import { Navigate, useNavigate } from "react-router-dom";
// import Logout, { handleLogout } from "@/pages/Logout";
interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const { useBreakpoint } = Grid;
const HeaderChildren = () => {
  const navigate =  useNavigate();
  const { userSing,logout } = loginStore();
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();
  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  //   const {
  //   token: { colorPrimary },
  // } = theme.useToken();

  const isMobile = !screens.md;

   const handleLogout = () => {
    logout();
    navigate("/login");
  };

  function formatToBRDateTime(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    throw new Error("Data inválida");
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // meses começam do 0
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

  const items: MenuProps["items"] = [
    {
      label: "",
      key: "1",
      icon: (
        <>
          {userSing?.email && (
            <List style={{ width: 300, marginLeft: 20, margin: 10 }}>
              <List.Item.Meta
                avatar={<Avatar src={userSing?.photoURL} />}
                title={userSing?.email}
                description={userSing?.emailVerified ? "Verificado" : "Não verificado"}
              />
            </List>
          )}
        </>
      ),
    },
    {
      label: "Configuração do usuário",
      key: "2",
      onClick: showDrawer,
      icon: (
        <Button
          title="Menu"
          type="text"
          icon={ <IconApp iconKey="Servicos" />}
          onClick={showDrawer}
          style={{
            borderBottom: "none",
            background:
              "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
          }}
        />
      ),
    },
     {
      label: "Sair",
      key: "3",
     
      icon: (
        <Button
          title="Menu"
          type="text"
          icon={ <IconApp iconKey="Sair" />}
           onClick={()=>(logout(), navigate("/login"))}
          style={{
            borderBottom: "none",
            background:
              "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
          }}
        />
      ),
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const ModalUser = () => {
    return (
      <>
        <Drawer
          width={640}
          placement="right"
          // closable={false}
          onClose={onClose}
          visible={visible}
          title={`Perfil do usuário `}
        >
           <Row gutter={[16, 16]}>
          <Col span={24}>
            <List.Item.Meta
              avatar={<Avatar size={64} src={userSing?.photoURL} />}
              title={userSing?.email}
              description={userSing?.emailVerified ? "Verificado" : "Não verificado"}
            />
          </Col>

          {/* <Col span={12}>
            <Typography.Text strong>E-mail</Typography.Text>
            <div>{userSing?.email}</div>
          </Col> */}

          <Col span={12}>
            <Typography.Text strong>UID</Typography.Text>
            <div>{userSing?.uid}</div>
          </Col>

          <Col span={24}>
            <Typography.Text strong>Status</Typography.Text>
            <div>{userSing?.disabled ? "Desativado" : "Ativo"}</div>
          </Col>

          <Col span={12}>
            <Typography.Text strong>E-mail Verificação</Typography.Text>
            <div>{userSing?.emailVerified ? "Sim" : "Não"}</div>
          </Col>

          <Col span={24}>
            <Typography.Text strong>Provedor de Login</Typography.Text>
            <div>
              {userSing?.providerData?.map((p) => p.providerId).join(", ") ||
                "Desconhecido"}
            </div>
          </Col>

          <Col span={24}>
            <Typography.Text strong>Funções</Typography.Text>
            <div>
              {userSing?.customClaims?.role?.join(" / ") || "Não informado"}
            </div>
          </Col>

          <Col span={24}>
            <Typography.Text strong>Criado em</Typography.Text>
            <div>{formatToBRDateTime(String(userSing?.metadata?.creationTime))}</div>
          </Col>
            <Col span={24}>
            <Typography.Text strong>Atualizado em</Typography.Text>
            <div>{formatToBRDateTime(String(userSing?.metadata?.lastRefreshTime))}</div>
          </Col>
        </Row>

        <Divider />
        <Button
          title="Sair"
          type="text"
          icon={ <IconApp iconKey="Sair" />}
           onClick={handleLogout}
          style={{
            borderBottom: "none",
            background:
              "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
          }}
          block
        />
        </Drawer>
      </>
    );
  };

  const ModalModelo = () => {
    return (
      <>
        <Button
          icon={<MenuOutlined />}
          onClick={showDrawer}
          style={{
            borderBottom: "none",
            background:
              "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
          }}
        />
        <Drawer placement="right" onClose={onClose} visible={visible}>
          <Menu
            mode="vertical"
            onClick={onClose}
            style={{ borderBottom: "none" }}
          >
            <Menu.Item key="servicos">
              <a href="/servicos">Serviços</a>
            </Menu.Item>
            {/* <Menu.Item key="portfolio"><a href="#portfolio">Portfólio</a></Menu.Item> */}
            <Menu.Item key="contato">
              <a href="/contato">Contato</a>
            </Menu.Item>
            <Menu.Item key="Sair">
              <a href="/Sair">Sair</a>
            </Menu.Item>
          </Menu>
        </Drawer>
      </>
    );
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="Logo" style={{ height: 40, marginRight: 12 }} />
        <h2 style={{ margin: 0 }}>Full Automate</h2>
      </div>
      {isMobile ? (
        <>
          <Button
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{
              borderBottom: "none",
              background:
                "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
            }}
          />
          {ModalUser()}
        </>
      ) : (
          <>
            <Dropdown.Button
              style={{ width: 100, justifyContent: "end"}}
              menu={menuProps}
              placement="bottom"
              icon={<UserOutlined />}
            >
              {userSing?.email || "Menu de usuário"}
            </Dropdown.Button>

            <ModalUser />
          </>
        
      )}
    </>
  );
};

export default HeaderChildren;
