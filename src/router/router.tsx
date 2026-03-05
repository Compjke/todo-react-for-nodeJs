import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { PATHS } from './routes';

const TodoPage = lazy(() => import('../pages/Todo/TodoPage'));
const LoginPage = lazy(() => import('../pages/Auth/Login/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/Register/RegisterPage'));
const router = createBrowserRouter([
  {
    path: `${PATHS.ROOT}:lng(en|ua)?`,
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ':filter',
        element: (
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        ),
      },
      { path: PATHS.LOGIN, element: <LoginPage /> },
      { path: PATHS.REGISTER, element: <RegisterPage /> },
    ],
  },
  { path: '*', element: <h3>Not found</h3> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
