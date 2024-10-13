import React from 'react';
import styles from './AuthSider.module.scss';

export const AuthSider: React.FC = () => {
  return (
    <>
      <div className={styles.siderContainer}>
        <div className={styles.imgContainer}>
          <div className={styles.img}></div>
        </div>
      </div>
    </>
  );
};
