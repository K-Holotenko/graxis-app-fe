/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';
import { router } from 'src/router';
import { useUserStore } from 'src/stores/userStore';

const App = () => {
  const { setAuthorized, initializeAuthListener } = useAuthStore();
  const { fetchUser } = useUserStore();

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

  return <RouterProvider router={router} />;
};

export default App;
