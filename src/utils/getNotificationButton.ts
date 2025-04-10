import { createElement, ReactElement } from 'react';

import { ROUTES } from 'src/router/routes';
import { Button } from 'src/components/Button';
import { ButtonTypes } from 'src/config/constants';

export function getNotificationButton(
  navigate: (route: string) => void
): ReactElement {
  return createElement(Button, {
    label: 'Авторизуватися',
    type: ButtonTypes.link,
    onClick: () => navigate(ROUTES.LOGIN),
  });
}
