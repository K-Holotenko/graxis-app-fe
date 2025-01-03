import { Col, Row, Image, Form, Select } from 'antd';
import useToken from 'antd/es/theme/useToken';

import { theme } from 'src/config/theme';
import mapPinSrc from 'src/assets/icons/map-pin-icon.svg';
import mapPinLightSrc from 'src/assets/icons/map-pin-icon-light.svg';
import { IMAGE_DESCRIPTION, CITY_LIST, FORMS } from 'src/config/constants';

import './styles.scss';

export const SelectLocation = () => {
  const [, token] = useToken();

  return (
    <Row align="middle">
      <Col xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 4 }}>
        <Image
          src={
            token.colorText === theme.whiteColor ? mapPinLightSrc : mapPinSrc
          }
          alt={IMAGE_DESCRIPTION.LOGO}
          preview={false}
          className="map-pin-icon"
        />
      </Col>
      <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }}>
        <Form
          name={FORMS.SELECT_LOCATION_FORM}
          layout="vertical"
          onFinish={() => {}}
          onFinishFailed={() => {}}
        >
          <Form.Item name="location" rules={[]} noStyle={true}>
            <Select
              variant="borderless"
              options={CITY_LIST}
              defaultValue={CITY_LIST?.[0]?.value}
              style={{ width: '100%', minWidth: 120 }}
            />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
