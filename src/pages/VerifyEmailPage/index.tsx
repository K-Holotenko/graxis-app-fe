import { Row, Typography, Col } from 'antd';
import { PageContainer } from '../../components/ui/PageContainer';
import { AuthLayout } from '../../layouts/AuthLayout';
import { VERIFY_EMAIL_PAGE_CONSTANTS } from './utils/constants';
import { useAuthStore } from 'stores/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'router/routes';

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { emailToVerify } = useAuthStore();

  useEffect(() => {
    if (!emailToVerify) navigate(ROUTES.LOGIN);
  }, [emailToVerify, navigate]);

  const { firstPartMes, emailText, secondPartMes } =
    VERIFY_EMAIL_PAGE_CONSTANTS.MAIN_MESSAGE(emailToVerify || '');

  return (
    <PageContainer pageTitle={VERIFY_EMAIL_PAGE_CONSTANTS.PAGE_TITLE}>
      <AuthLayout imageSrc={VERIFY_EMAIL_PAGE_CONSTANTS.IMAGE_SRC}>
        <Row justify="center" className="mt-200">
          <Col span={24}>
            <Typography.Text className="left">
              {firstPartMes}
              <Typography.Link
                href={`mailto:${emailText}`}
                style={{ textDecoration: 'underline' }}
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
