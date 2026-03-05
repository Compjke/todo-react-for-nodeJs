import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { PATHS } from '../../router';
import { useAuth } from '../Providers/AuthProvider/AuthProvider';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <div>Loading protected route...</div>;
  if (
    !user &&
    location.pathname !== PATHS.LOGIN &&
    location.pathname !== PATHS.REGISTER
  )
    return <Navigate to={PATHS.LOGIN} replace />;

  return children;
};
