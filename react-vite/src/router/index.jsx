import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import LandingPage from "../components/LandingPage"
import UserHome from '../components/UserHome';
import AlbumDetails from '../components/AlbumDetails/AlbumDetails';
import CartPage from '../components/CartPage';
import Layout from './Layout';
import CreateAlbum from '../components/CreateAlbum/CreateAlbum'
import AddProducts from '../components/AddProducts/AddProducts';



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
        path: '/albums/new',
        element: <CreateAlbum />
      },
      {
        path:"/shoppingCart",
        element: <CartPage />
      },
      {
        path:"/albums/:album_id/products",
        element: <AddProducts />
      }
    ],
  },
]);
