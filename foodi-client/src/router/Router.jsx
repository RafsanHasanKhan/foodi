import { createBrowserRouter } from 'react-router-dom';
import Main from './../layout/Main';
import Home from '../pages/Home/Home/Home';
import Menu from '../pages/Shop/Menu/Menu';
import Signup from '../components/Signup';
// import PrivateRoute from './PrivateRoute';
import UpdateProfile from '../pages/Dashboard/UpdateProfile/UpdateUserProfile';
import CartPage from '../pages/Shop/Menu/CartPage';
import Dashboard from '../layout/Dashboard';
import DashboardAdmin from '../pages/Dashboard/UpdateProfile/Admin/DashboardAdmin';
import Users from '../pages/Dashboard/UpdateProfile/Admin/Users';
import Login from '../components/Login';
const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/menu',
        element: (
          
            <Menu></Menu>
        
        ),
      },
      {
        path: '/cartPage',
        element: <CartPage></CartPage>
      },
      {
        path: '/updateProfile',
        element: <UpdateProfile></UpdateProfile>
      }
    ],
  },
  {
    path: '/signup',
    element: <Signup></Signup>,
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '',
        element: <DashboardAdmin></DashboardAdmin>
      },
      {
        path: 'users',
        element: <Users></Users>,
      }
    ]
  }
]);

export default Router;
