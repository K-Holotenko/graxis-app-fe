import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import { useWindowSize } from 'src/hooks/useWindowSize';
import { Logo } from 'src/components/Logo';
import { SCREEN_WIDTH } from 'src/config/constants';

import styles from './styles.module.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { width, height } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;
  const isSmallHeight = height < 900;
  const isHiddenMobile = !isSmallHeight || isMobile;

  return (
    <>
      <Row className={styles.logoRow}>
        <Col
          xs={{ span: 20, offset: 2 }}
          md={{ span: 10, offset: isSmallHeight ? 7 : 11 }}
          lg={{ span: 8, offset: isSmallHeight ? 8 : 13 }}
          className={styles.logoCol}
        >
          <Logo className={styles.logo} />
        </Col>
      </Row>
      <Row align="middle" className={styles.authLayoutRow}>
        {isHiddenMobile && (
          <Col md={8} lg={10}>
            <div className={styles.authImageContainer}></div>
          </Col>
        )}
        <Col
          xs={{ span: 20, offset: 2 }}
          md={{ span: 10, offset: isSmallHeight ? 7 : 3 }}
          lg={{ span: 8, offset: isSmallHeight ? 8 : 3 }}
          className={isSmallHeight ? styles.verifyPage : ''}
        >
          <div className={styles.chldrenContainer}>{children}</div>
        </Col>
      </Row>
    </>
  );
};
