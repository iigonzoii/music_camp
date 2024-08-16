import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import LandingPage from "../components/LandingPage"
import UserHome from '../components/UserHome';
import AlbumDetails from '../components/AlbumDetails/AlbumDetails';
// import CheckoutPage from '../components/CheckoutPage';
import Layout from './Layout';
import CreateAlbum from '../components/CreateAlbum/CreateAlbum'
import AddProducts from '../components/AddProducts/AddProducts';
import UpdateAlbum from '../components/UpdateAlbum/UpdateAlbum';
// import CartModal from '../components/CartModal/CartModal';
import CartItemsList from '../components/CartModal/CartItems';
import UpdateProducts from '../components/UpdateProducts/UpdateProducts';


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
        element: <LoginFormPage />
      },
      {
        path: '/albums/new',
        element: <CreateAlbum />
      },
      // {
      //   path:"/checkout",
      //   element: <CheckoutPage />,
      // },
      {
        path:"/albums/:album_id/products",
        element: <AddProducts />
      },
      {
        path:"/albums/:album_id/edit-albums",
        element: <UpdateAlbum />
      },
      {
        path:"/albums/:album_id/edit-products",
        element: <UpdateProducts />
      },
      {
        path:"/shoppingCart",
        element: <CartItemsList />
      }
    ],
  },
]);
