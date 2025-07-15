import { io } from 'socket.io-client';

import { GRAXIS_API_URL } from './config/constants';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.VITE_APP_ENV === 'production' ? undefined : GRAXIS_API_URL;

export const socket = io(URL, {
  withCredentials: true,
  timeout: 10000,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});
