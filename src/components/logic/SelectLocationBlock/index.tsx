import { Col, Row } from 'antd';

import { MapPinIcon } from 'components/ui/MapPinIcon';
import { SelectLocationForm } from 'components/logic/Forms/SelectLocationForm';

import './styles.scss';

export const SelectLocationBlock = () => (
  <Row align="middle">
    <Col xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 4 }}>
      <MapPinIcon />
    </Col>
    <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }}>
      <SelectLocationForm />
    </Col>
  </Row>
);
