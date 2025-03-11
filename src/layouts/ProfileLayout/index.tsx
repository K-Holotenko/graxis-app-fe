import { Col, Row } from 'antd';
import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PROFILE_PARAMS, SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';

import styles from './styles.module.scss';

interface ItemLayoutProps {
  headerContent: ReactNode;
  leftContent: ReactNode;
  topContent: ReactNode;
  bottomContent: ReactNode;
}

interface LeftContentSectionProps {
  span: number;
}

export const ProfileLayout = ({
  headerContent,
  leftContent,
  topContent,
  bottomContent,
}: ItemLayoutProps) => {
  const { width } = useWindowSize();
  const [searchParams, setSearchParams] = useSearchParams();

  const LeftContentSection = ({ span }: LeftContentSectionProps) => (
    <Col
      span={span}
      className={styles.leftContentSection}
      onClick={() => {
        const params = new URLSearchParams();

        params.set('p', PROFILE_PARAMS.PROFILE);
        setSearchParams(params, {
          preventScrollReset: true,
        });
      }}
    >
      {leftContent}
    </Col>
  );

  const isMobile = width < SCREEN_WIDTH.SM;

  return isMobile ? (
    <Row className={styles.mainContentContainer}>
      {searchParams.get('p') ? (
        <Col span={24} className={styles.rightContentContainer}>
          <Row className={styles.rightContentTopContainer}>
            <Col span={24} className={styles.rightContentTopSection}>
              {topContent}
            </Col>
          </Row>
          <Row className={styles.rightContentBottomContainer}>
            <Col span={24} className={styles.rightContentBottomSection}>
              {bottomContent}
            </Col>
          </Row>
        </Col>
      ) : (
        <LeftContentSection span={24} />
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
        <LeftContentSection span={6} />

        <Col span={18} className={styles.rightContentContainer}>
          <Row className={styles.rightContentTopContainer}>
            <Col span={24} className={styles.rightContentTopSection}>
              {topContent}
            </Col>
          </Row>
          <Row className={styles.rightContentBottomContainer}>
            <Col span={24} className={styles.rightContentBottomSection}>
              {bottomContent}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
