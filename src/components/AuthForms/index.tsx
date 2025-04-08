import { Link, useNavigate } from 'react-router-dom';
import { Divider, Row, Col, Typography, ConfigProvider } from 'antd';
import { ReactNode } from 'react';

import { useUserStore } from 'src/stores/userStore';
import { ROUTES } from 'src/router/routes';
import { ButtonTypes, SCREEN_WIDTH, TEXT } from 'src/config/constants';
import GoogleIcon from 'src/assets/icons/google-icon.svg?react';
import { useAuthStore } from 'src/stores/authStore';
import { Button } from 'src/components/Button';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { NotificationType, useNotification } from 'src/hooks/useNotification';

import styles from './styles.module.scss';

const { Title } = Typography;

interface AuthFormsProps {
  title: string;
  children?: ReactNode;
}

export const AuthForms = ({ title, children }: AuthFormsProps) => {
  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.SM;
  const navigate = useNavigate();
  const { isLoading: isAuthLoading, loginWithGoogle } = useAuthStore();

  const { createUser, fetchUser, isLoading } = useUserStore();
  const { openNotification } = useNotification();

  const triggerNotification = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  const onGoogleClick = async () => {
    // when the user sign up with Google we need to check if the user already exists in the database
    // with fetchUser() method, if the user doesn't exist we need to create a new user with createUser() method
    try {
      const firebaseUser = await loginWithGoogle(triggerNotification);

      try {
        await fetchUser();
      } catch {
        const fullName =
          (firebaseUser as { displayName?: string }).displayName || '';
        const [name, surname] = fullName.split(' ');

        await createUser({ name, surname }, triggerNotification);
      }
    } finally {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <>
      <Title level={2} className={styles.authPageTitle}>
        {title}
      </Title>
      <ConfigProvider theme={localTheme(isMobile)}>{children}</ConfigProvider>
      <Row justify="end">
        <Link to={ROUTES.LOGIN} className={styles.link}>
          Забули пароль?
        </Link>
      </Row>
      <Divider plain>{TEXT.OR}</Divider>
      <Row justify="space-between" className={styles.buttonMargins} gutter={40}>
        <Col span={24}>
          <Button
            label="Увійти через Google"
            icon={isLoading || isAuthLoading ? undefined : <GoogleIcon />}
            type={ButtonTypes.default}
            className={styles.socialMediaButton}
            onClick={onGoogleClick}
            isDisabled={isLoading || isAuthLoading}
            isLoading={isLoading || isAuthLoading}
          />
        </Col>
      </Row>
      <Row justify="center">
        {location.pathname === ROUTES.LOGIN ? (
          <span className={styles.authorizeLink}>
            {TEXT.NO_ACCOUNT}{' '}
            <Link to={ROUTES.REGISTRATION} className={styles.registerStyle}>
              {TEXT.REGISTER}
            </Link>
          </span>
        ) : (
          <span className={styles.authorizeLink}>
            {TEXT.ALREADY_HAVE_ACCOUNT}{' '}
            <Link to={ROUTES.LOGIN} className={styles.authorizeStyle}>
              Авторизуватися
            </Link>
          </span>
        )}
      </Row>
    </>
  );
};

const localTheme = (isMobile: boolean) => ({
  components: {
    Tabs: {
      titleFontSize: isMobile ? 12 : 18,
    },
  },
});
