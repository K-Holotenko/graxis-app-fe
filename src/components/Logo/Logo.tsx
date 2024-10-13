import React from 'react';
import LogoSVG from '../../assets/logo.svg';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <img src={LogoSVG} alt="Logo" className={styles.logoImage} />
    </div>
  );
};
