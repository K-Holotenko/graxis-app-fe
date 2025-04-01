/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import CookieService from 'src/services/CookieService';
import { useAuthStore } from 'src/stores/authStore';

import { router } from './router';
import { useUserStore } from './stores/userStore';

const App = () => {
  const { setAuthorized } = useAuthStore();
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const accessToken = CookieService.getCookie('accessToken');

    if (accessToken) setAuthorized(true);
  }, [setAuthorized]);

  return <RouterProvider router={router} />;
};

export default App;
