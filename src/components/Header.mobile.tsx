import { use, useState } from "react";
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
  Space,
  Tooltip,
  Dropdown,
  MenuProps,
  message,
} from "antd";
import { HomeOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import { loginStore } from "@/store/useStore";
// import Logout, { handleLogout } from "@/pages/Logout";
interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const { useBreakpoint } = Grid;
const HeaderChildren = () => {
  const { userSing } = loginStore();
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();
  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  //   const {
  //   token: { colorPrimary },
  // } = theme.useToken();

  const isMobile = !screens.md;

  const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

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
          icon={<MenuOutlined />}
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
          icon={<HomeOutlined />}
          // onClick={()=>handleLogout()}
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
          //      extra={
          //   <Space>
          //     <Button onClick={onClose}>Cancel</Button>
          //     <Button onClick={onClose} type="primary">
          //       Submit
          //     </Button>
          //   </Space>
          // }
        >
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            {userSing?.email || "User Profile"}
          </p>
          <p className="site-description-item-profile-p">Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="E-mail" content={userSing?.email} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Conta Verificada"
                content={userSing?.emailVerified || "Não verificada"}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Status usuário"
                content={userSing?.disabled || "Não informado"}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="ID Usuário"
                content={userSing?.uid || "Não informado"}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Permisão do usuário"
                content={
                  userSing?.customClaims.role.map((e) => e).join(" / ") ||
                  "Não informado"
                }
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Imagem usuário"
                content={
                  (
                    <>
                      <Avatar src={userSing?.photoURL} />
                    </>
                  ) || "Não informado"
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Tipo de autenticação"
                content={
                  userSing?.providerData.map((e) => e.providerId) ||
                  "Não informado"
                }
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Sobre</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Criação do usuário"
                content={userSing?.metadata.creationTime}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Permisão do usuário"
                content={
                  userSing?.customClaims.role.map((e) => e).join(" / ") ||
                  "Não informado"
                }
              />
            </Col>
          </Row>
          {/* <Row>
          <Col span={12}>
            <DescriptionItem title="Login do usuário" content={userSing?.metadata.lastSignInTime} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <a href={userSing?.photoURL} target="_blank" rel="noreferrer">
                  github.com/ant-design/ant-design/
                </a>
              }
            />
          </Col>
        </Row> */}
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
