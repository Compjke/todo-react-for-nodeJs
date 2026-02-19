import './App.css';
import { TodoAddForm } from './components/TodoAddForm/TodoAddForm';
import { TodoList } from './components/Todolist/TodoList';
import { TodoProvider } from './components/TodoProvider/TodoProvider';
export default function App() {
  return (
    <TodoProvider>
      <div className='todo'>
        <h1>SIMPLE TODO APP</h1>
        <div className='container'>
          <TodoAddForm />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}
