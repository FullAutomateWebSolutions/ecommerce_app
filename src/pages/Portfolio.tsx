
import { Typography, Card, Row, Col } from 'antd';

const mockProjects = [
  { title: 'Site para Loja X', description: 'Institucional moderno e rápido' },
  { title: 'Landing Page Y', description: 'Alta conversão para campanha' },
];

const Portfolio = () => (
  <div>
    <section id="portfolio" style={{ marginBottom: 30 }}>
    <Typography.Title level={2}>Portfólio</Typography.Title>
    <Row gutter={[16, 16]}>
      {mockProjects.map((project, index) => (
        <Col span={12} key={index}>
          <Card style={{background: 'linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))',}} title={project.title}>{project.description}</Card>
        </Col>
      ))}
    </Row>
    </section>
  </div>
);

export default Portfolio;