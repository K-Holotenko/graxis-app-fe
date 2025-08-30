import { User as FirebaseUser } from 'firebase/auth';

export type AuthUser = (FirebaseUser & { displayName?: string }) | unknown;

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  activeAt: string;
  avatarUrl: string;
  email_verified: boolean;
}

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
