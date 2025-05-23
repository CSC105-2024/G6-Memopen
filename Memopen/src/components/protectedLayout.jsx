import { Outlet, Navigate  } from "react-router-dom";
function ProtectedLayout (){
    const isLoggedIn = !!localStorage.getItem("username");
    if(!isLoggedIn){
        return <Navigate to="/" replace/>
    }
    return <Outlet/>
}
export default ProtectedLayout;
