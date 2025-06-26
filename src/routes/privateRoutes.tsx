import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Alert, Flex, message, Spin } from "antd";

interface PrivateRouteProps {
  children: ReactNode;
  roleUser?: string;
  telaUser?: string;
}

const PrivateRoute = ({ children, roleUser }: PrivateRouteProps) => {
  const { user, loading, role } = useAuth();

/// de primeira vem null ai tem que esperar loading ficar true para pegar o valor de user
  if (loading) {
    return <Flex gap="middle" vertical>
    <Spin tip="Loading...">
      <Alert
        message="Autenticando"
        description="Buscando autenticação"
        type="info"
      />
    </Spin>
  </Flex> 
  }

  if (!user) {
    message.error("Por favor, se autenticar!")
    return <Navigate to="/login" replace />;
  }

  if (roleUser && role !== roleUser) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
