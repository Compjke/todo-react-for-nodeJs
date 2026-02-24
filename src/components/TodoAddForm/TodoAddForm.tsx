import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TodoContext } from '../../context/TodoContext';
import {
  todoAddFormSchema,
  type AddFormData,
} from '../../schemas/todoAddFormSchema';
import s from './todo-add-form.module.css';
export const TodoAddForm = () => {
  const { dispatch } = useContext(TodoContext);

  const {
    // reset,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    resolver: zodResolver(todoAddFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const handleAddTodo = async (data: AddFormData) => {
    dispatch({
      type: 'add',
      payload: {
        id: crypto.randomUUID(),
        title: data.title,
        isDone: false,
      },
    });
    // reset()
    setValue('title', '', { shouldDirty: false, shouldValidate: false });
    setFocus('title');
  };
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(handleAddTodo)}>
        <input
          {...register('title')}
          readOnly={isSubmitting}
          className={`${s.input} ${errors.title ? s.errorInput : ''}`}
          placeholder='Enter todo title'
        />

        <button disabled={isSubmitting} type='submit'>
          {isSubmitting ? 'Process...' : 'Add'}
        </button>
      </form>
      {errors.title && <span className={s.error}>{errors.title.message}</span>}
    </>
  );
};
