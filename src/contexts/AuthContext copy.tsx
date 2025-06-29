import { createContext, ReactNode, use, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { CLogin } from '@/module/login.entity';

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
  const auth = localStorage.getItem("token");
  const login = new CLogin(); 
  useEffect(() => {
    // //@ts-ignoret
    // login.verifyFirebaseToken(auth)
    //   .then((response) => {   
    //   setRole("Admin")
    //   setLoading(false);
    //   // setUser(response.data);
    //   })
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //     //@ts-ignore
    //   setUser(user);
    //   setRole("Admin")
    //   setLoading(false);
    // });
    // return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading,role }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
