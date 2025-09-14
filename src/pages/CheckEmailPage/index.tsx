import { Row, Typography, Col } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

export const CheckEmailPage = () => {
  const navigate = useNavigate();
  const { email, isResetPassword } = useLocation().state || {};

  useEffect(() => {
    if (!email) navigate(ROUTES.LOGIN);
  }, [email, navigate]);

  return (
    <PageContainer pageTitle="Перевірка ел. пошти">
      <AuthLayout>
        <Row justify="center">
          <Col xs={{ span: 20, offset: 2 }}>
            <Typography.Text className={styles.firstPartMes}>
              На ваш email{' '}
              <Typography.Link href={`mailto:${email}`} className={styles.link}>
                {email}
              </Typography.Link>
              {` відправлено лист. Перейдіть за посиланням в листі для ${
                isResetPassword
                  ? 'відновлення паролю'
                  : 'підтвердження вашого email'
              }.
     Посилання доступне годину.`}
            </Typography.Text>
          </Col>
        </Row>
      </AuthLayout>
    </PageContainer>
  );
};
