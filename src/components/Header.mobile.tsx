import  { useState } from 'react';
import {  Menu, Drawer, Button, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png';

const { useBreakpoint } = Grid;

const HeaderChildren = () => {
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();
  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  //   const {
  //   token: { colorPrimary },
  // } = theme.useToken();

  const isMobile = !screens.md;

  return (
    < >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: 40, marginRight: 12 }} />
        <h2 style={{ margin: 0 }}>Full Automate</h2>
      </div>
      {isMobile ? (
        <>
          <Button icon={<MenuOutlined />} onClick={showDrawer} style={{ borderBottom: 'none', background: 'linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))'}} />
          <Drawer placement="right" onClose={onClose} visible={visible}>
            <Menu mode="vertical" onClick={onClose} style={{ borderBottom: 'none'}}>
              <Menu.Item key="servicos"><a href="#servicos">Serviços</a></Menu.Item>
              {/* <Menu.Item key="portfolio"><a href="#portfolio">Portfólio</a></Menu.Item> */}
              <Menu.Item key="contato"><a href="#contato">Contato</a></Menu.Item>
            </Menu>
            
          </Drawer>
        </>
      ) : (
        <Menu mode="horizontal" style={{ borderBottom: 'none', }}>
          <Menu.Item key="servicos"><a href="#servicos">Serviços</a></Menu.Item>
          {/* <Menu.Item key="portfolio"><a href="#portfolio">Portfólio</a></Menu.Item> */}
          <Menu.Item key="contato"><a href="#contato">Contato</a></Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default HeaderChildren;