import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import LandingPage from "../components/LandingPage"
import UserHome from '../components/UserHome';
import AlbumDetails from '../components/AlbumDetails/AlbumDetails';
import CheckoutPage from '../components/CheckoutPage';
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
        path:"/albums/:albumId",
        element:<AlbumDetails />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path:"/checkout",
        element: <CheckoutPage />,
      },
    ]
  },
]);
