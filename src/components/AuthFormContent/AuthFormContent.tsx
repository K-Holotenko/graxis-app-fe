import React from 'react';
import { Button, Divider, Typography } from 'antd';
import { PageTitle } from '../PageTitle/PageTitle';
import { AppBar } from '../AppBar/AppBar';
import styles from './AuthFormContent.module.scss';
import { auth } from '../../constants/auth/auth';

const { Text } = Typography;

export const AuthFormContent: React.FC = () => (
  <div className={styles.contentWrapper}>
    <PageTitle>{auth.registrationTitle}</PageTitle>
    <AppBar />
    <Button type="primary" block className={styles.continueButton}>
      {auth.continueButton}
    </Button>
    <Divider className={styles.divider}>{auth.orDivider}</Divider>
    <Text className={styles.authText}>{auth.hasAccountText}</Text>
  </div>
);
