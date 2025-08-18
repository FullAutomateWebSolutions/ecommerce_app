
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import { AuthProvider } from '../contexts/AuthContext';
import AppWeb from '../App.web';
import ErrorPage from '../pages/Error404';
import AuthPage from '../pages/autenticacao';
import ErrorPage404 from '../pages/Error404';
import ErrorPage403 from '../pages/Error403';
import LeitorPage from '../pages/LeitorPage';
import Logout from '@/pages/Logout';
import User from '@/pages/User/user';
import Cadastro from '@/pages/Product/ProductMarketCards';
import Store from '@/pages/Store/store';
import Inventory from '@/pages/Inventory/Inventory';
import Product from '@/pages/Product/Product';
import Emotion from '@/pages/Emotion/Emotion';

/*Passagens do sistemas rotas existentes */
const router = createBrowserRouter([
  {
    // Rota principal
    path: "/",    element: (<AuthProvider ><PrivateRoute roleUser='public'><AppWeb/></PrivateRoute></AuthProvider>),
    //Rotas privadas
    children: [
     {        path :"inventario", element: (<AuthProvider ><PrivateRoute roleUser='public'>  <Inventory/></PrivateRoute></AuthProvider>),},    
     {        path: "sair", element: ( <AuthProvider ><PrivateRoute roleUser='public'>  <Logout/>     </PrivateRoute></AuthProvider>),}, 
     {        path: "scan", element: ( <AuthProvider ><PrivateRoute roleUser='user'>    <LeitorPage/>     </PrivateRoute></AuthProvider>),}, 
     {        path: "perfil", element:( <AuthProvider ><PrivateRoute roleUser='admin'>  <User/>     </PrivateRoute></AuthProvider>),}, 
     {        path: "cadastro", element:(<AuthProvider ><PrivateRoute roleUser='user'>  <Product/>     </PrivateRoute></AuthProvider>),}, 
     {        path: "loja", element: ( <AuthProvider ><PrivateRoute roleUser='user'>    <Store/>   </PrivateRoute></AuthProvider>),}, 
     {        path: "emotion", element: ( <AuthProvider ><PrivateRoute roleUser='alex'>    <Emotion/>   </PrivateRoute></AuthProvider>),}, 
     { path: '404', element:           <AuthProvider ><PrivateRoute roleUser='public'>  <ErrorPage404/></PrivateRoute></AuthProvider>  },
     { path: '403', element:           <AuthProvider ><PrivateRoute roleUser='public'>  <ErrorPage403/></PrivateRoute></AuthProvider>  },
     { path: '*', element:             <AuthProvider ><PrivateRoute roleUser='public'>  <ErrorPage/></PrivateRoute></AuthProvider>  }
    ],
    }, //Rota publica
    { path: 'login', element: <AuthPage />  },
    { path: '*', element: <ErrorPage />  },
   
    
]);
export default router;

// import { createBrowserRouter } from 'react-router-dom';
// import PrivateRoute from './privateRoutes';


// import App from '../App';
// import AuthPage from '../pages/autenticacao';
// import HomePageWeb from '../pages/HomePage.web';
// import ErrorPage from '../pages/Error';
// import ProtectedLayout from '../pages/ProtectedLayout';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <ProtectedLayout />, // <AuthProvider> aqui
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: (
//           <PrivateRoute role="Admin">
//             <HomePageWeb />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "painel",
//         element: (
//           <PrivateRoute role="Admin">
//             <HomePageWeb />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "sair",
//         element: (
//           <PrivateRoute role="Admin">
//             <App />
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <AuthPage />,
//   },
//   {
//     path: "*",
//     element: <ErrorPage />,
//   },
// ]);

// export default router;
