import { Avatar, Col, Row } from 'antd';
import { useState } from 'react';

import { theme } from 'config/theme';

import './styles.scss';

// should be changed to select or dropdown according to the latest design
export const UserSection = () => {
  const [usernameABBR] = useState('BC'); // should be implemented using store and real name
  const [username] = useState('Вадим Семко'); // should be implemented using store and real name

  return (
    <Row className="user-section" align={'middle'} justify={'center'}>
      <Col span={24}>
        <Avatar style={{ backgroundColor: theme.success }}>
          {usernameABBR}
        </Avatar>
        <span className="user-section__username">{username}</span>
      </Col>
    </Row>
  );
};
