import { createContext, type Dispatch } from 'react';
import type { TodoItem, TodosActions, TodoState } from '../types';

export const TodoContext = createContext<{
  todos: TodoState;
  dispatch: Dispatch<TodosActions<TodoItem>>;
}>({
  todos: [],
  dispatch: () => {},
});
