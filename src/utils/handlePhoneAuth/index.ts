import { VALIDATION_MESSAGE } from 'src/config/validation';
import { ROUTES } from 'src/router/routes';

// TODO: Revisit user phone number verification and choose one of the following approaches:
// 1. Store the user's phone number in Firestore and check against it when necessary to ensure validity and uniqueness.
// 2. Send the verification code, handle any errors that Firebase Auth may throw, and return the user to the registration step if validation fails.
// 3. Use Firebase Auth Admin SDK with Cloud Functions to manage verification on the server side for more flexible control.

export const handlePhoneAuth = async (
  phone: string,
  loginWithPhoneNumber: (phoneNumber: string) => Promise<void>,
  navigate: (path: string) => void,
  setErrorMessage: (message: string | null) => void
): Promise<void> => {
  const phoneNumber = `+380${phone}`;

  sessionStorage.setItem('phone', phoneNumber);

  try {
    await loginWithPhoneNumber(phoneNumber);
    navigate(ROUTES.VERIFICATION_CODE);
  } catch {
    setErrorMessage(VALIDATION_MESSAGE.AUTH_MESSAGE_ERROR);
  }
};
