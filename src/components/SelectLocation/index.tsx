import { Col, Row, Image, Form, Select, ConfigProvider } from 'antd';

import mapPinSrc from 'src/assets/icons/map-pin-icon.svg';
import mapPinLightSrc from 'src/assets/icons/map-pin-icon-light.svg';
import {
  IMAGE_DESCRIPTION,
  CITY_LIST,
  FORMS,
  SCREEN_WIDTH,
} from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';

export const SelectLocation = () => {
  const { width } = useWindowSize();

  const isTablet = width < SCREEN_WIDTH.MD;

  const src = isTablet ? mapPinLightSrc : mapPinSrc;

  return (
    <Row align="middle">
      <Col xs={2} md={3}>
        <Image
          src={src}
          alt={IMAGE_DESCRIPTION.LOGO}
          preview={false}
          className="map-pin-icon"
        />
      </Col>
      <Col xs={22} md={10}>
        <Form
          name={FORMS.SELECT_LOCATION_FORM}
          layout="vertical"
          onFinish={() => {}}
          onFinishFailed={() => {}}
        >
          <Form.Item name="location" rules={[]} noStyle={true}>
            <ConfigProvider
              theme={isTablet ? tabletLocalTheme : desktopLocalTheme}
            >
              <Select
                size="large"
                showSearch
                variant="borderless"
                popupClassName={
                  isTablet ? styles.selectPopup : styles.selectPopupDesktop
                }
                options={CITY_LIST}
                popupMatchSelectWidth={false}
                defaultValue={CITY_LIST?.[0]?.value}
                style={{
                  width: '100%',
                  minWidth: 120,
                }}
              />
            </ConfigProvider>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

const commonSelectTheme = {
  optionSelectedFontWeight: 'regular',
  optionFontSize: 16,
  optionHeight: 32,
  optionLineHeight: 2,
  paddingXXS: 8,
  optionPadding: '0px 16px',
};

const tabletLocalTheme = {
  components: {
    Select: {
      ...commonSelectTheme,
      colorTextQuaternary: theme.N1,
      optionSelectedColor: theme.N1,
      colorText: theme.N1,
      colorBgElevated: theme.primaryHover,
      controlItemBgHover: theme.primary,
      colorTextPlaceholder: theme.N1,
      optionSelectedBg: theme.primary,
    },
  },
};

const desktopLocalTheme = {
  components: {
    Select: {
      ...commonSelectTheme,
      colorTextQuaternary: theme.N6,
      colorText: theme.N6,
      colorBgElevated: theme.N1,
      optionSelectedColor: theme.N6,
      optionActiveBg: theme.N2,
      colorTextPlaceholder: theme.N6,
      optionSelectedBg: theme.N2,
    },
  },
};
