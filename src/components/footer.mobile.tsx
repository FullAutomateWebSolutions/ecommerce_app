import {
  CalendarOutlined,
  InboxOutlined,
  PoweroffOutlined,
  PushpinOutlined,
  ScanOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  ToTopOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import { MenuItem } from "../types/type";


const FooterMobile = () => {

 
  const iconContainer: React.CSSProperties = {
    height: 70,
    width: 70,
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column", /// para que lado fica o texto
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    margin: "0 auto",
    border: "solid 1px red",
    flexShrink: 0, /// 0-> nao permite  /1-> Permite que o item encolha para caber no container
  };

  const iconStyle: React.CSSProperties = {
    fontSize: 26,
    marginBottom: 2,
  };

  const textStyle: React.CSSProperties = {
    fontSize: 12,
    margin: 0,
    padding: 0,
    color: "black",
    lineHeight: 1.2, ///alcular o espaço entre linhas de texto
  };

  const itemsDoMenu:MenuItem[] = [
    { key: "Sair", icon: <PoweroffOutlined  style={iconStyle} />, label: "Sair",BadgeNumber: 0 },
    { key: "Scan", icon: <ScanOutlined  style={iconStyle} />, label: "Scan",BadgeNumber: 0 },
    { key: "Cadastro", icon: <InboxOutlined   style={iconStyle} />, label: "Cadastro" },
    { key: "Loja", icon: <ShopOutlined  style={iconStyle} />, label: "Loja", BadgeNumber : 15 },
    { key: "servicos", icon: <SettingOutlined style={iconStyle} />, label: "Serviços" },
    { key: "Empacotar", icon: <ShoppingOutlined style={iconStyle} />, label: "Empacotar" },
    { key: "Pedidos", icon: <PushpinOutlined style={iconStyle} />, label: "Pedidos" },
    { key: "Separação", icon: <ShoppingCartOutlined style={iconStyle} />, label: "Separação" },
    { key: "Enviados", icon: <TruckOutlined style={iconStyle} />, label: "Enviados" },
    { key: "perfil", icon: <UserOutlined style={iconStyle} />, label: "Perfil" },
    { key: "Agenda", icon: <CalendarOutlined style={iconStyle} />, label: "Agenda" },
  ];

  const footer: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
    padding: 10,
    zIndex: 999,
    overflowX: itemsDoMenu.length > 4 ? "auto" : "hidden", ///controla como o conteúdo se comporta horizontalmente quando excede a largura do elemento.
    WebkitOverflowScrolling: "touch", //touch; — ativa o scroll com inércia (smooth scrolling) em dispositivos touch (iPhones, iPads).//// auto; — comportamento de scroll padrão, não necessariamente suave.
  };

  const scrollContainer: React.CSSProperties = {
    display: "flex",
    gap: 20,///é uma propriedade muito útil para definir o espaçamento entre elementos filhos dentro de containers flexíveis (flexbox) ou grids (grid).
    minWidth: itemsDoMenu.length > 4 ? "max-content" : "100%",///define a largura mínima que um elemento pode ter, ou seja, o menor valor para a largura do elemento.
    justifyContent: itemsDoMenu.length > 4 ? "flex-start" : "center",/// muda linha conforme tamanhoPadraoitem
  };

  return (
    <div style={footer}>
      <div style={scrollContainer}>
        {itemsDoMenu.map(({ key, icon, label, BadgeNumber }) => (
          <a key={key} href={`#${key}`}>
            <Tooltip title={label}>
              <div style={iconContainer}>
                <Badge count={BadgeNumber}>{icon}</Badge>
                <p style={textStyle}>{label}</p>
              </div>
            </Tooltip>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterMobile;
