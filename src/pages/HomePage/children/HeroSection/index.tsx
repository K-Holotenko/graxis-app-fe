import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { TEXT } from 'src/config/constants';
import { Heading } from 'src/components/Heading';

import styles from './styles.module.scss';

export const HeroSection = () => (
  <div className={styles.heroSectionContainer}>
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <Heading level={1} className={styles.heading}>
          {TEXT.HERO_SECTION_TITLE}
        </Heading>
        <p>{TEXT.HERO_SECTION_SUBTITLE}</p>
        <Input
          className={styles.heroSectionInput}
          placeholder={TEXT.INPUT_SEARCH}
          prefix={<SearchOutlined />}
        />
      </div>
    </div>
  </div>
);
