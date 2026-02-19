import React, { type Dispatch, type ReactNode } from 'react';
import type { TodoItem, TodosActions } from '../../types';
import s from './todo-item.module.css';

type Props = TodoItem & {
  dispatch: Dispatch<TodosActions>;
  children?: ReactNode;
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
          dispatch({ type: 'remove', payload: { id } });
        }}
      >
        ❌
      </button>
      {children}
    </li>
  );
};

export const TodosItem = React.memo(TodoItemComponent);
