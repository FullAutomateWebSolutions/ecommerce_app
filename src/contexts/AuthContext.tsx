import { createContext, ReactNode, use, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

// import { getAnalytics, setAnalyticsCollectionEnabled } from "firebase/analytics";

// const analytics = getAnalytics();
// if (process.env.NODE_ENV === "development") {
//   setAnalyticsCollectionEnabled(analytics, false);
// }

interface AuthContextProps {
  user: any;
  loading: boolean;
    children?: ReactNode;
    role?: any;
    tela?: any;
}
interface PrivateRouteProps {
  children: ReactNode;
    
}

const AuthContext = createContext<AuthContextProps>({ user: null, loading: true, role: null});

export const AuthProvider = ({ children }: PrivateRouteProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        //@ts-ignore
      setUser(user);
      setRole("Admin")
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading,role }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
