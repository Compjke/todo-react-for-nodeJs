import React from 'react';
import type { TodoItem } from '../../types';
import { useTodo } from '../Providers/TodoProvider/TodoProvider';
import s from './todo-item.module.css';

const TodoItemComponent = ({
  isDone = false,
  title,
  _id,
  description,
}: TodoItem) => {
  const { deleteTodo, updateTodo } = useTodo();

  return (
    <li className={s.item}>
      <input
        className={s.checkbox}
        onChange={(e) => updateTodo(_id, { isDone: e.target.checked })}
        type='checkbox'
        checked={isDone}
      />

      <div className={s.todo_details}>
        <p className={s._id}>Id: {_id}</p>
        <p className={s.title}>Title : {title}</p>
        {description && (
          <p className={s.description}>Description : {description}</p>
        )}
      </div>

      <button className={s.removeBtn} onClick={() => deleteTodo(_id)}>
        ❌
      </button>
    </li>
  );
};

export const TodosItem = React.memo(TodoItemComponent);
