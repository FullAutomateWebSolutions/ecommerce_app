import React, { useEffect, useState } from 'react';
import { Avatar, Button, Layout, Row, Col, Typography, theme, Badge, Card } from 'antd';
import { UserOutlined, LogoutOutlined, LeftOutlined, RightOutlined, SettingOutlined, QuestionCircleOutlined, ShoppingOutlined, RestOutlined, TruckOutlined, TeamOutlined, ShoppingCartOutlined, PushpinOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';


import Meta from 'antd/es/card/Meta';
import FooterMobile from '../components/footer.mobile';



const { Content, Header } = Layout;
const { Title } = Typography;

const HomePageWeb: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); 
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: colorBgContainer }}>
      {/* <Header
        style={{
          padding: 0,
          background: '#333', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1000,
          height: '64px', 
        }}
      >
        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
          <Col>
            {!isMobile && (
              <Button
                type="text"
                icon={isMenuOpen ? <LeftOutlined /> : <RightOutlined />}
                onClick={toggleMenu}
                style={{ color: '#fff', padding: 50 }}
              />
            )}
          </Col>
          <Col flex="1" style={{ textAlign: 'center' }}>
            <Title level={3} style={{ margin: 0, color: '#fff' }}>
              Bem-vindo
            </Title>
          </Col>
          <Col>
           
          </Col>
        </Row>
   
      </Header> */}

      <Layout style={{ flex: 6 }}>
             {/* Menu Lateral */}

             
        {!isMobile ? (
           <div className={`sidebar ${!isMobile && isMenuOpen ? 'open' : ''}`}>
           <div className="sidebar-content">
         {/* Logo (Imagem no lugar do texto) */}
         <div style={{ flex: 1, textAlign: 'center' }}>
          {/* <img
            src="" // Substitua pela 
            alt="Logo"
            style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'contain' }}
          /> */}
          
          <Title level={3} style={{ margin: 0, color: '#fff' }}>
             ATF AG
          </Title>
        </div>
        
        <br />
      
             <ul>
              <li>
        <Card>
            
        <Meta
      avatar={<Avatar src="" />}
      title="Loja Centro"
      description="Trocar de loja"
    /> </Card></li>
               <li><Row justify="space-between" align="middle" style={{ width: '100%' }}><Col><PushpinOutlined style={{ fontSize: '20px' }} />        Pedidos</Col><Col><Badge count={3}></Badge></Col></Row></li>
               <li><Row justify="space-between" align="middle" style={{ width: '100%' }}><Col><ShoppingCartOutlined style={{ fontSize: '20px' }} />       Separação</Col><Col><Badge count={25}></Badge></Col></Row></li>
            
               <li><Row justify="space-between" align="middle" style={{ width: '100%' }}><Col><ShoppingOutlined style={{ fontSize: '20px' }} />        Empacotado</Col><Col><Badge count={3}></Badge></Col></Row></li>
             <li><Row justify="space-between" align="middle" style={{ width: '100%' }}><Col><TeamOutlined style={{ fontSize: '20px' }} />        Contato</Col><Col><Badge count={3}></Badge></Col></Row></li>
             <li><Row justify="space-between" align="middle" style={{ width: '100%' }}><Col><TruckOutlined style={{ fontSize: '20px' }} />        Enviando</Col><Col><Badge count={3}></Badge></Col></Row></li>
             </ul>
             
           </div>

           
           <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
            }}
            onClick={toggleMenu}
          >
            {/* {isMenuOpen ? (
              <LeftOutlined style={{ fontSize: '24px', color: '#fff' }} />
            ) : (
              <RightOutlined style={{ fontSize: '24px', color: '#fff' }} />
            )}  */}
          </div>
            
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Title level={5} style={{ margin: 0, color: '#fff' }}>
            <SettingOutlined  style={{ fontSize: '20px' }} />       Configuração
            </Title>
            <br />
            <Title level={5} style={{ margin: 0, color: '#fff' }}>
            <QuestionCircleOutlined  style={{ fontSize: '20px' }} /> Ajuda
            </Title>
            <br />
             <Title level={5} style={{ margin: 0, color: '#fff' }}>
             <UserOutlined  style={{ fontSize: '20px' }} />  Sair
            </Title>
            <br />
            <Title level={5} style={{ margin: 0, color: '#fff' }}>
             Versão: 0.00.1
            </Title>
          </div>
         </div>
            ) : (
              ''
            )}
   
   

        {/* Conteúdo Principal */}
        <Content
          style={{
            top: 0,
            left: 0,
            margin: '0px',
            minHeight: '300px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            backgroundImage: 'url("https://wallpaperaccess.com/full/286247.jpg")',
            //backgroundImage: 'url("https://i.pinimg.com/originals/c2/e2/71/c2e271e7c2c54ae4157c092f89185114.jpg")',
            
            backgroundSize: 'cover',
            transition: 'margin-left 0.3s ease',
            marginLeft: !isMobile && isMenuOpen? '250px' : '0',
          }}
        >
          <div style={{ maxHeight: '100%', overflowY: 'auto', height: '100%' }}>
            {/* <AdminATFAG /> */}

            
           
          </div>
        </Content>

        {isMobile ? <FooterMobile /> : null}
      </Layout>
    </Layout>
  );
};

export default HomePageWeb;
