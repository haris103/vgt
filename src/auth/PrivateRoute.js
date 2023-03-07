import UserAuthentication from "../auth/userAuthentication";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const auth = UserAuthentication();
  return auth ? children : <Navigate to="/" />;
}
export default PrivateRoute;
