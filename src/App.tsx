import { Outlet } from 'react-router';
import './App.css';
import { Header } from './components/Header/Header';
import { TodoAddForm } from './components/TodoAddForm/TodoAddForm';
import { TodoProvider } from './components/TodoProvider/TodoProvider';
export default function App() {
  return (
    <TodoProvider>
      <Header />
      <div className='todo'>
        <h1>SIMPLE TODO APP</h1>
        <div className='container'>
          <TodoAddForm />
          <Outlet />
        </div>
      </div>
    </TodoProvider>
  );
}
