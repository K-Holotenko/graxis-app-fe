import { AuthService } from '../../services/auth';
import { LoginWithGoogleResponse } from '../../services/auth/interfaces';

export const loginWithGoogleAction =
  async (): Promise<LoginWithGoogleResponse> => {
    return AuthService.loginWithGoogleReq();
  };
