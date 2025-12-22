import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loder from "./Loder";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useSelector((state) => state.auth);
  
   
  console.log("isAuthenticated",isAuthenticated,"authLoading",authLoading)


  if (authLoading) {
    return <Loder/>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
