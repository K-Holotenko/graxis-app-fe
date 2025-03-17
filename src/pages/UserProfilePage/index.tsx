import { useEffect } from 'react';
import { Col, Row } from 'antd';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ProfileLayout } from 'src/layouts/ProfileLayout';
import { useUserStore } from 'src/stores/userStore';
import { ButtonTypes } from 'src/config/constants';
import { Button } from 'src/components/Button';

import { USER_PROFILE_CONFIG } from './utils/config';
import styles from './styles.module.scss';

export const UserProfilePage = () => {
  const { fetchUser, updateUser } = useUserStore();

  useEffect(() => {
    fetchUser((err: string) => {
      console.error(err);
    });
    updateUser({
      id: 'ANIOizSAUXQp3oNRK5prIJKbL8O2',
      name: 'sss',
      surname: 'sss',
      email: 'sss@gmai.com',
      phoneNumber: 'sss',
    });
  }, [fetchUser, updateUser]);

  return (
    <PageContainer pageTitle={USER_PROFILE_CONFIG.PAGE_TITLE}>
      <AppLayout>
        <ProfileLayout
          headerContent={undefined}
          leftContent={undefined}
          topContent={undefined}
          bottomContent={undefined}
        />

        <Row>
          <Col className={styles.buttonsContainer}>
            <Button
              type={ButtonTypes.default}
              className={styles.buttonCancelChanges}
              label={'Скасувати зміни'}
            />
            <Button
              type={ButtonTypes.primary}
              className={styles.buttonSaveChanges}
              label={'Зберегти зміни'}
            />
          </Col>
        </Row>
      </AppLayout>
    </PageContainer>
  );
};
