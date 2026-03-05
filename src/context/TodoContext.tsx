import { createContext } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
  userId: string;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, description?: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);