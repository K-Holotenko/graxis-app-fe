import { Typography } from 'antd';

import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';

import { ADD_USER_INFO } from './utils/config';
import { AddUserInfoForm } from './children/AddUserInfoForm/AddUserInfoForm';
import styles from './styles.module.scss';

const { Title } = Typography;

export const AddUserInfoPage = () => (
  <PageContainer pageTitle={ADD_USER_INFO.PAGE_TAB_TITLE}>
    <AuthLayout>
      <Title level={2} className={styles.authPageTitle}>
        {ADD_USER_INFO.PAGE_TITLE}
      </Title>
      <AddUserInfoForm />
    </AuthLayout>
  </PageContainer>
);
