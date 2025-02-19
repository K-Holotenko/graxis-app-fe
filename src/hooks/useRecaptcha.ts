import { RecaptchaVerifier } from 'firebase/auth';
import { useEffect } from 'react';

import { firebaseAuth } from 'src/config/firebase';

interface UseRecaptchaProps {
  buttonId: string;
}

export const useRecaptcha = ({ buttonId }: UseRecaptchaProps): void => {
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, buttonId, {
      size: 'invisible',
      callback: () => {
        // @ts-expect-error Cannot find name 'grecaptcha'
        grecaptcha.reset();
      },
      'expired-callback': () => {
        window.recaptchaVerifier.clear();
        // @ts-expect-error Cannot find name 'grecaptcha'
        grecaptcha.reset();
      },
      'error-callback': () => {
        window.recaptchaVerifier.clear();
        // @ts-expect-error Cannot find name 'grecaptcha'
        grecaptcha.reset();
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
