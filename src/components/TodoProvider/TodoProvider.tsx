import { useEffect, useReducer, type ReactNode } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { todoReducer } from '../../reducers/todoReducer';
import type { TodoItem } from '../../types';



export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [persisted, setPersisted] = useLocalStorage<TodoItem[]>(
    'todos',
    [],
  )
  console.log({persisted, setPersisted} )
  const [todos, dispatch] = useReducer(
    todoReducer,
    persisted,
  );

  useEffect(() => {
    setPersisted(todos);
  }, [todos, setPersisted]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
