import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';
import { ROUTES } from 'src/router/routes';
import { useUserStore } from 'src/stores/userStore';

import { useCountdown } from './useCountdown';
import { NotificationType, useNotification } from './useNotification';

interface UseRequireAuthReturn {
  requireAuth: (
    callback: () => void,
    notificationButton: React.ReactNode
  ) => void;
}

export const useRequireAuth = (): UseRequireAuthReturn => {
  const { isAuthorized } = useAuthStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { timer, startCountdown } = useCountdown(5);
  const { openNotification } = useNotification();
  const isFullyAuthorized = isAuthorized && !!user;
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    if (timer === 0 && !isFullyAuthorized) {
      navigate(ROUTES.LOGIN);
      setIsNotificationOpen(false);
    }
  }, [timer, isFullyAuthorized, navigate]);

  const requireAuth = useCallback(
    (callback: () => void, notificationButton: React.ReactNode) => {
      if (isFullyAuthorized) {
        callback();

        return;
      }
      if (isNotificationOpen) return;

      startCountdown();
      setIsNotificationOpen(true);
      openNotification(
        NotificationType.INFO,
        'Будь ласка, авторизуйтесь',
        'Авторизуйтеся, щоб продовжити. Автоперехід через 5 секунд...',
        notificationButton
      );
    },
    [
      isFullyAuthorized,
      isNotificationOpen,
      startCountdown,
      navigate,
      openNotification,
    ]
  );

  return { requireAuth };
};
