import { io } from 'socket.io-client';

import { CookieService } from './services/CookieService';
import { GRAXIS_API_URL } from './config/constants';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.VITE_APP_ENV === 'production' ? undefined : GRAXIS_API_URL;

export const socket = io(URL, {
  auth: {
    token: CookieService.getCookie('accessToken'),
  },
});
