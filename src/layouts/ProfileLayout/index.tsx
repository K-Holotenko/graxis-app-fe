import { Col, Row } from 'antd';
import { ReactNode, useState } from 'react';

import LeftArrow from 'src/assets/icons/arrow-left-icon.svg?react';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';

import styles from './styles.module.scss';

interface ItemLayoutProps {
  title: ReactNode;
  sidebar: ReactNode;
  tabContent: ReactNode;
  dialog: ReactNode;
}

export const ProfileLayout = ({
  title,
  sidebar,
  tabContent,
  dialog,
}: ItemLayoutProps) => {
  const { width } = useWindowSize();

  const isMobile = width < SCREEN_WIDTH.MD;
  // TODO Open/Close logic should be tightened with tabs navigation
  // this one is just for demo purposes
  const [shouldShowSidebar, setShouldShowSidebar] = useState(false);

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
          shouldShowSidebar && <Col span={24}>{sidebar}</Col>
        ) : (
          <Col span={7}>{sidebar}</Col>
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
