import { useEffect, useState } from 'react';

interface UseCountdownReturn {
  timer: number;
  isDisabled: boolean;
  startCountdown: () => void;
}

export const useCountdown = (initialTime: number): UseCountdownReturn => {
  const [timer, setTimer] = useState(initialTime);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (!isCounting) return;

    if (timer === 0) {
      setIsDisabled(false);
      setIsCounting(false);

      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, isCounting]);

  const startCountdown = (): void => {
    setTimer(initialTime);
    setIsDisabled(true);
    setIsCounting(true);
  };

  return { timer, isDisabled, startCountdown };
};
