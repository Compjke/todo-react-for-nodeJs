import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';
import { TodoList } from '../components/Todolist/TodoList';
import { PATHS } from './routes';

const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <App />,

    children: [
      { index: true, element: <TodoList /> },
      { path: ':filter', element: <TodoList /> },
    ],
  },
  { path: '*', element: <h3>Not found</h3> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
