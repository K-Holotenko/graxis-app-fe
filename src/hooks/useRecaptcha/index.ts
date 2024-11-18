import { RecaptchaVerifier } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { firebaseAuth } from 'src/config/firebase';

interface UseRecaptchaProps {
  buttonId: string;
}

export const useRecaptcha = ({ buttonId }: UseRecaptchaProps): void => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    window.recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, buttonId, {
      size: 'invisible',
      callback: () => {
        //  @ts-expect-error Cannot find name 'grecaptcha'
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

    setMounted(true);
  }, [mounted, buttonId]);
};
