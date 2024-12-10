import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface MainContainerProps {
  children: ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => (
  <main className={styles.mainContainer}>{children}</main>
);
