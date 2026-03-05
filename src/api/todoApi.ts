import api from './axiosInstance';
import type { TodoItem } from '../types';

export const todoApi = {
  getTodos: () => api.get<TodoItem[]>('/todos'),

  addTodo: (title: string, description?: string) =>
    api.post<{ todo: TodoItem }>('/todos', { title, description }),

  updateTodo: (id: string, updates: Partial<TodoItem>) =>
    api.patch<{ todo: TodoItem }>(`/todos/${id}`, updates),

  deleteTodo: (id: string) => api.delete(`/todos/${id}`),
};