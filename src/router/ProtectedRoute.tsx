import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

//route available only when user is logged in
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to='/login' />;
}
