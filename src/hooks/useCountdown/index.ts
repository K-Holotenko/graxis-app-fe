import { useEffect, useState } from 'react';

interface UseCountdownReturn {
  timer: number;
  isDisabled: boolean;
  resetCountdown: () => void;
}

export const useCountdown = (initialTime: number): UseCountdownReturn => {
  const [timer, setTimer] = useState(initialTime);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (timer === 0) {
      setIsDisabled(false);

      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const resetCountdown = (): void => {
    setTimer(initialTime);
    setIsDisabled(true);
  };

  return { timer, isDisabled, resetCountdown };
};
