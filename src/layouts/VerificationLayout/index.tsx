// import { ReactNode } from 'react';
import { Col, Image, Row, Typography } from 'antd';

import logoSrc from '../../assets/icons/logo.svg';
// import { TEXT } from '../../config/constants';
import { VerificationForm } from '../../components/logic/Forms/VerificationForm';

import './styles.scss';
import { ROUTES } from '../../router/routes';
import { useNavigate } from 'react-router-dom';
import { REGISTRATION_PAGE_CONSTANTS } from '../../pages/RegistrationPage/utils/constants';

const { Title } = Typography;

// interface TabItem {
//   key: string;
//   label: ReactNode;
//   children: ReactNode;
// }

interface VerificationLayoutProps {
  imageSrc: string;
  title: string;
  message: string;
  // defaultActiveTabKey?: string;
  // items?: TabItem[];
}

export const VerificationLayout = ({
  imageSrc,
  title,
  message,
}: VerificationLayoutProps) => {
  const phone = sessionStorage.getItem('phone');
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(
      `${ROUTES.REGISTRATION}?tab=${REGISTRATION_PAGE_CONSTANTS.FORM.PHONE_TAB.KEY}`
    );
  };

  return (
    <Row justify="center" className="verification-layout">
      <Col sm={6} md={9} lg={11} className="verification-image-col">
        <div className="verification-image-container">
          <Image
            src={imageSrc}
            alt="Auth image"
            preview={false}
            className="verification-image"
          />
        </div>
      </Col>
      <Col sm={18} md={15} lg={13} className="verification-form-col">
        <Col md={{ span: 12, offset: 4 }}>
          {/* <Row justify="center" className="verification-logo-row"> */}
          <Image src={logoSrc} alt="Logo" preview={false} className="logo" />
          {/* </Row> */}
          <Title level={2} className="verification-page-title">
            {title}
          </Title>
          <Typography>{message}</Typography>
          <VerificationForm />
          <Typography.Link
            onClick={handleLinkClick}
          >{`+380${phone}`}</Typography.Link>
          {/* <Typography.Link href={ROUTES.LOGIN}>{TEXT.AUTHORIZE}</Typography.Link> */}
        </Col>
      </Col>
    </Row>
  );
};
