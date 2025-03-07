import { Link, useLocation } from 'react-router-dom';
import { Row, Typography, Image, Col } from 'antd';

import { PageContainer } from 'src/layouts/PageContainer';
import { VERIFICATION_PAGE_CONSTANTS } from 'src/pages/VerificationPage/utils/constants';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { ROUTES } from 'src/router/routes';
import { VerificationForm } from 'src/pages/VerificationPage/children/VerificationForm';
import { TEXT } from 'src/config/constants';
import EditSrc from 'src/assets/icons/edit-icon.svg';

import styles from './styles.module.scss';

export const VerificationPage = () => {
  const location = useLocation();
  const phone = sessionStorage.getItem('phone');

  const params = new URLSearchParams(location.search);
  const fromPage = params.get('from') || ROUTES.LOGIN;

  return (
    <PageContainer pageTitle={VERIFICATION_PAGE_CONSTANTS.PAGE_TITLE}>
      <AuthLayout>
        <Row className={styles.verifyCodeRow} align="middle" justify="center">
          <Col>
            <Typography.Title level={2} className={styles.verifyCodeTitle}>
              {VERIFICATION_PAGE_CONSTANTS.TITLE}
            </Typography.Title>
            <Typography className={styles.verifyCodeText}>
              {TEXT.SENT_SMS}
            </Typography>
            <VerificationForm />
            <Link to={fromPage} className={styles.phoneLink}>
              {phone}
              <Image src={EditSrc} alt="Edit" preview={false} />
            </Link>
          </Col>
        </Row>
      </AuthLayout>
    </PageContainer>
  );
};
