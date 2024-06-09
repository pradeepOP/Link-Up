import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to="/" /> : <Outlet />;
};
export default ProtectedRoute;
