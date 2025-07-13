/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';

import { ScrollRestorationConfig } from './components/ScrollRestorationConfig';
import { ROUTES } from './router/routes';

const App = () => {
  const { initializeAuthListener } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const shouldInitialize =
      location.pathname !== ROUTES.LOGIN ||
      location.pathname !== ROUTES.REGISTRATION ||
      location.pathname !== ROUTES.ADD_USER_INFO;

    if (shouldInitialize) {
      const unsubscribe = initializeAuthListener();

      return () => unsubscribe();
    }
  }, [initializeAuthListener]);

  return (
    <>
      <Outlet />
      <ScrollRestorationConfig />
    </>
  );
};

export default App;
