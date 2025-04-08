import { Col, Row } from 'antd';
import { ComponentType, ReactNode, useState } from 'react';

import LeftArrow from 'src/assets/icons/arrow-left-icon.svg?react';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { Sidebar } from 'src/pages/UserProfilePage/children/Sidebar';

import styles from './styles.module.scss';

export interface SidebarProps {
  onTabClick?: () => void;
}

interface ItemLayoutProps {
  title: ReactNode;
  sidebar: ComponentType<SidebarProps> | ReactNode;
  tabContent: ReactNode;
  dialog: ReactNode;
}

export const ProfileLayout = ({
  title,
  tabContent,
  dialog,
}: ItemLayoutProps) => {
  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;
  const [shouldShowSidebar, setShouldShowSidebar] = useState(false);

  const closeSidebar = () => {
    if (isMobile) {
      setShouldShowSidebar(false);
    }
  };

  return (
    <div className={styles.mainContentContainer}>
      <Row>
        {isMobile ? (
          !shouldShowSidebar && (
            <div
              className={styles.sidebarToggle}
              onClick={() => setShouldShowSidebar(!shouldShowSidebar)}
            >
              <LeftArrow />
              <Col className={styles.titleMobile}>{title}</Col>
            </div>
          )
        ) : (
          <Col className={styles.title}>{title}</Col>
        )}
      </Row>
      <Row>
        {isMobile ? (
          shouldShowSidebar && (
            <Col span={24}>
              <Sidebar onTabClick={closeSidebar} />
            </Col>
          )
        ) : (
          <Col span={7}>
            <Sidebar />
          </Col>
        )}
        {!shouldShowSidebar && isMobile ? (
          <Col md={{ span: 16, offset: 1 }} xs={{ span: 24 }}>
            {tabContent}
          </Col>
        ) : (
          !isMobile && (
            <Col md={{ span: 16, offset: 1 }} xs={{ span: 24 }}>
              {tabContent}
            </Col>
          )
        )}
      </Row>
      <Row>
        <Col span={24}>{dialog}</Col>
      </Row>
    </div>
  );
};
