import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedComponent = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedComponent;
