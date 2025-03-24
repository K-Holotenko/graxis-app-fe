import { create } from 'zustand';

import {
  fetchUser,
  signUp,
  SignUpUser,
  updateUser,
  UpdateUserData,
} from 'src/services/UserService';

export interface User {
  id: string;
  name: string;
  surname: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  activeAt: string;
  avatarUrl: string;
  email_verified: boolean;
}

export interface ContactInfoForm {
  email: string;
  phoneNumber: string;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  isEditingContactInfoForm: boolean;
  contactInfoFormValues: ContactInfoForm;
  createUser: (
    user: SignUpUser,
    showError: (err: string) => void
  ) => Promise<void>;
  fetchUser: () => void;
  resetUser: () => void;
  updateUser: (
    data: UpdateUserData,
    showError: (err: string) => void
  ) => Promise<void>;
  setIsEditingContactInfoForm: (isEditing: boolean) => void;
  setContactInfoFormValues: (email: string, phoneNumber: string) => void;
  saveContactInfoFormValues: () => void;
  isSaveButtonDisabled: boolean;
  setIsSaveButtonDisabled: (disabled: boolean) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: {
    id: '123456789',
    name: 'Vasyl',
    surname: 'Symonenko',
    avatar: 'https://example.com/avatar.jpg',
    email: 'VasylSymonenko@gmail.com',
    phoneNumber: '968756987',
    registrationDate: '2024-03-15T10:30:00Z',
    activeAt: '2025-03-20T14:45:00Z',
    avatarUrl: 'https://example.com/avatar.jpg',
    email_verified: true,
  },
  isLoading: false,
  isEditingContactInfoForm: false,
  contactInfoFormValues: {
    email: 'VasylSymonenko@gmail.com',
    phoneNumber: '968756987',
  },

  setIsEditingContactInfoForm: (isEditing: boolean) =>
    set({ isEditingContactInfoForm: isEditing }),

  isSaveButtonDisabled: false,
  setIsSaveButtonDisabled: (isDisabled: boolean) =>
    set({ isSaveButtonDisabled: isDisabled }),

  setContactInfoFormValues: (email: string, phoneNumber: string) =>
    set({ contactInfoFormValues: { email, phoneNumber } }),

  saveContactInfoFormValues: () => {
    const { user, contactInfoFormValues } = get();

    if (!user) return;
    set({
      user: {
        ...user,
        email: contactInfoFormValues.email,
        phoneNumber: contactInfoFormValues.phoneNumber,
      },
      isEditingContactInfoForm: false,
    });
  },

  createUser: async (user, showError) => {
    set({ isLoading: true });
    const response = await signUp(user);
    const userData: User = await response.json();

    if (!response.ok) {
      showError('Щось пішло не так. Спробуйте ще раз');
      set({ isLoading: false });
      throw new Error('Failed to create user');
    }

    set({ user: userData, isLoading: false });
  },

  fetchUser: async () => {
    set({ isLoading: true });
    const response = await fetchUser();
    const userData: User = await response.json();

    if (!response.ok) {
      set({ isLoading: false });
      throw new Error('Failed to fetch user');
    }

    set({
      user: userData,
      isLoading: false,
      contactInfoFormValues: {
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      },
    });
  },

  resetUser: () => set({ user: null }),

  updateUser: async (data, showError) => {
    try {
      const response = await updateUser(data);
      const updatedUser: User = await response.json();

      set({
        user: updatedUser,
        contactInfoFormValues: {
          email: updatedUser.email,
          phoneNumber: updatedUser.phoneNumber,
        },
      });
    } catch {
      showError('Щось пішло не так. Спробуйте ще раз');
    }
  },
}));
