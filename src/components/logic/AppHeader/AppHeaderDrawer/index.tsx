import { Col, ConfigProvider, Drawer, Row, Typography } from 'antd';

import { ReactComponent as CloseIcon } from 'assets/icons/close-icon.svg';
import { ReactComponent as Logo } from 'assets/icons/logo-light.svg';
import { ReactComponent as PlusIconDark } from 'assets/icons/plus-icon-dark.svg';
import { ReactComponent as UserIconDark } from 'assets/icons/user-icon-dark.svg';

import { theme } from 'config/theme';
import { useAuthStore } from 'stores/authStore';
import { AddAdvertisementButton } from 'components/ui/AddAdvertisementButton';
import { SelectLocationBlock } from 'components/logic/SelectLocationBlock';
import { UserSection } from 'components/ui/UserSection';
import { TEXT } from 'config/constants';
import { SignInButton } from 'components/ui/SignInButton';

import './styles.scss';

interface AppHeaderDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const AppHeaderDrawer = ({ open, onClose }: AppHeaderDrawerProps) => {
  const { isAuthorized } = useAuthStore();

  return (
    <Drawer
      className="header-drawer"
      closeIcon={null}
      open={open}
      placement="left"
      width={'100%'}
      extra={<CloseIcon onClick={onClose} className="drawer-close-btn" />}
      title={<Logo />}
      style={{ backgroundColor: theme.primaryColor }}
    >
      {isAuthorized && (
        <Row>
          <Col span={24}>
            <UserSection />
          </Col>
        </Row>
      )}

      {!isAuthorized && (
        <Row>
          <Col span={24}>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: theme.lightGreenColor,
                    colorText: theme.lightGreenColor,
                    colorBgContainer: theme.primaryColor,
                    colorBorder: theme.lightGreenColor,
                  },
                },
              }}
            >
              <SignInButton onClick={() => {}} icon={<UserIconDark />} />
            </ConfigProvider>
          </Col>
        </Row>
      )}

      <Row>
        <Col span={24}>
          <AddAdvertisementButton
            onClick={() => {}}
            className="mt-20"
            style={{
              backgroundColor: theme.lightGreenColor,
              color: theme.primaryColor,
              padding: '12px 25px',
              height: '48px',
              width: '100%',
            }}
            icon={<PlusIconDark />}
          />
        </Col>
      </Row>
      <ConfigProvider
        theme={{
          token: {
            colorText: theme.whiteColor,
            colorIcon: 'red',
          },
        }}
      >
        <Row>
          <Col span={24}>
            <Typography style={{ fontSize: 13 }} className="pt-12 pb-12">
              {TEXT.CHOOSE_LOCATION}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <SelectLocationBlock />
          </Col>
        </Row>
      </ConfigProvider>
    </Drawer>
  );
};
