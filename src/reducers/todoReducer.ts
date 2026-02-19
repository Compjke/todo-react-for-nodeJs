import type { TodosActions, TodoState } from '../types';

export const todoReducer = (state: TodoState, action: TodosActions) => {
  switch (action.type) {
    case 'add': {
      const newTodo = action.payload;
      return [...state, newTodo];
    }
    case 'remove':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isDone: action.payload.isDone }
          : todo,
      );

    default:
      return state;
  }
};
