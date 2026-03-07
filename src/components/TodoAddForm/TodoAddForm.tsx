import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  todoAddFormSchema,
  type AddFormData,
} from '../../schemas/todoAddFormSchema';
import { useTodo } from '../Providers/TodoProvider/TodoProvider';
import s from './todo-add-form.module.css';

export const TodoAddForm = () => {
  const [formKey, setFormKey] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddFormData>({
    resolver: zodResolver(todoAddFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { addTodo, isLoading, error } = useTodo();
  const { t } = useTranslation();

  const onSubmit = async (data: AddFormData) => {
    try {
      const res = await addTodo(data.title, data.description);
      setFormKey((prev) => prev + 1);
      if (res.todo) {
        reset(
          {
            title: '',
            description: '',
          },
          {
            keepErrors: false,
            keepDirty: false,
            keepTouched: false,
          },
        );
      }
    } catch (err) {
      console.log('error adding todo', err);
    }
  };

  return (
    <form key={formKey} className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        disabled={isLoading}
        className={s.input}
        {...register('title')}
        placeholder={t('todoTitle')}
      />

      {errors.title && <span className={s.error}>{errors.title.message}</span>}

      <input
        disabled={isLoading}
        className={s.input}
        {...register('description')}
        placeholder={t('description')}
      />

      {errors.description && (
        <span className={s.error}>{errors.description.message}</span>
      )}

      <button disabled={isLoading} type='submit'>
        {isLoading ? '...Adding' : t('add')}
      </button>

      {error && <span className={s.error}>{error}</span>}
    </form>
  );
};
