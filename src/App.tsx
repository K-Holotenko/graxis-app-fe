/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';

import { useUserStore } from './stores/userStore';
import { ScrollRestorationConfig } from './components/ScrollRestorationConfig';

const App = () => {
  const { initializeAuthListener } = useAuthStore();
  const { fetchUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = initializeAuthListener(fetchUser);

    return () => unsubscribe();
  }, [initializeAuthListener, fetchUser]);

  return (
    <>
      <Outlet />
      <ScrollRestorationConfig />
    </>
  );
};

export default App;
