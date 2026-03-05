import { useTranslation } from 'react-i18next';
import { RegisterForm } from '../../../components/Auth/RegisterForm';
import s from './register.module.css';

const RegisterPage = () => {
  const {t} = useTranslation()
  return (
    <div className={s.wrapper}>
      <h2>{t('register')}</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
