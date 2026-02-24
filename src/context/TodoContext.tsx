import { createContext, type Dispatch } from 'react';
import type { TodosActions, TodoState } from '../types';

export const TodoContext = createContext<{
  todos: TodoState;
  dispatch: Dispatch<TodosActions>;
}>({
  todos: [],
  dispatch: () => {},
});
