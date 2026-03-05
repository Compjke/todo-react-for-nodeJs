import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { loginSchema, type LoginFormData } from '../../schemas/authSchema';
import { useAuth } from '../Providers/AuthProvider/AuthProvider';
import s from './auth.module.css';
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      password: '',
      userName: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const [serverError, setServerError] = useState('');
  const { t } = useTranslation();
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');
    const { password, userName } = data;
    try {
      await loginUser(userName, password);
      navigate('/');
    } catch (err: any) {
      console.log('error in form ', err);
      const errorMessage =
        err.response?.data?.message || err.message || 'Unknown error';
      setServerError(t('error', { message: errorMessage }));
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={s.field}
        type='text'
        {...register('userName')}
        placeholder={t('username')}
      />
      {errors.userName && (
        <span className={s.error}>{errors.userName.message}</span>
      )}
      <input
        className={s.field}
        type='password'
        {...register('password')}
        placeholder={t('password')}
      />
      {errors.password && (
        <span className={s.error}>{errors.password.message}</span>
      )}

      {serverError && <p className={s.error}>{serverError}</p>}
      <button type='submit'>{t('login')}</button>
    </form>
  );
};
