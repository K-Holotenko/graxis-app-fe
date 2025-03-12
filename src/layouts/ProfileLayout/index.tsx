import { Col, Row } from 'antd';
import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';

import styles from './styles.module.scss';
import { LeftContentSection } from './children/LeftContentSection';
import { RightContentSection } from './children/RightContentSection';

interface ItemLayoutProps {
  headerContent: ReactNode;
  leftContent: ReactNode;
  topContent: ReactNode;
  bottomContent: ReactNode;
}

export const ProfileLayout = ({
  headerContent,
  leftContent,
  topContent,
  bottomContent,
}: ItemLayoutProps) => {
  const { width } = useWindowSize();
  const [searchParams] = useSearchParams();

  const isMobile = width < SCREEN_WIDTH.MD;

  return isMobile ? (
    <Row className={styles.mainContentContainer}>
      {searchParams.get('p') ? (
        <RightContentSection
          topContent={topContent}
          bottomContent={bottomContent}
        />
      ) : (
        <LeftContentSection span={24} leftContent={leftContent} />
      )}
    </Row>
  ) : (
    <>
      <Row className={styles.headerContentContainer}>
        <Col span={24} className={styles.headerContentSection}>
          {headerContent}
        </Col>
      </Row>

      <Row className={styles.mainContentContainer}>
        <LeftContentSection span={6} leftContent={leftContent} />
        <RightContentSection
          topContent={topContent}
          bottomContent={bottomContent}
        />
      </Row>
    </>
  );
};
