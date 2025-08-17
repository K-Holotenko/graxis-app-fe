import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Row, Col, Typography, ConfigProvider } from 'antd';
import { ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';

import { ROUTES } from 'src/router/routes';
import { ButtonTypes, SCREEN_WIDTH } from 'src/config/constants';
import GoogleIcon from 'src/assets/icons/google-icon.svg?react';
import { useAuthStore } from 'src/stores/authStore';
import { updateAuthTokenOnTheServer } from 'src/services/AuthService';
import { Button } from 'src/components/Button';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { fetchUserWithToken } from 'src/services/UserService';

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
  const {
    isLoading: isAuthLoading,
    loginWithGoogle,
    // fetchUser,
  } = useAuthStore();

  const { isLoading } = useAuthStore();
  const { openNotification } = useNotification();

  const triggerNotification = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  // eslint-disable-next-line no-console
  console.log('isAuthLoading', isAuthLoading, 'isLoading', isLoading);
  const onGoogleClick = async () => {
    try {
      const firebaseUser = await loginWithGoogle(triggerNotification);
      const token = await (firebaseUser as FirebaseUser).getIdToken();

      if (firebaseUser) {
        try {
          await updateAuthTokenOnTheServer(token);
          await fetchUserWithToken();

          navigate(ROUTES.HOME);
        } catch (error) {
          if (error instanceof AxiosError && error.status === 404) {
            const fullName =
              (firebaseUser as { displayName?: string }).displayName || '';
            const [name, surname] = fullName.split(' ');

            navigate(ROUTES.ADD_USER_INFO, {
              state: {
                name,
                surname,
              },
            });
          } else {
            // Reset loading state on other errors and provide user feedback
            triggerNotification(
              'Не вдалося завершити авторизацію. Спробуйте, будь ласка, пізніше'
            );
          }
        }
      }
    } catch {
      // Ensure loading state is reset on any error
      triggerNotification(
        'Не вдалося авторизуватися. Спробуйте, будь ласка, пізніше'
      );
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
      <Divider plain>Або</Divider>
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
            Немає акаунту?
            <Link to={ROUTES.REGISTRATION} className={styles.registerStyle}>
              Зареєструватися
            </Link>
          </span>
        ) : (
          <span className={styles.authorizeLink}>
            У вас є акаунт?{' '}
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
