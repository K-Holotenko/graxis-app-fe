import { ROUTES } from 'router/routes';
import { VALIDATION_MESSAGE } from 'config/validation';

export const handlePhoneAuth = async (
  phone: string,
  loginWithPhoneNumber: (phoneNumber: string) => Promise<void>,
  navigate: (path: string) => void,
  setErrorMessage: (message: string | null) => void,
): Promise<void> => {
  const phoneNumber = `+380${phone}`;

  sessionStorage.setItem('phone', phoneNumber);

  try {
    await loginWithPhoneNumber(phoneNumber);
    navigate(ROUTES.VERIFICATIONCODE);
  } catch {
    setErrorMessage(VALIDATION_MESSAGE.AUTH_MESSAGE_ERROR);
  }
};
