import api from "@/axios/axios";
import { FirebaseUserResponse, IUser } from "@/types/type";
import { message } from "antd";
import { AxiosResponse } from "axios";
import { get } from "http";



export class CLogin {
  public user: IUser | null = null;
  public userSing: FirebaseUserResponse | null = null;
  constructor() {
    this.user = null;
    this.userSing = null;
  }

  public getUser() {
     return this.user;
  }
  public getUserSing() {
    return this.userSing;
  }

  private setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  public async loginUserApi(username: string, password: string): Promise<AxiosResponse<any, any>> {
    try {
     const response = api.post('/login', {
        email: username,
        senha: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.user ={email: username, token: (await response).data};
      this.setToken((await response).data);
     await this.loginUser();
      //@ts-ignore
      return response || null;
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      return Promise.reject(error);
    }
  }
  public async verifyFirebaseToken(): Promise<AxiosResponse<any, any>> {
    try {
      const response = await api.post('/api/auth/firebase', {
      });
      // this.token = response.data.token;
      return response;
    } catch (error) {
      console.log("Erro ao verificar token Firebase:", error);
      return Promise.reject(error);
    }
  }
  

  public async createdUser(username: string, password: string): Promise<AxiosResponse<any, any>> {
    try {
      const response = await api.post('/api/create-user', {
        email: username,
        senha: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
public async sendResetLink(email: string): Promise<AxiosResponse<any, any>> {
  try {
    const response = await api.post('/api/send-reset-link', { email }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    message.success("Link de redefinição de senha enviado com sucesso.");
    return response;
  } catch (error) {
    message.error("Erro ao enviar link de redefinição de senha.");
    return Promise.reject(error);
  }
}
 public async loginUser() {
    const getAuthToken =  localStorage.getItem('authToken');
    if (getAuthToken) {
    await this.verifyFirebaseToken().then((response) => {
          this.userSing = response.data;
      });
    } else {
      console.log("Nenhum token de autenticação encontrado.");
    }
}

  // public logondUser() {}
}

export const clogin = new CLogin();