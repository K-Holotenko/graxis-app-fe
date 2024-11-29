/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import CookieService from 'src/services/CookieService';
import { useAuthStore } from 'src/stores/authStore';

import { router } from './router';

const App = () => {
  const { setAuthorized } = useAuthStore();
  console.log('App');
  useEffect(() => {
    const accessToken = CookieService.getCookie('accessToken');

    if (accessToken) setAuthorized(true);
  }, [setAuthorized]);

  return <RouterProvider router={router} />;
};

export default App;
