import {
  useContext,
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from 'react';
import { TodoContext } from '../../context/TodoContext';
import s from './todo-add-form.module.css';
export const TodoAddForm = () => {
  const { dispatch } = useContext(TodoContext);
  const [error, setError] = useState<string | null>(null);
  const [todoTitle, setTodoTitle] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(null);
    setTodoTitle(e.target.value);
  };

  const handleAddTodo: SubmitEventHandler<HTMLFormElement> = (e) => {
    setError(null);
    e.preventDefault();
    if (!todoTitle) {
      setError('Please enter title of the todo');
      return;
    }
    dispatch({
      type: 'add',
      payload: {
        id: Date.now(),
        title: todoTitle,
        isDone: false,
      },
    });
    setTodoTitle('');
  };
  return (
    <>
      <form className={s.form} onSubmit={handleAddTodo}>
        <input
          className={s.input}
          id='title-todo'
          type='text'
          value={todoTitle}
          onChange={handleChange}
          placeholder='Enter todo title'
        />

        <button type='submit'>Add</button>
      </form>
      {error && <span className={s.error}>{error}</span>}
    </>
  );
};
