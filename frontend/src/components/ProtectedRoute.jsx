import { Navigate } from "react-router-dom";

import { useGetUserQuery } from "../redux/features/authApi";
function ProtectedRoute({children}) {
    const {data: isUser } = useGetUserQuery();  
    if(isUser) return <>{children}</>
    if(!isUser) return <Navigate to="/login"/>
}

export default ProtectedRoute
