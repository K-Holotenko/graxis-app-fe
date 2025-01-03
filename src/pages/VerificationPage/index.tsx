import { Link, useLocation } from 'react-router-dom';
import { Row, Space, Typography, Image } from 'antd';
import Title from 'antd/es/typography/Title';

import { PageContainer } from 'src/layouts/PageContainer';
import { VERIFICATION_PAGE_CONSTANTS } from 'src/pages/VerificationPage/utils/constants';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { ROUTES } from 'src/router/routes';
import { VerificationForm } from 'src/pages/VerificationPage/children/VerificationForm';
import { TEXT } from 'src/config/constants';
import EditSrc from 'src/assets/icons/edit-icon.svg';

import './styles.scss';

export const VerificationPage = () => {
  const location = useLocation();
  const phone = sessionStorage.getItem('phone');

  const params = new URLSearchParams(location.search);
  const fromPage = params.get('from') || ROUTES.LOGIN;

  return (
    <PageContainer pageTitle={VERIFICATION_PAGE_CONSTANTS.PAGE_TITLE}>
      <AuthLayout imageSrc={VERIFICATION_PAGE_CONSTANTS.IMAGE_SRC}>
        <Row className="verif-code-row" align="middle">
          <Space
            direction="vertical"
            align="center"
            size={0}
            className="verif-code-space"
          >
            <Title level={2}>{VERIFICATION_PAGE_CONSTANTS.TITLE}</Title>
            <Typography className="verif-code-text">{TEXT.SENT_SMS}</Typography>
            <VerificationForm />
            <Link to={fromPage} className="phone-link">
              {phone}
              <Image src={EditSrc} alt="Edit" preview={false} />
            </Link>
          </Space>
        </Row>
      </AuthLayout>
    </PageContainer>
  );
};
