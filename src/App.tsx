import { RouterProvider } from 'react-router-dom';
/// <reference types="vite-plugin-svgr/client" />
import { router } from './router';
import { useEffect } from 'react';
import CookieService from 'services/CookieService';
import { useAuthStore } from 'stores/authStore';

const App = () => {
  const { setAuthorized } = useAuthStore();

  useEffect(() => {
    const accessToken = CookieService.getCookie('accessToken');

    if (accessToken) setAuthorized(true);
  }, [setAuthorized]);

  return <RouterProvider router={router} />;
};

export default App;
