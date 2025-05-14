import { Row, Typography, Col } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import { VERIFY_EMAIL_PAGE_CONSTANTS } from './utils/constants';
import styles from './styles.module.scss';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { emailToVerify } = useAuthStore();

  useEffect(() => {
    if (!emailToVerify) navigate(ROUTES.LOGIN);
  }, [emailToVerify, navigate]);

  const { firstPartMes, emailText, secondPartMes } =
    VERIFY_EMAIL_PAGE_CONSTANTS.MAIN_MESSAGE(emailToVerify || '');

  return (
    <PageContainer pageTitle={VERIFY_EMAIL_PAGE_CONSTANTS.PAGE_TITLE}>
      <AuthLayout>
        <Row justify="center">
          <Col xs={{ span: 20, offset: 2 }}>
            <Typography.Text className={styles.firstPartMes}>
              {firstPartMes}
              <Typography.Link
                href={`mailto:${emailText}`}
                className={styles.link}
              >
                {emailText}
              </Typography.Link>
              {secondPartMes}
            </Typography.Text>
          </Col>
        </Row>
      </AuthLayout>
    </PageContainer>
  );
};

export default VerifyEmailPage;
