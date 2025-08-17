import axios from 'axios';

import { User } from 'src/stores/authStore';
import { UserProfileData } from 'src/stores/userProfileStore';
import { GRAXIS_API_URL } from 'src/config/constants';

import { api } from './api';

export interface SignUpUser {
  name: string;
  surname: string;
  avatar?: File;
  city?: string;
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
  formData.append('country', 'Україна');
  user?.city && formData.append('city', user.city);

  const response = await axios.post(
    `${GRAXIS_API_URL}/users/sign-up`,
    formData,
    { withCredentials: true }
  );

  return response.data;
};

export const fetchUser = async (): Promise<User> => {
  const response = await api.get('/users/me');

  return response.data;
};

export const fetchUserWithToken = async (): Promise<User> => {
  const response = await axios.get('/users/me', { withCredentials: true });

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
