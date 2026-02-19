import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodosItem } from '../TodoItem/TodoItem';
import s from './todo-list.module.css';

export const TodoList = () => {
  const { todos, dispatch } = useContext(TodoContext);

  if(!todos.length) {
    return <p className={s.empty}>No todos yet</p>
  }

  return (
    <ul className={s.list}>
      {todos.map((item) => (
        <TodosItem
          id={item.id}
          key={item.id}
          isDone={item.isDone}
          title={item.title}
          dispatch={dispatch}
        />
      ))}
    </ul>
  );
};
