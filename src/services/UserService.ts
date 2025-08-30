import axios from 'axios';

import { User, SignUpUser, UpdateUserData, UserProfileData } from 'src/types';

import { api } from './api';

export const signUp = async (user: SignUpUser): Promise<User> => {
  const formData = new FormData();

  formData.append('name', user.name || '');
  formData.append('surname', user.surname || '');
  user?.avatar && formData.append('avatar', user.avatar);
  formData.append('country', 'Україна');
  user?.city && formData.append('city', user.city);

  const response = await axios.post(
    `${import.meta.env.VITE_APP_GRAXIS_API_URL}/users/sign-up`,
    formData,
    { withCredentials: true }
  );

  return response.data;
};

export const fetchUser = async (): Promise<User> => {
  const response = await api.get('/users/me');

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

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};

export const getUserPublicProfile = async (
  id: string
): Promise<UserProfileData> => {
  const response = await api.get(`/publications/user/${id}`);

  return response.data;
};
