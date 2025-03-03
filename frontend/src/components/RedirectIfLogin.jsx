import { Navigate } from "react-router-dom";

import { useGetUserQuery } from "../redux/features/authApi";
function RedirectIfLogin({children}) {
    const {data: isUser } = useGetUserQuery();
    if(!isUser) return <>{children}</>
    if(isUser) return <Navigate to="/"/>
}

export default RedirectIfLogin
