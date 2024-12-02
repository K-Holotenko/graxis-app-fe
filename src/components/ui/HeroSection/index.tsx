import { Input } from 'antd';

import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

export const HeroSection = () => (
  <div className={styles.heroSectionContainer}>
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1>{TEXT.HERO_SECTION_TITLE}</h1>
        <h2>{TEXT.HERO_SECTION_SUBTITLE}</h2>
        <Input className={styles.heroSectionInput} placeholder="Пошук товару" />
      </div>
    </div>
  </div>
);
