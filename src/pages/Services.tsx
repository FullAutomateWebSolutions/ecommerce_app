import { Typography, Col, Row, Card } from "antd";
import siteInstitucional from '../assets/siteInstitucional.png';
import landingPage from '../assets/landingPage.png';
import manutencao from '../assets/manutencao.png';

const servicess = [
  {
    title: "Site Institucional",
    description: "Ideal para apresentar sua empresa com estilo e clareza.",
    img: siteInstitucional,
  },
  {
    title: "Landing Page",
    description: "Alta conversão para suas campanhas e lançamentos.",
    img: landingPage,
  },
  {
    title: "Manutenção e Suporte",
    description: "Mantemos seu site sempre atualizado e no ar.",
    img: manutencao,
    obs: [
      "Criação de sites institucionais",
      "Landing pages para campanhas",
      "Manutenção de sites existentes",
      "Hospedagem e suporte técnico",
    ],
  },
];

const Services = () => (
  <div>
    <section id="servicos" style={{ marginBottom: 60, textAlign: 'center' }}>
      <Typography.Title level={2}>Serviços</Typography.Title>
      <Row gutter={[18, 18]} justify="center">
        {servicess.map((e, i) => (
          <Col key={i} xs={24} sm={18} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              hoverable
              style={{ width: 300,  }}
              cover={<img alt={e.title} src={e.img} />}
            >
              <Card.Meta title={e.title} description={e.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  </div>
);

export default Services;
