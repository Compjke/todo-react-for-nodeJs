import { useContext, useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { todoApi } from '../../../api/todoApi';
import { TodoContext } from '../../../context';
import type { TodoItem } from '../../../types';
import { useAuth } from '../AuthProvider/AuthProvider';

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await todoApi.getTodos();
      setTodos(data);
    } catch (err: any) {
      setError(t('error', { message: err.message }));
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string, description?: string) => {
    setError(null);
    try {
      const { data } = await todoApi.addTodo(title, description);
      setTodos((prev) => [...prev, data.todo]);
      return data;
    } catch (err: any) {
      setError(t('error', { message: err.message }));
      throw err;
    }
  };

  const updateTodo = async (id: string, updates: Partial<TodoItem>) => {
    setError(null);
    setIsLoading(true);
    try {
      const { data } = await todoApi.updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? data.todo : t)));
    } catch (err: any) {
      setError(t('error', { message: err.message }));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err: any) {
      setError(t('error', { message: err.message }));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, isLoading, error }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be used within TodoProvider');
  return context;
};
