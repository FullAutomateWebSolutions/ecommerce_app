import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { loginStore } from '@/store/useStore';

interface AuthContextProps {
  use: any;
  loading: boolean;
  role: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  use: null,
  loading: true,
  role: null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { userSing, fech, user } = loginStore();
  const [use, setUse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user?.token) {
      // já tem dados persistidos, só seta
      setUse(user);
      setRole(userSing?.customClaims?.role?.[0] ?? null);
      setLoading(false);

      // opcional: atualiza dados do firebase
      fech(); 
    } else {
      setUse(null);
      setRole(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userSing?.uid) {
      setUse(userSing);
      setRole(userSing.customClaims?.role?.[0] ?? null);
      setLoading(false);
    }
  }, [userSing]);

  return (
    <AuthContext.Provider value={{ use, loading, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
