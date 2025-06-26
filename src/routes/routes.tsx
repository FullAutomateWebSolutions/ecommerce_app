
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';
import AppWeb from '../App.web';
import ErrorPage from '../pages/Error404';
import AuthPage from '../pages/autenticacao';
import HomePageWeb from '../pages/HomePage.web';
import ErrorPage404 from '../pages/Error404';
import ErrorPage403 from '../pages/Error403';
import LeitorPage from '../pages/LeitorPage';

/*Passagens do sistemas rotas existentes */
const router = createBrowserRouter([
  {
    // Rota principal
    path: "/",    element: (<AuthProvider ><PrivateRoute><HomePageWeb/></PrivateRoute></AuthProvider>),
    //Rotas privadas
    children: [
     {        path :"cadastro", element: (    <AuthProvider ><PrivateRoute roleUser='Admin'><AppWeb/>  </PrivateRoute></AuthProvider>),},    
     {        path: "sair", element: ( <AuthProvider ><PrivateRoute roleUser='Admin'><App/>     </PrivateRoute></AuthProvider>),}, 
     {        path: "scan", element: ( <AuthProvider ><PrivateRoute roleUser='Admin'><LeitorPage/>     </PrivateRoute></AuthProvider>),}, 
     { path: '404', element:           <AuthProvider ><PrivateRoute roleUser='Admin'><ErrorPage404/></PrivateRoute></AuthProvider>  },
     { path: '403', element:           <AuthProvider ><PrivateRoute roleUser='Admin'><ErrorPage403/></PrivateRoute></AuthProvider>  },
     { path: '*', element:             <AuthProvider ><PrivateRoute roleUser='Admin'><ErrorPage/></PrivateRoute></AuthProvider>  }
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
