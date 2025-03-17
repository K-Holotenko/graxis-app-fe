import { API_URL } from 'src/config/constants';

import CookieService from './CookieService';

export interface SignUpUser {
  name: string;
  surname: string;
  avatar: File;
}

export const signUp = async (user: SignUpUser): Promise<Response> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const formData = new FormData();

  formData.append('name', user.name);
  formData.append('surname', user.surname);
  formData.append('avatar', user.avatar);

  const response = await fetch(`${API_URL}/users/sign-up`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  return response;
};

export const fetchUser = async (): Promise<Response> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const response = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });

  return response;
};
