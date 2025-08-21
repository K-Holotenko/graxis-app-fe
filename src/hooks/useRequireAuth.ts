import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';
import { ROUTES } from 'src/router/routes';
import { notificationButton } from 'src/utils/notificationButton';

import { useCountdown } from './useCountdown';
import { NotificationType, useNotification } from './useNotification';

interface UseRequireAuthReturn {
  requireAuth: (route: string) => void;
}

export const useRequireAuth = (): UseRequireAuthReturn => {
  const { user } = useAuthStore();

  const { timer, startCountdown } = useCountdown(5);
  const { openNotification } = useNotification();

  const navigate = useNavigate();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    if (timer === 0 && !user) {
      navigate(ROUTES.LOGIN);
      setIsNotificationOpen(false);
    }
  }, [timer, user, navigate]);

  const requireAuth = (route: string): void => {
    // eslint-disable-next-line no-console
    console.log(user, route);
    if (user) {
      navigate(route);

      return;
    }

    if (isNotificationOpen) return;

    startCountdown();
    setIsNotificationOpen(true);

    openNotification(
      NotificationType.INFO,
      'Будь ласка, авторизуйтесь',
      'Авторизуйтеся, щоб продовжити. Автоперехід через 5 секунд...',
      notificationButton(navigate)
    );
  };

  return { requireAuth };
};
