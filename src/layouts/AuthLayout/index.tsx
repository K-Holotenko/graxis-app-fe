import { ReactNode } from 'react';
import { Col, Divider, Image, Row, Tabs, Typography } from 'antd';

import logoSrc from '../../assets/icons/logo.svg';
import { TEXT } from '../../config/constants';
import { SocialMediaSection } from '../../components/logic/SocialMediaSection';
import { Footer } from './Footer';

import './styles.scss';

const { Title } = Typography;

interface TabItem {
  key: string;
  label: ReactNode;
  children: ReactNode;
}

interface AuthLayoutProps {
  imageSrc: string;
  title: string;
  defaultActiveTabKey: string;
  items: TabItem[];
}

export const AuthLayout = ({
  imageSrc,
  title,
  defaultActiveTabKey,
  items,
}: AuthLayoutProps) => (
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
          <Image src={logoSrc} alt="Logo" preview={false} className="logo" />
        </Row>
        <Title level={2} className="auth-page-title">
          {title}
        </Title>
        <Tabs defaultActiveKey={defaultActiveTabKey} centered items={items} />
        <Divider plain>{TEXT.OR}</Divider>
        <SocialMediaSection />
        <Row justify="center">
          <Footer />
        </Row>
      </Col>
    </Col>
  </Row>
);
