import { Col, Row, FloatButton, ConfigProvider } from 'antd';
import { ReactNode } from 'react';

import { theme } from 'src/config/theme';
import ArrowUpIcon from 'src/assets/icons/arrow-up.svg?react';

import styles from './styles.module.scss';

interface SearchLayoutProps {
  filters: ReactNode;
  publicationsGrids: ReactNode;
  loadMoreButton: ReactNode;
  pagination: ReactNode;
}

export const SearchLayout = ({
  filters,
  publicationsGrids,
  loadMoreButton,
  pagination,
}: SearchLayoutProps) => (
  <>
    <Row className={styles.topContentContainer}>
      <Col span={24} className={styles.topContentSection}>
        {filters}
      </Col>
    </Row>
    <Row className={styles.centerContentContainer}>
      <Col span={24} className={styles.centerContentSection}>
        {publicationsGrids}
      </Col>
    </Row>
    <Row className={styles.bottomContentContainer}>
      <Col span={24} className={styles.bottomContentSection}>
        {loadMoreButton}
      </Col>
    </Row>
    <ConfigProvider theme={localTheme}>
      <FloatButton.BackTop className={styles.floatBtn} icon={<ArrowUpIcon />} />
    </ConfigProvider>
    <Row className={styles.paginationContainer}>
      <Col span={24}>{pagination}</Col>
    </Row>
  </>
);

const localTheme = {
  token: {
    controlHeightLG: 48,
    margin: theme.space0,
    fontSizeIcon: 24,
    colorFillContent: theme.N2,
    boxShadowSecondary: `
          0 6px 8px 0 rgba(80, 86, 94, 0.12),
          0 3px 25px 0 rgba(80, 86, 94, 0.12),
          0 9px 14px 0 rgba(80, 86, 94, 0.02)
        `,
  },
};
