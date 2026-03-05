import { useTranslation } from 'react-i18next';
import { LoginForm } from '../../../components/Auth/LoginForm';
import s from './login-page.module.css';
const LoginPage = () => {
  const {t} = useTranslation()
  return (
    <div className={s.wrapper}>
      <h2>{t('login')}</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
