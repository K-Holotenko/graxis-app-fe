import { Link, useNavigate } from 'react-router-dom';
import { Divider, Row, Col, Typography, Tabs } from 'antd';
import { ReactNode, useState } from 'react';

import { ROUTES } from 'src/router/routes';
import { ButtonTypes, TEXT } from 'src/config/constants';
import { LOGIN_PAGE_CONFIG } from 'src/pages/LoginPage/utils/config';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google-icon.svg';
import { useAuthStore } from 'src/stores/authStore';
import { Button } from 'src/components/Button';

import styles from './styles.module.scss';

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

  const navigate = useNavigate();
  const { loginWithGoogle } = useAuthStore();

  const onGoogleClick = async () => {
    await loginWithGoogle();
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <Title level={2} className={styles.authPageTitle}>
        {title}
      </Title>
      <Tabs
        defaultActiveKey={defaultActiveTabKey}
        centered
        items={items}
        size="large"
        onChange={(key) => setActiveTabKey(key)}
        className={styles.tabs}
      />
      {isEmailTabActive && (
        <Row justify="end">
          <Link to={ROUTES.LOGIN} className={styles.link}>
            {TEXT.FORGOT_PASSWORD}
          </Link>
        </Row>
      )}
      <Divider plain>{TEXT.OR}</Divider>
      <Row justify="space-between" className={styles.buttonMargins} gutter={40}>
        <Col span={14} offset={5}>
          <Button
            icon={<GoogleIcon />}
            type={ButtonTypes.default}
            className={styles.socialMediaButton}
            onClick={onGoogleClick}
          />
        </Col>
      </Row>
      <Row justify="center">
        {location.pathname === ROUTES.LOGIN ? (
          <span className={styles.authorizeLink}>
            {TEXT.NO_ACCOUNT}{' '}
            <Link to={ROUTES.REGISTRATION} className={styles.registerStyle}>
              {TEXT.REGISTER}
            </Link>
          </span>
        ) : (
          <span className={styles.authorizeLink}>
            {TEXT.ALREADY_HAVE_ACCOUNT}{' '}
            <Link to={ROUTES.LOGIN} className={styles.authorizeStyle}>
              {TEXT.AUTHORIZE}
            </Link>
          </span>
        )}
      </Row>
    </>
  );
};
