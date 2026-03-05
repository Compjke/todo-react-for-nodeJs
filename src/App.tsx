import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router';
import './App.css';
import { Header } from './components/Header/Header';
import { TodoProvider } from './components/Providers/TodoProvider/TodoProvider';
import i18n from './i18n';
export default function App() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const currentLng = i18n.language;
    if (window.location.pathname === '/') {
      navigate(`/${currentLng}`);
    }
  }, []);

  return (
    <TodoProvider>
      <Header />
      <main className='todo'>
        <h1>{t('title')}</h1>
        <div className='container'>
          <Outlet />
        </div>
      </main>
    </TodoProvider>
  );
}
