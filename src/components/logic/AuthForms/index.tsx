import { Divider, Row, Typography, Tabs } from 'antd';
import { ReactNode, useState } from 'react';

import { AuthFooter } from 'src/components/logic/AuthFooter';
import { SocialMediaSection } from 'src/components/logic/SocialMediaSection';
import { ForgotPasswordLink } from 'src/components/ui/ForgotPasswordLink';
import { TEXT } from 'src/config/constants';
import { LOGIN_PAGE_CONFIG } from 'src/pages/LoginPage/utils/config';

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
}: AuthFormsProps) => {
  const [activeTabKey, setActiveTabKey] = useState(defaultActiveTabKey);
  const isEmailTabActive =
    activeTabKey === LOGIN_PAGE_CONFIG.FORM.EMAIL_TAB.KEY;

  return (
    <>
      <Title level={2} className="auth-page-title">
        {title}
      </Title>
      <Tabs
        defaultActiveKey={defaultActiveTabKey}
        centered
        items={items}
        onChange={(key) => setActiveTabKey(key)}
      />
      {isEmailTabActive && (
        <Row justify="end">
          <ForgotPasswordLink />
        </Row>
      )}
      <Divider plain>{TEXT.OR}</Divider>
      <SocialMediaSection />
      <Row justify="center">
        <AuthFooter />
      </Row>
    </>
  );
};
