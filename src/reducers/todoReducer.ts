import type { TodoItem, TodosActions, TodoState } from '../types';

export const todoReducer = (
  state: TodoState,
  action: TodosActions<TodoItem>,
) => {
  switch (action.type) {
    case 'add': {
      const newTodo = action.payload;
      return [...state, newTodo];
    }
    case 'remove':
      return state.filter((todo) => todo.id !== action.payload.id);

    case 'toggle':
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });

    default:
      return state;
  }
};
