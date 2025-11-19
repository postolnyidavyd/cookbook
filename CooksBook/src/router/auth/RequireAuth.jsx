import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const location = useLocation();
  if (!isAuth)
    return <Navigate to="/register" state={{ from: location }} />;
  return <Outlet />;
};
export default RequireAuth;
