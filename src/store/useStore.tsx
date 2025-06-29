import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CLogin } from "@/module/login.entity";
import { FirebaseUserResponse, IUser } from "@/types/type";

const clogin = new CLogin();

interface CLoginState {
  user: IUser | null;
  userSing: FirebaseUserResponse | null;
  fech: () => Promise<void>;
  loginUser: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const loginStore = create<CLoginState>()(
  persist(/// persistência no localStorage
    (set) => ({
      user: null,
      userSing: null,
      fech: async () => {
        await clogin.getUser(); // carrega usuário
        const user = clogin.getUser();
        const userSing = clogin.getUserSing();
        if (user) set({ user });
        if (userSing) set({ userSing });
      },

      loginUser: async (username, password) => {
        await clogin.loginUserApi(username, password);
        const user = clogin.getUser();
        const userSing = clogin.getUserSing();
        set({ user, userSing });
      },
      logout: () => {
        set({ user: null, userSing: null });
        localStorage.removeItem('login-storage'); 
        localStorage.removeItem('authToken'); // se usar token
      },
    }),
    {
      name: "login-storage", // nome no localStorage
      partialize: (state) => ({
        user: state.user,
        userSing: state.userSing,
      }),
    }
  )
);
