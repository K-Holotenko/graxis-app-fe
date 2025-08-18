// src/services/api.ts

import axios from 'axios';

import { firebaseAuth } from 'src/config/firebase';
import { useAuthStore } from 'src/stores/authStore';

import { updateAuthTokenOnTheServer } from './AuthService';

// Create an axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_GRAXIS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor: Handle FormData content type
api.interceptors.request.use(
  (config) => {
    // Handle FormData: remove Content-Type to let browser set multipart/form-data
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  // If the response is successful, just return it
  (response) => response,
  // If we get an error, handle it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we are retrying this request

      try {
        const currentUser = firebaseAuth.currentUser;

        if (currentUser) {
          // 1. Force a token refresh
          const newToken = await currentUser.getIdToken(true);

          // 2. Update the cookie on the server - this should set the httpOnly cookie
          await updateAuthTokenOnTheServer(newToken);

          // 3. Retry the original request - the server should now have the updated cookie
          // Don't set Authorization header since we're using httpOnly cookies
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refreshing the token fails, the user's session is likely invalid.

        useAuthStore.getState().signOut();

        return Promise.reject(refreshError);
      }
    }

    // For any other errors, just reject the promise
    return Promise.reject(error);
  }
);
