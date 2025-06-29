import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Form, Input, Button, Typography, message, Card } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CLogin } from "../module/login.entity";
import { loginStore } from "@/store/useStore";


const AuthPage = () => {
  const navegate = useNavigate();
  const {fech,loginUser,user, userSing}= loginStore();
  const [modo, setModo] = useState<"login" | "cadastro">("login");

  useEffect(() => {
    fech();
  }, [userSing, user]); /// tem que monitorar o userSing/user pois é ele que tem os dados do usuário logado

  const onFinish = async ({email,senha}:{email: string, senha: string}) => {
    try {
    if (modo === "login") {
      await loginUser(email, senha)   
    }
    // Adicione lógica para cadastro aqui, se necessário
       navegate("/");
  } catch (error: any) {
       alert("Usuário ou senha incorretos. (" + error.message + " )");
    alert("Erro ao autenticar: " + error);
  }
  }  
  
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title={modo === "login" ? "Login" : "Cadastro"}
        style={{ width: 360 }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {modo === "login" ? "Entrar" : "Cadastrar"}
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph style={{ textAlign: "center" }}>
          {modo === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
          <a onClick={() => setModo(modo === "login" ? "cadastro" : "login")}>
            {modo === "login" ? "Cadastre-se" : "Faça login"}
          </a>
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default AuthPage;

//  1. Via painel do Firebase (console web)
// Acesse https://console.firebase.google.com

// Selecione seu projeto.

// No menu lateral, vá em Authentication > Usuários.

// Clique em Adicionar usuário.

// Preencha email e senha — pronto! ✅

// ✅ Soluções possíveis:
// 1. Verifique se o Firebase Auth está habilitado no Console
// Vá até o Firebase Console.

// Acesse o projeto.

// Vá em "Authentication" > "Método de login".

// Habilite o E-mail e senha.

// 2. Verifique se você está usan
