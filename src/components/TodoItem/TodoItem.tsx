import React, { type Dispatch } from 'react';
import type { TodoItem, TodosActions } from '../../types';
import s from './todo-item.module.css';

type Props = TodoItem & {
  dispatch: Dispatch<TodosActions<TodoItem>>;
};

const TodoItemComponent = ({
  isDone = false,
  title,
  id,
  children,
  dispatch,
}: Props) => {
  return (
    <li className={s.item}>
      <input
        onChange={(e) =>
          dispatch({
            type: 'toggle',
            payload: {
              id,
              isDone: e.target.checked,
              title,
            },
          })
        }
        type='checkbox'
        checked={isDone}
      />
      <p className={s.title}>{title}</p>
      <button
      className={s.removeBtn}
        onClick={() => {
          dispatch({ type: 'remove', payload: { id, isDone, title } });
        }}
      >
        ❌
      </button>
      {children}
    </li>
  );
};

export const TodosItem = React.memo(TodoItemComponent);
