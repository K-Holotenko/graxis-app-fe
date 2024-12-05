import { Col, ConfigProvider, Drawer, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { ReactComponent as Logo } from 'src/assets/icons/logo-light.svg';
import { ReactComponent as PlusIconDark } from 'src/assets/icons/plus-icon-dark.svg';
import { ReactComponent as UserIconDark } from 'src/assets/icons/user-icon-dark.svg';
import { theme } from 'src/config/theme';
import { useAuthStore } from 'src/stores/authStore';
import { AddPublicationButton } from 'src/components/ui/AddPublicationButton';
import { SelectLocationBlock } from 'src/components/logic/SelectLocationBlock';
import { UserSection } from 'src/components/ui/UserSection';
import { TEXT } from 'src/config/constants';
import { SignInButton } from 'src/components/ui/SignInButton';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

interface AppHeaderDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const AppHeaderDrawer = ({ open, onClose }: AppHeaderDrawerProps) => {
  const { isAuthorized } = useAuthStore();
  const navigate = useNavigate();

  const onAddPublicationBtnClick = () => {
    navigate(isAuthorized ? ROUTES.ADD_PUBLICATION : ROUTES.LOGIN);
  };

  return (
    <Drawer
      className={styles.headerDrawer}
      closeIcon={null}
      open={open}
      placement="left"
      width="100%"
      extra={<CloseIcon onClick={onClose} className={styles.drawerCloseBtn} />}
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
          <AddPublicationButton
            onClick={onAddPublicationBtnClick}
            className={styles.addPublicationButton}
            icon={<PlusIconDark />}
          />
        </Col>
      </Row>
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
    </Drawer>
  );
};
