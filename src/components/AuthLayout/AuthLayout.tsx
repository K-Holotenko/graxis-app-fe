import React from 'react';
import { Row, Col } from 'antd';
import { AuthSiderWrapper } from '../AuthSiderWrapper/AuthSiderWrapper';
import { AuthFormContent } from '../AuthFormContent/AuthFormContent';
import { Logo } from '../Logo/Logo';
import styles from './AuthLayout.module.scss';

export const AuthLayout: React.FC = () => (
  <>
    <Row
      gutter={0}
      justify={'space-around'}
      wrap={false}
      className={styles.layoutRow}
    >
      <AuthSiderWrapper />
      <Col xs={24} sm={24} md={17} lg={15} className={styles.appBarCol}>
        <Logo />
        <AuthFormContent />
      </Col>
    </Row>
  </>
);
