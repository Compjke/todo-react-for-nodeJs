import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  todoAddFormSchema,
  type AddFormData,
} from '../../schemas/todoAddFormSchema';
import { useTodo } from '../Providers/TodoProvider/TodoProvider';
import s from './todo-add-form.module.css';
export const TodoAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddFormData>({
    resolver: zodResolver(todoAddFormSchema),
    defaultValues: { title: '', description: '' },
  });
  const { addTodo, isLoading, error } = useTodo();
  const { t } = useTranslation();
  const onSubmit = async ({ title, description }: AddFormData) => {
    try {
      await addTodo(title, description);
      reset();
    } catch (err) {
      console.log('err while try to Add todo ', err);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
