// /// <reference types="vite-plugin-svgr/client" />
// import { useEffect } from 'react';
// import { RouterProvider } from 'react-router-dom';

// import CookieService from 'src/services/CookieService';
// import { useAuthStore } from 'src/stores/authStore';

// import { router } from './router';
// import { useUserStore } from './stores/userStore';

// const App = () => {
//   const { setAuthorized } = useAuthStore();
//   const { fetchUser } = useUserStore();

//   useEffect(() => {
//     fetchUser();
//   }, []);
//   const { user, fetchUser } = useUserStore();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const accessToken = CookieService.getCookie('accessToken');

//       if (accessToken) {
//         try {
//           await fetchUser();
//           setAuthorized(!!user);
//         } catch {
//           setAuthorized(false);
//           CookieService.deleteCookie('accessToken');
//         }
//       } else {
//         setAuthorized(false);
//       }
//     };

//     checkAuth();
//   }, [setAuthorized, fetchUser]);

//   return <RouterProvider router={router} />;
// };

// export default App;

/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import CookieService from 'src/services/CookieService';
import { useAuthStore } from 'src/stores/authStore';

import { router } from './router';
import { useUserStore } from './stores/userStore';

const App = () => {
  const { setAuthorized } = useAuthStore();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = CookieService.getCookie('accessToken');

      if (accessToken) {
        try {
          await fetchUser();
          setAuthorized(!!user);
        } catch {
          setAuthorized(false);
          CookieService.deleteCookie('accessToken');
        }
      } else {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, [setAuthorized, fetchUser]);

  return <RouterProvider router={router} />;
};

export default App;
