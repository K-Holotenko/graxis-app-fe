import { ReactNode, useState } from 'react';
import { Divider, Row, Typography, Tabs } from 'antd';

import { SocialMediaSection } from '../SocialMediaSection';
import { TEXT } from '../../../config/constants';
import { AuthFooter } from '../AuthFooter';
import { ForgotPasswordLink } from '../../ui/ForgotPasswordLink';
import { REGISTRATION_PAGE_CONSTANTS } from 'pages/RegistrationPage/utils/constants';

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
    activeTabKey === REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY;

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
