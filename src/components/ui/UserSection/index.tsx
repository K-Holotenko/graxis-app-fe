import { Avatar, Col, Dropdown, Row } from 'antd';
import { useState } from 'react';

import { AvatarMenu } from 'src/components/logic/AppHeader/AvatarMenu';
import styles from './styles.module.scss';

// should be changed to select or dropdown according to the latest design
export const UserSection = () => {
  const [usernameABBR] = useState('BC'); // should be implemented using store and real name
  const [username] = useState('Вадим Семко'); // should be implemented using store and real name

  return (
    <Row className={styles.userSection} align="middle" justify="center">
      <Col span={24}>
        <Dropdown
          overlay={<AvatarMenu />}
          placement="bottom"
          trigger={['click']}
        >
          <div className={styles.avatarSection}>
            <Avatar size="large" className={styles.avatarLarge}>
              {usernameABBR}
            </Avatar>
            <span className={styles.userSectionUsername}>{username}</span>
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
};
