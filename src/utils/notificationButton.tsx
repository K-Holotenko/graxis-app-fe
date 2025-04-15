import { Button } from 'src/components/Button';
import { ButtonTypes } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

export const notificationButton = (navigate: (route: string) => void) => (
  <Button
    label="Авторизуватися"
    type={ButtonTypes.link}
    onClick={() => navigate(ROUTES.LOGIN)}
  />
);
