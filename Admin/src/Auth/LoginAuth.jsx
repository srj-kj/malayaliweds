/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminAuth() {
  const user = useSelector((state) => state?.app);
  return user.isLogged ?  <Outlet />:<Navigate to="/admin/login" /> 
}

function LoggedOut(){
    const user = useSelector((state) => state?.app);
    return user.isLogged ? <Navigate to="/admin" /> :<Outlet/>
}

export { AdminAuth, LoggedOut };