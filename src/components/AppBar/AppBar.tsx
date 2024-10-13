import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './AppBar.module.scss';
import { auth } from '../../constants/auth/auth';
import { EmailAuthForm } from '../EmailAuthForm/EmailAuthForm';
import { PhoneAuthForm } from '../PhoneAuthForm/PhoneAuthForm';

export const AppBar: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: auth.emailTabLabel,
      children: <EmailAuthForm />,
    },
    {
      key: '2',
      label: auth.phoneNum,
      children: <PhoneAuthForm />,
    },
  ];

  return <Tabs className={styles.authTab} defaultActiveKey="1" items={items} />;
};
