import { GRAXIS_API_URL } from 'src/config/constants';
import { User } from 'src/stores/userStore';

import { api } from './api';

export interface SignUpUser {
  name: string;
  surname: string;
  avatar?: File;
}

export interface UpdateUserData {
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: File;
}

export const signUp = async (user: SignUpUser): Promise<User> => {
  const formData = new FormData();

  formData.append('name', user.name || '');
  formData.append('surname', user.surname || '');
  user?.avatar && formData.append('avatar', user.avatar);

  const response = await api.post(`${GRAXIS_API_URL}/users/sign-up`, formData);

  return response.data;
};

export const fetchUser = async (): Promise<User> => {
  const response = await api.get(`${GRAXIS_API_URL}/users/me`);

  return response.data;
};

export const updateUser = async (user: UpdateUserData): Promise<User> => {
  const formData = new FormData();

  user?.name && formData.append('name', user.name);
  user?.surname && formData.append('surname', user.surname);
  user?.email && formData.append('email', user.email);
  user?.phoneNumber && formData.append('phoneNumber', user.phoneNumber);
  user?.avatar && formData.append('avatar', user.avatar);

  const response = await api.put('/users/update', formData);

  return response.data;
};
