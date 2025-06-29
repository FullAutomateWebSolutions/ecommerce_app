import 'antd/dist/reset.css';
import { Button, Space, Typography, message } from 'antd';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loginStore } from './store/useStore';

const App = () => {
  const navigate = useNavigate();
  const {logout}= loginStore();
  const handleLogout = async () => {
    try {
     await logout();
      navigate('/login');
    } catch (error) {

    }
  };



  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="middle">
        <Typography.Title level={3}>Bem-vindo 👋</Typography.Title>
        <Button type="primary" danger onClick={() => handleLogout()}>
          Deslogar
        </Button>
      </Space>
    </div>
  );
};

export default App;
