
import { Typography, Button,  FloatButton, Space } from 'antd';
import { InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';

const Contact = () => (
  <div>
  <section id="contato" style={{ textAlign: 'center' }}>
        <Typography.Title level={2}>Fale Conosco</Typography.Title>
        <Typography.Paragraph>
          Entre em contato pelo WhatsApp ou email, e vamos começar seu projeto!
        </Typography.Paragraph>

         <FloatButton icon={<WhatsAppOutlined />} type="primary" href="https://wa.me/5511981007578" target="_blank" style={{ insetInlineEnd: 24 }} />

         <Space>
        <Button  type="primary" href="https://wa.me/5511981007578" target="_blank"><WhatsAppOutlined/></Button>
        <Button type="primary" href="https://www.instagram.com/fullautomatewebsolutions/" target="_blank"><InstagramOutlined /></Button>
         </Space>
        
        <br /><br />
        
        <Button type="text" href="mailto:atendimento@fullautomate.com">fullautomatewebsolutions@gmail.com</Button>
      </section>

      
  </div>
);

export default Contact;
