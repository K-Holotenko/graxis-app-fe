import { ReactNode } from 'react';
import { Col, Image, Row } from 'antd';

import logoSrc from '../../assets/icons/logo.svg';

import './styles.scss';

interface AuthLayoutProps {
  children: ReactNode;
  imageSrc: string;
}

export const AuthLayout = ({ children, imageSrc }: AuthLayoutProps) => (
  <Row justify="center">
    <Col sm={6} md={8} lg={10} className="auth-image-col">
      <div className="auth-image-container">
        <Image
          src={imageSrc}
          alt="Auth image"
          preview={false}
          className="auth-image"
        />
      </div>
    </Col>
    <Col sm={18} md={16} lg={14} className="auth-form-col">
      <Col md={{ span: 12, offset: 6 }}>
        <Image src={logoSrc} alt="Logo" preview={false} className="logo" />
        <div>{children}</div>
      </Col>
    </Col>
  </Row>
);
