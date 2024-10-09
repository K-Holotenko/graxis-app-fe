import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../config/constants/cookie.constants';

const cookieService = {
  setAccessToken: (token: string, expiresIn: number): void => {
    Cookies.set(ACCESS_TOKEN_KEY, token, {
      expires: expiresIn / (24 * 60 * 60),
    });
  },

  getAccessToken: (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  removeAccessToken: (): void => {
    Cookies.remove(ACCESS_TOKEN_KEY);
  },
};

export default cookieService;
