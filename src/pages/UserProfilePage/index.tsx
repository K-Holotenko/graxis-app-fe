import { Col, Row } from 'antd';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ProfileLayout } from 'src/layouts/ProfileLayout';
import { ButtonTypes, TEXT } from 'src/config/constants';
import { Button } from 'src/components/Button';

import { USER_PROFILE_CONFIG } from './utils/config';
import { ContactInfo } from './children/ContactInfo';
import styles from './styles.module.scss';

export const UserProfilePage = () => (
  <PageContainer pageTitle={USER_PROFILE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <ProfileLayout
        headerContent={undefined}
        leftContent={undefined}
        topContent={undefined}
        bottomContent={<ContactInfo />}
      />
      <Row>
        <Col className={styles.buttonsContainer}>
          <Button
            type={ButtonTypes.default}
            className={styles.buttonCancelChanges}
            label={TEXT.CANCEL_CHANGES}
          />
          <Button
            type={ButtonTypes.primary}
            className={styles.buttonSaveChanges}
            label={TEXT.SAVE_CHANGES}
          />
        </Col>
      </Row>
    </AppLayout>
  </PageContainer>
);
