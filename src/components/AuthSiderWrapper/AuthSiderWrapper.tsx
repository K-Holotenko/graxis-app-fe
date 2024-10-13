import React from 'react';
import { Col } from 'antd';
import { AuthSider } from '../AuthSider/AuthSider';

export const AuthSiderWrapper: React.FC = () => (
  <Col xs={0} sm={0} md={7} lg={9}>
    <AuthSider />
  </Col>
);
