// src/services/api.ts

import axios from 'axios';

import { firebaseAuth } from 'src/config/firebase';
import { GRAXIS_API_URL } from 'src/config/constants';
import CookieService from 'src/services/CookieService';
import { useAuthStore } from 'src/stores/authStore';

// Create an axios instance
export const api = axios.create({
  baseURL: GRAXIS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach the token to every request
api.interceptors.request.use(
  (config) => {
    const token = CookieService.getCookie('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

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

          // 2. Update the cookie
          CookieService.setCookie('accessToken', newToken);

          // 3. Update the authorization header for the original request
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

          // 4. Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refreshing the token fails, the user's session is likely invalid.
        // Log them out or redirect to the login page.

        useAuthStore.getState().signOut();

        return Promise.reject(refreshError);
      }
    }

    // For any other errors, just reject the promise
    return Promise.reject(error);
  }
);
