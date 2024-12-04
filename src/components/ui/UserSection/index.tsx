import { Avatar, Col, Dropdown, Row } from 'antd';
import { useState } from 'react';
import { theme } from 'src/config/theme';

import { AvatarMenu } from 'src/components/logic/AppHeader/AvatarMenu';
import './styles.scss';

// should be changed to select or dropdown according to the latest design
export const UserSection = () => {
  const [usernameABBR] = useState('BC'); // should be implemented using store and real name
  const [username] = useState('Вадим Семко'); // should be implemented using store and real name

  return (
    <Row className="user-section" align="middle" justify="center">
      <Col span={24}>
        <Dropdown
          overlay={<AvatarMenu />}
          placement="bottom"
          trigger={['click']}
        >
          <div style={{ textAlign: 'center' }}>
            <Avatar
              size={'large'}
              style={{ cursor: 'pointer', backgroundColor: theme.success }}
            >
              {usernameABBR}
            </Avatar>
            <span className="user-section__username">{username}</span>
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
};
