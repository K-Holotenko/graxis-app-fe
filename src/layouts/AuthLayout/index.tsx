import { Col, Image, Row } from 'antd';
import { ReactNode } from 'react';

import { Logo } from 'src/components/Logo';

import './styles.scss';

interface AuthLayoutProps {
  imageSrc: string;
  children: ReactNode;
}

export const AuthLayout = ({ imageSrc, children }: AuthLayoutProps) => (
  <Row justify="center" className="auth-layout">
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
        <Row justify="center" className="auth-logo-row">
          <Logo />
        </Row>
        {children}
      </Col>
    </Col>
  </Row>
);
