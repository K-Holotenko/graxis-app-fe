import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loginWithGoogleAction } from './authActions';
import { LoginWithGoogleResponse } from '../../services/auth/interfaces';
import { User } from '../../types/user';

interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {
    email: '',
  },
};

export const loginWithGoogle = createAsyncThunk<LoginWithGoogleResponse>(
  'auth/loginWithGoogle',
  async () => {
    return loginWithGoogleAction();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export default authSlice.reducer;
