/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';
import { useSocketConnection } from 'src/hooks/useSocketConnection';

import { ScrollRestorationConfig } from './components/ScrollRestorationConfig';
import { ROUTES } from './router/routes';

const App = () => {
  const { initializeAuthListener } = useAuthStore();
  const location = useLocation();

  useSocketConnection();

  const skipInit = [
    ROUTES.LOGIN,
    ROUTES.REGISTRATION,
    ROUTES.ADD_USER_INFO,
    ROUTES.ACTION,
  ].includes(location.pathname);

  useEffect(() => {
    if (skipInit) return;
    const unsubscribe = initializeAuthListener();

    return () => unsubscribe();
  }, [initializeAuthListener, skipInit]);

  return (
    <>
      <Outlet />
      <ScrollRestorationConfig />
    </>
  );
};

export default App;
