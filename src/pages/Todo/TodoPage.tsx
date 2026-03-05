import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { useTodo } from '../../components/Providers/TodoProvider/TodoProvider';
import { TodoAddForm } from '../../components/TodoAddForm/TodoAddForm';
import { TodoList } from '../../components/Todolist/TodoList';
import { PATHS } from '../../router';
import s from './todo-page.module.css';
const TodoPage = () => {
  const { todos } = useTodo();
  const { t } = useTranslation();
  return (
    <div className={s.page}>
      {todos.length > 0 && (
        <nav className={s.nav}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.activeLink}` : s.link
            }
            to={PATHS.ROOT}
          >
            {t('all')}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.activeLink}` : s.link
            }
            to={PATHS.ACTIVE_TODOS}
          >
            {t('active')}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.activeLink}` : s.link
            }
            to={PATHS.COMPLETED_TODOS}
          >
            {t('completed')}
          </NavLink>
        </nav>
      )}
      <div className={s['todos-section']}>
        <TodoAddForm />
        <TodoList />
      </div>
    </div>
  );
};

export default TodoPage;
