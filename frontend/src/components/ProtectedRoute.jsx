import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "../redux/features/authApi";

function ProtectedRoute({ children }) {
  const { data: isUser, isLoading } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true, // This forces refetch on mount
    pollingInterval: 0, // Disable polling if not needed
  });

  if (isLoading) return <div>Loading...</div>;

  if (isUser) return <>{children}</>;

  return <Navigate to="/login" />;
}

export default ProtectedRoute;
