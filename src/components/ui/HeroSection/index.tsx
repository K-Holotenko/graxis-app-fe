import { Input } from 'antd';
import styles from './styles.module.scss';
import { TEXT } from 'config/constants';

export const HeroSection = () => (
  <div className={styles['hero-section-container']}>
    <div className={styles['hero-section']}>
      <div className={styles['hero-content']}>
        <h1>{TEXT.HERO_SECTION_TITLE}</h1>
        <h2>{TEXT.HERO_SECTION_SUBTITLE}</h2>
        <Input
          className={styles['hero-section-input']}
          placeholder="Пошук товару"
        />
      </div>
    </div>
  </div>
);
