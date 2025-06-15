import { Col, Row } from 'antd';
import { ReactNode } from 'react';

interface BookingLayoutProps {
  booking: ReactNode;
  chat: ReactNode;
}

export const BookingLayout = ({ booking, chat }: BookingLayoutProps) => (
  <Row>
    <Col span={14}>{booking}</Col>
    <Col span={10} style={{ paddingLeft: 20 }}>
      {chat}
    </Col>
  </Row>
);
