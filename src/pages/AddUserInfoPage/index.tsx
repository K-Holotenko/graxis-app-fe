import { Typography } from 'antd';

import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';

import { AddUserInfoForm } from './children/AddUserInfoForm/AddUserInfoForm';
import styles from './styles.module.scss';

const { Title } = Typography;

const AddUserInfoPage = () => (
  <PageContainer pageTitle="Додати інформацію">
    <AuthLayout>
      <Title level={2} className={styles.authPageTitle}>
        Заповніть профіль
      </Title>
      <AddUserInfoForm />
    </AuthLayout>
  </PageContainer>
);

export default AddUserInfoPage;
