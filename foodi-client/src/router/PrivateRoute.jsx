import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";


const PrivateRoute = ({children}) => {
const {user, loading} = useAuth();
const location = useLocation();
  if(loading) {
   return <LoadingSpinner></LoadingSpinner>
  }
  if(user) {
    return children;
  }

  return <Navigate to='/signup' state={{from: location}} replace></Navigate>

}
export default PrivateRoute;