import { ReactNode } from 'react';
import { Divider, Row, Typography, Tabs } from 'antd';

import { SocialMediaSection } from 'components/logic/SocialMediaSection';
import { AuthFooter } from 'components/logic/AuthFooter';
import { ForgotPasswordLink } from 'components/ui/ForgotPasswordLink';
import { TEXT } from 'config/constants';

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
