import { Outlet, useLocation, Navigate } from 'react-router-dom';

const isAuth = false;
const RequireAuth = () => {
  const location = useLocation();
  if (!isAuth)
    return <Navigate to="/register" replace state={{ from: location }} />;
  return <Outlet />;
};
export default RequireAuth

