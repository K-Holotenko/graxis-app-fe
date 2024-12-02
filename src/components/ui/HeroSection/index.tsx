import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

export const HeroSection = () => (
  <div className={styles.heroSectionContainer}>
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1>{TEXT.HERO_SECTION_TITLE}</h1>
        <h2>{TEXT.HERO_SECTION_SUBTITLE}</h2>
        <Input
          className={styles.heroSectionInput}
          placeholder="Пошук товару"
          prefix={<SearchOutlined />}
          style={{ borderRadius: '10px' }}
        />
      </div>
    </div>
  </div>
);
