import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import LandingPage from "../components/LandingPage"
import UserHome from '../components/UserHome';
import Layout from './Layout';



export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,

      },
      {
        path:"/home",
        element:<UserHome />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
    ],
  },
]);
