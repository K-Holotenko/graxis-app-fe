import CookieService from './CookieService';

export interface SignUpUser {
  name: string;
  surname: string;
  avatar: File;
}

export interface UpdateUserData {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: File;
}

const API_URL = 'https://graxis-be-774272313958.europe-central2.run.app';

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

export const updateUser = async (user: UpdateUserData): Promise<Response> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const formData = new FormData();

  user?.name && formData.append('name', user.name);
  user?.surname && formData.append('surname', user.surname);
  user?.email && formData.append('email', user.email);
  user?.phoneNumber && formData.append('phoneNumber', user.phoneNumber);

  const response = await fetch(`${API_URL}/users/update`, {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(user),
  });

  return response;
};

export const updateAvatar = async (user: UpdateUserData): Promise<Response> => {
  try {
    const token = `Bearer ${CookieService.getCookie('accessToken')}`;

    const formData = new FormData();

    if (user.avatar) {
      formData.append('avatar', user.avatar);
    }

    const response = await fetch(`${API_URL}/users/avatar`, {
      method: 'PUT',
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    const jsonResponse = response.json();

    return jsonResponse;
  } catch (error) {
    throw error;
  }
};
