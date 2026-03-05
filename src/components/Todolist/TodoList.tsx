import { useParams } from 'react-router';
import { useTodo } from '../Providers/TodoProvider/TodoProvider';
import { TodosItem } from '../TodoItem/TodoItem';
import s from './todo-list.module.css';
export const TodoList = () => {
  const { todos, isLoading, error } = useTodo();
  const { filter = 'all' } = useParams<{
    filter: 'all' | 'active' | 'completed';
  }>();

  if (isLoading) return <p>Loading todos...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.isDone;
    if (filter === 'completed') return t.isDone;
    return true;
  });

  return (
    <ul className={s.list}>
      {filteredTodos.map((todo) => (
        <TodosItem key={todo._id} {...todo} />
      ))}
      {filteredTodos.length === 0 && <p className={s.empty}>No todos found</p>}
    </ul>
  );
};
