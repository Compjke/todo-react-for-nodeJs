import { useContext, useMemo } from 'react';
import { useParams } from 'react-router';
import { TodoContext } from '../../context/TodoContext';
import type { TodoFilter } from '../../types';
import { TodosItem } from '../TodoItem/TodoItem';
import s from './todo-list.module.css';

export const TodoList = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const { filter = 'all' } = useParams<{ filter: TodoFilter }>();

  const activeCount = useMemo(
    () => todos.filter((t) => !t.isDone).length,
    [todos],
  );

  const filteredTodos = useMemo(() => {
    console.log('Filtering todos...');
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.isDone);
      case 'completed':
        return todos.filter((todo) => todo.isDone);
      default:
        return todos;
    }
  }, [filter, todos]);
  const visibleTodos = useMemo(() => {
    return [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title));
  }, [filteredTodos]);

  return (
    <div>
      <ul className={s.list}>
        {visibleTodos.length === 0 ? (
          <p className={s.empty}>No todos</p>
        ) : (
          visibleTodos.map((item) => (
            <TodosItem
              id={item.id}
              key={item.id}
              isDone={item.isDone}
              title={item.title}
              dispatch={dispatch}
            />
          ))
        )}
      </ul>
      <p className={s.count}>{activeCount} active tasks left</p>
    </div>
  );
};
