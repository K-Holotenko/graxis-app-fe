import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface MainConteinerProps {
  children: ReactNode;
}

export const MainConteiner = ({ children }: MainConteinerProps) => (
  <main className={styles.mainConteiner}>{children}</main>
);
