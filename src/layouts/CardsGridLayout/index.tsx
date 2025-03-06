import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface CardsGridLayoutProps {
  children: ReactNode;
}

export const CardsGridLayout = ({ children }: CardsGridLayoutProps) => (
  <div className={styles.cardsGridLayout}>{children}</div>
);
