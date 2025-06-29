import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Alert, Flex, message, Spin } from "antd";

interface PrivateRouteProps {
  children: ReactNode;
  roleUser: string|null;
  telaUser?: string;
}

const PrivateRoute = ({ children, roleUser }: PrivateRouteProps) => {
  const { use, loading, role } = useAuth();

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

  if (!use && use === null) {
    message.error("Por favor, se autenticar!")
    return <Navigate to="/login" replace />;
  }

  if (roleUser && role !== roleUser && roleUser !== 'public') {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
