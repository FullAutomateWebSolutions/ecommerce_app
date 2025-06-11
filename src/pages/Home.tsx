import { Typography, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Certifique-se de importar o logo corretamente

const Home = () => (
 <section
  style={{
    padding: '60px 20px',
    background: 'linear-gradient(to right, rgba(42, 157, 143, 0.08), rgba(11, 65, 92, 0.08))',
  }}
>

    <Row
      gutter={[32, 32]}
      align="middle"
      justify="center"
      style={{ maxWidth: 1200, margin: '0 auto' }}
    >
      <Col xs={24} md={10} style={{ textAlign: 'center' }}>
        <img
          src={logo}
          alt="Logo Full Automate"
          style={{ width: '100%', maxWidth: 280 }}
        />
      </Col>
      <Col xs={24} md={14}>
        <Typography.Title level={1}>Full Automate Web Solutions</Typography.Title>
        <Typography.Paragraph style={{ fontSize: 18, lineHeight: 1.6 }}>
          Desenvolvemos sites modernos, rápidos e alinhados com a identidade da sua empresa.
        </Typography.Paragraph>
        <Link to="/contato">
          <Button type="primary" size="large">Solicitar Orçamento</Button>
        </Link>
      </Col>
    </Row>
  </section>
);

export default Home;
