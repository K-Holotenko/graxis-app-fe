import { ReactNode } from 'react';
import { Divider, Row, Image, Typography, Tabs } from 'antd';

import { SocialMediaSection } from '../SocialMediaSection';
import { TEXT } from '../../../config/constants';
import logoSrc from '../../../assets/icons/logo.svg';
import { AuthFooter } from '../AuthFooter';
import { ForgotPasswordLink } from '../../ui/ForgotPasswordLink';

const { Title } = Typography;

interface TabItem {
  key: string;
  label: ReactNode;
  children: ReactNode;
}

interface AuthFormsProps {
  items: TabItem[];
  title: string;
  defaultActiveTabKey: string;
}

export const AuthForms = ({
  items,
  title,
  defaultActiveTabKey,
}: AuthFormsProps) => (
  <>
    <Row justify="center" className="auth-logo-row">
      <Image src={logoSrc} alt="Logo" preview={false} className="logo" />
    </Row>
    <Title level={2} className="auth-page-title">
      {title}
    </Title>
    <Tabs defaultActiveKey={defaultActiveTabKey} centered items={items} />
    <Row justify="end">
      <ForgotPasswordLink />
    </Row>
    <Divider plain>{TEXT.OR}</Divider>
    <SocialMediaSection />
    <Row justify="center">
      <AuthFooter />
    </Row>
  </>
);
