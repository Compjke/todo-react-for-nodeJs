import { NavLink } from 'react-router';
import { PATHS } from '../../router';
import s from './header.module.css';
const links = [
  { label: 'Home', path: PATHS.ROOT },
  { label: 'Active', path: PATHS.ACTIVE_TODOS },
  { label: 'Completed', path: PATHS.COMPLETED_TODOS },
] as const;

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            className={({ isActive }) =>
              isActive ? `${s.active} ${s.link}` : `${s.link}`
            }
            to={link.path}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
