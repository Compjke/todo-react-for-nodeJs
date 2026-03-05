import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { PATHS } from '../../router';
import {
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from '../../schemas/authSchema';
import { useAuth } from '../Providers/AuthProvider/AuthProvider';
import s from './auth.module.css';
export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      password: '',
      userName: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
  });
  const [serverError, setServerError] = useState('');
  const { t } = useTranslation();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');
    const { password, userName } = data;
    try {
      await registerUser(userName, password);
      navigate(PATHS.LOGIN);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Unknown error';
      setServerError(errorMessage);
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

      <input
        className={s.field}
        type='password'
        {...register('confirmPassword')}
        placeholder={t('confirmPassword')}
      />
      {errors.confirmPassword && (
        <span className={s.error}>{errors.confirmPassword.message}</span>
      )}

      {serverError && <p className={s.error}>{serverError}</p>}
      <button type='submit'>{t('createAccount')}</button>
    </form>
  );
};
