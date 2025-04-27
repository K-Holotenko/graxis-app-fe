/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';

import { useUserStore } from './stores/userStore';
import { ScrollRestorationWithoutPublicationPage } from './components/ScrollRestorationWithoutPublicationPage';

const App = () => {
  const { setAuthorized, initializeAuthListener } = useAuthStore();
  const { fetchUser } = useUserStore();

  // Initializes Firebase authentication listener
  // tha updates the access token in the cookie
  // and sets the authorized state
  useEffect(() => {
    const unsubscribe = initializeAuthListener();

    return () => unsubscribe();
  }, []);

  // Checks if the user is present in the DB
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await fetchUser();

        setAuthorized(!!user);
      } catch {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, [setAuthorized, fetchUser]);

  return (
    <>
      <Outlet />
      <ScrollRestorationWithoutPublicationPage />
    </>
  );
};

export default App;
