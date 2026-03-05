import { Trans, useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router';
import { PATHS } from '../../router';
import { useAuth } from '../Providers/AuthProvider/AuthProvider';
import s from './header.module.css';

export const Header = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    const newPath = pathname.replace(/^\/(en|ua)?/, `/${lng}`);
    navigate(newPath || `/${lng}`);
    i18n.changeLanguage(lng);
  };
  return (
    <header className={s.header}>
      {user ? (
        <div className={s.authenticated_nav_menu}>
          <p>
            <Trans i18nKey='hello'>
              {/*@ts-ignore */}
              <span className={s.userName}>{{ name: user.userName }}</span>
            </Trans>
          </p>
          <button onClick={logout}>{t('logout')}</button>
        </div>
      ) : pathname === PATHS.LOGIN || pathname === PATHS.REGISTER ? (
        <Link to={pathname === PATHS.LOGIN ? PATHS.REGISTER : PATHS.LOGIN}>
          {pathname === PATHS.LOGIN ? t('register') : t('login')}
        </Link>
      ) : null}
      <select
        className={s.lang}
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
      >
        <option value='en'>En</option>
        <option value='ua'>Ukr</option>
      </select>
    </header>
  );
};
